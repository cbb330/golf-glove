import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

class StretchChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isExtension: props.isExtension,
      stretch1: [],
      stretch2: []
    };

    // this.testData = JSON.parse(JSON.stringify(this.state.data)); // TODO: unghetto this
    this.testData = this.state.data;
    const types = this.state.isExtension ? ['deflection', 'extension'] : ['radial deviation', 'ulnar deviation'];

    this.testData.forEach(d => {
      this.state.stretch1.push({time: d.time, data: d.stretch1, type: types[0]});
      this.state.stretch2.push({time: d.time, data: d.stretch2, type: types[1]});
    });
  }

  render() {
    return (
      <VictoryChart
        height={300}
        // eslint-disable-next-line no-restricted-globals
        width={parent.innerWidth * 0.45}
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
              if (d.type === 'deflection' || d.type === 'radial deviation')
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
            grid: {stroke: '#90a4ae', strokeDasharray: 0}
          }}
          orientation='bottom'
        />
        <VictoryAxis
          dependentAxis={true}
          label="stretch"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: '#90a4ae', strokeDasharray: 0}
          }}
        />
        <VictoryLine
          data={this.state.stretch1}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#92c050", strokeWidth: 2 }}}
        />
        <VictoryLine
          data={this.state.stretch2}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#7030a0" }}}
        />
      </VictoryChart>
    );
  }
}

export default StretchChart;
