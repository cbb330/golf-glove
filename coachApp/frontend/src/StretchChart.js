import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

class StretchChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        stretch1: [],
        stretch2: []
      },
      isExtension: props.isExtension
    };

    // this.testData = JSON.parse(JSON.stringify(this.state.data)); // TODO: unghetto this
    // this.testData = this.state.data;
    // const types = this.state.isExtension ? ['deflection', 'extension'] : ['radial deviation', 'ulnar deviation'];

    // this.testData.forEach(d => {
    //   this.state.stretch1.push({time: d.time, data: d.stretch1, type: types[0]});
    //   this.state.stretch2.push({time: d.time, data: d.stretch2, type: types[1]});
    // });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isExtension) {
      this.setState({
        data: {        
          stretch1: nextProps.deflection,
          stretch2: nextProps.extension
        },
        isExtension: nextProps.isExtension
      });
    }
    else {
      this.setState({
        data: {
          stretch1: nextProps.radialDeviation,
          stretch2: nextProps.ulnarDeviation
        },
        isExtension: nextProps.isExtension
      })
    }
  }

  render() {
    // console.log(this.state.data.stretch1);
    return (
      <VictoryChart
        height={200}
        // eslint-disable-next-line no-restricted-globals
        width={parent.innerWidth * 0.45}
        theme={VictoryTheme.material}
        padding={{top: 0, bottom: 50, left: 50, right: 0}}
        scale={{ x: "time" }}
        // domain={{y: [1000, 10000]}}
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
            grid: {stroke: '#c8c8c8', strokeDasharray: 0}
          }}
          orientation='bottom'
        />
        <VictoryAxis
          dependentAxis={true}
          label="stretch"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: '#c8c8c8', strokeDasharray: 0}
          }}
          tickFormat={(x) => (`${x / 1000}k`)}
        />
        <VictoryScatter
          data={this.state.data.stretch1}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#00A090", strokeWidth: 2 }}}
        />
        <VictoryScatter
          data={this.state.data.stretch2}
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
