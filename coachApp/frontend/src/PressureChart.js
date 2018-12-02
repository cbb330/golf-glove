import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

class PressureChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      pressure1: [],
      pressure2: []
    };

    // this.testData = JSON.parse(JSON.stringify(this.state.data)); // TODO: unghetto this
    this.testData = this.state.data;

    this.testData.forEach(d => {
      this.state.pressure1.push({time: d.time, data: d.pressure1, type: 'index-side'});
      this.state.pressure2.push({time: d.time, data: d.pressure2, type: 'pinky-side'});
    });
  }

  render() {
    return (
      <VictoryChart
        height={300}
        // eslint-disable-next-line no-restricted-globals
        width={parent.innerWidth * 0.9}
        theme={VictoryTheme.material}
        padding={{top: 0, bottom: 0, left: 50, right: 0}}
        scale={{ x: "time" }}
        domain={{y: [-10, 10]}}
        // domain={{ x: [new Date(2018, 10, 6, 17, 31), new Date(2018, 10, 6, 17, 33)], y: [-2, 12] }}

        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        // domainPadding={10}
        domainPadding={{y: [10, 10]}}

        containerComponent={
          <VictoryVoronoiContainer voronoiDimension='x'
            labels={function (d) {
              let s = "";
              if (d.type === 'index-side')
                s = `t: ${d._x.getMinutes()}:${d._x.getSeconds().toString().padStart(2, '0')}:${d._x.getMilliseconds().toString().padStart(3, '0')}\n`;
              return `${s}${d.type}: ${d._y}`;
            }}
            labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
          />
        }
        >
        <VictoryAxis
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
          label="pressure"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: "#c8c8c8", strokeDasharray: 0}
          }}
        />
        <VictoryLine
          data={this.state.pressure1}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#92c050", strokeWidth: 2 }}}
        />
        <VictoryLine
          data={this.state.pressure2}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#7030a0" }}}
        />
      </VictoryChart>
    );
  }
}

export default PressureChart;
