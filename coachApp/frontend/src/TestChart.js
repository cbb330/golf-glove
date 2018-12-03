import React, { PureComponent } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
// import moment from 'moment'



class TestChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {        
        x: props.x,
        y: props.y,
        z: props.z
      },
      size: props.size,
      allData: [],
    };
    // this.xData = [];
    // this.yData = [];
    // this.zData = [];

    // this.testData = this.state.data;

    // this.testData.forEach(d => {
    //   // d.time = new Date(2018, 10, 6, d.time.substr(0, 2), d.time.substr(3, 2), d.time.substr(6, 2), d.time.substr(9, 3));
    //   this.state.xData.push({time: d.time, data: d.accelX, type: "x"});
    //   this.state.yData.push({time: d.time, data: d.accelY, type: "y"});
    //   this.state.zData.push({time: d.time, data: d.accelZ, type: "z"});
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
    // console.log(nextProps.data);
    // if (nextProps.data.length > 0) {
    //   this.formatData(nextProps.data);
    // }
  }

  render() {
    // console.log(this.state.data);
    return (
      <VictoryChart
        height={200}
        // eslint-disable-next-line no-restricted-globals
        width={parent.innerWidth * 0.45}
        theme={VictoryTheme.material}
        padding={{top: 0, bottom: 0, left: 50, right: 0}}
        style={{flex: '0 0 100%'}}
        scale={{ x: "time" }}
        domain={{y: [-15, 15]}}
        // domain={{ x: [new Date(2018, 10, 6, 17, 31), new Date(2018, 10, 6, 17, 33)], y: [-2, 12] }}

        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        // domainPadding={10}
        domainPadding={{y: [10, 10]}}

        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension='x'
            labels={function (d) {
              // console.log(d);
              let s = "";
              if (d.type === "x")
                s = `t: ${d._x.getMinutes()}:${d._x.getSeconds().toString().padStart(2, '0')}:${d._x.getMilliseconds().toString().padStart(3, '0')}\n`;
              return `${s}${d.type}: ${d._y.toFixed(2)}`;
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
            grid: {stroke: "#c0c39a", strokeDasharray: 0}
          }}
          orientation='bottom'
          // crossAxis={true}
        />
        <VictoryAxis
          dependentAxis={true}
          label="acceleration (m/s^2)"
          style={{
            axisLabel: {fontSize: 20, padding: 30},
            ticks: {stroke: "grey", size: 5},
            grid: {stroke: "#c0c39a", strokeDasharray: 0}
          }}
          // tickFormat specifies how ticks should be displayed
          // tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryLine
          data={this.state.data.x}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#92c050", strokeWidth: 2 }}}
        />
        <VictoryLine
          data={this.state.data.y}
          x={'time'}
          y={'data'}
          interpolation="basis"
          style={{data: { stroke: "#00A090" }}}
        />
        <VictoryLine
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

export default TestChart;
