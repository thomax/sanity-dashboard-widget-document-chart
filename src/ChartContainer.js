import React from 'react'
import PropTypes from 'prop-types'
import sleep from 'await-sleep'
import {getCounts} from './sanityConnector'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class ChartContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    chartStyle: PropTypes.string
  }

  static defaultProps = {
    data: null,
    chartStyle: null
  }

  render() {
    const {chartStyle, data} = this.props
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    )
  }
}

export default ChartContainer
