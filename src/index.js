/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import sanityClient from 'part:@sanity/base/client'

import {countsToChartData} from './transformer'
import ChartContainer from './ChartContainer.js'
import styles from './DocumentChart.css'

function awarenessQueryFromTypes(types) {
  if (!types || types.length < 1) {
    return null
  }
  const typesString = types.join('","')
  return `*[_type in ["${typesString}"]] | order(_updatedAt desc)[0]{_id}`
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
    types: PropTypes.array
  }

  static defaultProps = {
    types: null
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount = () => {
    const {types} = this.props
    const query = awarenessQueryFromTypes(types)

    if (query) {
      this.unsubscribe()
      this.subscription = sanityClient
        .listen(
          query,
          {},
          {
            includeResult: false,
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
        <ChartContainer data={data} />
      </div>
    )
  }
}

export default {
  name: 'document-chart',
  component: DocumentChart
}
