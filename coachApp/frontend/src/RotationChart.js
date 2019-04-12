import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

class RotationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {        
        x: props.x,
        y: props.y,
        z: props.z
      }
    };

    // this.testData = JSON.parse(JSON.stringify(this.state.data)); // TODO: unghetto this
    // this.testData = this.state.data;

    // this.testData.forEach(d => {
    //   this.state.xData.push({time: d.time, data: d.gyroX, type: "x"});
    //   this.state.yData.push({time: d.time, data: d.gyroY, type: "y"});
    //   this.state.zData.push({time: d.time, data: d.gyroZ, type: "z"});
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {        
        x: nextProps.x,
        y: nextProps.y,
        z: nextProps.z
      }
    });
  }

  render() {
    return (
      <VictoryChart
        height={200}
        // eslint-disable-next-line no-restricted-globals
        width={parent.innerWidth * 0.45}
        theme={VictoryTheme.material}
        padding={{top: 0, bottom: 0, left: 50, right: 0}}
        scale={{ x: "time" }}
        domain={{y: [-200, 200]}}
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
          label="time (m:s)"
          tickFormat={(x) => `${x.getMinutes()}:${x.getSeconds().toString().padStart(2, '0')}`}
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: "#c8c8c8", strokeDasharray: 0}
          }}
          orientation='bottom'
        />
        <VictoryAxis
          dependentAxis={true}
          label="rotation (deg/s)"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: "#c8c8c8", strokeDasharray: 0}
          }}
          // tickFormat specifies how ticks should be displayed
          // tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryScatter
          data={this.state.data.x}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#92c050", strokeWidth: 2 }}}
        />
        <VictoryScatter
          data={this.state.data.y}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#00A090" }}}
        />
        <VictoryScatter
          data={this.state.data.z}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#7030a0" }}}
        />
      </VictoryChart>
    );
  }
}

export default RotationChart;
