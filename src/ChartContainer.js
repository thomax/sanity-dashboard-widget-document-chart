/* eslint-disable react/no-did-mount-set-state,react/jsx-no-bind,react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts'

const barFillColor = '#156dff'

class ChartContainer extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {
    data: null,
    chartStyle: null
  }

  state = {
    dimensions: {
      width: 500,
      height: 300
    }
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight
      }
    })
  }

  render() {
    const {data} = this.props
    const {dimensions} = this.state
    return (
      <div ref={element => (this.container = element)}>
        <BarChart
          width={dimensions.width}
          height={dimensions.height}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barFillColor} />
        </BarChart>
      </div>
    )
  }
}

export default ChartContainer
