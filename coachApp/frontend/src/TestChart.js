import React, { Component } from 'react'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'

import testData from './data/test-data.json'

// const xData = 

class TestChart extends Component {
  render() {
    return (
      <VictoryChart
        width={600}
        height={470}
        theme={VictoryTheme.material}
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
        containerComponent={
          <VictoryVoronoiContainer voronoiDimension='x'
            labels={(d) => `value: ${d._y} ${console.log(d)}`}
            labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
          />
        }
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          // tickValues={[1, 2, 3, 4]}
          // tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
        />
        <VictoryAxis
          dependentAxis={true}
          scale={{ x: "time" }}
          // tickFormat specifies how ticks should be displayed
          // tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryLine
          colorScale={'warm'}
          data={testData}
          x={'time'}
          y={'accel_x'}
        />
        <VictoryLine
          colorScale={'warm'}
          data={testData}
          x={'time'}
          y={'accel_y'}
        />
        <VictoryLine
          colorScale={'warm'}
          data={testData}
          x={'time'}
          y={'accel_z'}
        />
      </VictoryChart>
      )
  }
}

export default TestChart
