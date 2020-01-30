/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import sanityClient from 'part:@sanity/base/client'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import {countsToChartData} from './transformer'
import ChartContainer from './ChartContainer.js'
import styles from './DocumentChart.css'

function awarenessQueryFromTypes(types) {
  if (!types || types.length < 1) {
    return null
  }
  const typesString = types.join('","')
  return `*[_type in ["${typesString}"]] | order(_updatedAt desc)[0]`
}

function queryFromTypes(types) {
  if (!types || types.length < 1) {
    return null
  }
  const query = types.map(type => `"${type}": count(*[_type=="${type}"])`).join(',\n')
  return `{${query}}`
}

class DocumentChart extends React.Component {
  state = {
    counts: null
  }

  static propTypes = {
    types: PropTypes.array,
    chartStyle: PropTypes.string
  }

  static defaultProps = {
    query: null,
    params: {},
    types: null,
    chartStyle: 'bar'
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount = () => {
    console.log('---->', schemaTypes)
    const {types} = this.props
    const query = awarenessQueryFromTypes(types)

    if (query) {
      this.unsubscribe()
      this.subscription = sanityClient
        .listen(
          query,
          {},
          {
            includeResult: true,
            visibility: 'query',
            events: ['welcome', 'mutation', 'reconnect']
          }
        )
        .subscribe(this.handleReceiveAnything)
    }
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  handleReceiveAnything = () => {
    const {types} = this.props
    const query = queryFromTypes(types)
    sanityClient.fetch(query).then(counts => {
      this.setState({counts})
    })
  }

  render() {
    const {chartStyle} = this.props
    const {counts} = this.state
    if (!counts) {
      return <div>No counts</div>
    }
    const data = countsToChartData(counts)
    if (!data) {
      return <div>No data to plot</div>
    }

    return (
      <div className={styles.container}>
        <ChartContainer data={data} chartStyle={chartStyle} />
      </div>
    )
  }
}

export default {
  name: 'document-chart',
  component: DocumentChart
}
