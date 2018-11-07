import React, { Component } from 'react'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
// import moment from 'moment'

import testData from './data/test-data.json'

// const xData = 

class TestChart extends Component {
  render() {
    testData.forEach(point => {
      point.time = new Date(2018, 10, 6, point.time.substr(0, 2), point.time.substr(3, 2), point.time.substr(6, 2), point.time.substr(9, 3));
      // point.time = new Date(2018, 10, 6, 17, 34, 59, 256);
      console.log(point)
      console.log(point.time.getMilliseconds())
    });
    return (
      <VictoryChart
        width={600}
        height={600}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}

        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        // domainPadding={20}
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
          tickFormat={(x) => `${x.getMinutes()}:${x.getSeconds()}`}
        />
        <VictoryAxis
          dependentAxis={true}
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
