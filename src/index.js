import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'await-sleep'
import {getCounts} from './sanityConnector'
import {countsToData} from './transformer'
import styles from './DocumentChart.css'

class DocumentChart extends React.Component {
  static state = {
    documentsCount: null
  }

  static propTypes = {
    query: PropTypes.string,
    params: PropTypes.object,
    chartStyle: PropTypes.string
  }

  static defaultProps = {
    query: null,
    params: {},
    chartStyle: 'bar'
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount = () => {
    const {query, params} = this.props
    if (!query) {
      return null
    }
    console.log('query/params', query, params)

    this.unsubscribe()
    this.subscription = getCounts(query, params).subscribe(event => {
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
    const {chartStyle, counts} = this.props
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
