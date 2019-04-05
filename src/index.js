import React from 'react'
import PropTypes from 'prop-types'
import {getCounts} from './sanityConnector'
import {countsToData} from './transformer'
import styles from './DocumentChart.css'
import ChartContainer from './ChartContainer.js'

function queryFromTypes(types) {
  if (!types || types.length < 1) {
    return null
  }
  const query = types.map(type => `"${type}": count(*[_type=="${type}"])`).join(',\n')
  return `{${query}}`
}

class DocumentChart extends React.Component {
  static state = {
    counts: null
  }

  static propTypes = {
    query: PropTypes.string,
    params: PropTypes.object,
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
    const {query, params, types} = this.props
    const preferredQuery = queryFromTypes(types) || query
    console.log('query/params', preferredQuery, params)
    if (!preferredQuery) {
      return null
    }

    this.unsubscribe()
    this.subscription = getCounts(preferredQuery, params).subscribe(event => {
      console.log('got', event.result)
      this.setState({counts: event.result})
    })
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  render() {
    const {chartStyle} = this.props
    const {counts} = this.state
    const data = countsToData(counts)
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
