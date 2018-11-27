import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
// import moment from 'moment'



class TestChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      allData: [],
      xData: [],
      yData: [],
      zData: []
    };
    this.xData = [];
    this.yData = [];
    this.zData = [];

    this.testData = this.state.data;

    this.testData.forEach(point => {
      point.time = new Date(2018, 10, 6, point.time.substr(0, 2), point.time.substr(3, 2), point.time.substr(6, 2), point.time.substr(9, 3));
      this.state.allData.push({time: point.time, x: point.imu1.accel_x, y: point.imu1.accel_y, z: point.imu1.accel_z, type: "all"});
      this.state.xData.push({time: point.time, data: point.imu1.accel_x, type: "x"});
      this.state.yData.push({time: point.time, data: point.imu1.accel_y, type: "y"});
      this.state.zData.push({time: point.time, data: point.imu1.accel_z, type: "z"});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
    this.formatData(nextProps.data);
  }

  formatData(data) {
    this.xData = [];
    this.yData = [];
    this.zData = [];
    data.forEach(point => {
      this.xData.push({time: point.time, data: point.imu1.accelX, type: "x"});
      this.yData.push({time: point.time, data: point.imu1.accelY, type: "y"});
      this.zData.push({time: point.time, data: point.imu1.accelZ, type: "z"});
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <VictoryChart
        height={400}
        width={1000}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        // domain={{ x: [new Date(2018, 10, 6, 17, 31), new Date(2018, 10, 6, 17, 33)], y: [-2, 12] }}

        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        // domainPadding={10}
        domainPadding={{y: [10, 10]}}

        containerComponent={
          <VictoryVoronoiContainer voronoiDimension='x'
            labels={function (d) {
              // console.log(d);
              let s = "";
              if (d.type === "x")
                s = `t: ${d._x.getMinutes()}:${d._x.getSeconds().toString().padStart(2, '0')}:${d._x.getMilliseconds().toString().padStart(3, '0')}\n`;
              return `${s}${d.type}: ${d._y}`;
            }}
            labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
          />
        }
        >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          // tickValues={[1, 2, 3, 4]}
          // tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
          label="Time (m:s:ms)"
          tickFormat={(x) => `${x.getMinutes()}:${x.getSeconds().toString().padStart(2, '0')}:${x.getMilliseconds().toString().padStart(3, '0')}`}
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            // grid: {stroke: (t) => "lightgrey", fill: "none"}
          }}
        />
        <VictoryAxis
          dependentAxis={true}
          label="acceleration (m/s^2)"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
          }}
          // tickFormat specifies how ticks should be displayed
          // tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryLine
          data={this.xData}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#92c050", strokeWidth: 2 }}}
        />
        <VictoryLine
          data={this.yData}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#00A090" }}}
        />
        <VictoryLine
          data={this.zData}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#7030a0" }}}
        />
      </VictoryChart>
      );
  }
}

export default TestChart;
