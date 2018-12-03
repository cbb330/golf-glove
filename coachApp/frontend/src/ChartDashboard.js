import React, { Component } from 'react';
import TestChart from './TestChart';
import RotationChart from './RotationChart';
import StretchChart from './StretchChart';
import PressureChart from './PressureChart';

class ChartDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      deflection: [],
      extension: [],
      radialDeviation: [],
      ulnarDeviation: [],
      pressure1: [],
      pressure2: [],
      imu1: {
        accelX: [],
        accelY: [],
        accelZ: [],
        gyroX: [],
        gyroY: [],
        gyroZ: []
      },
      imu2: {
        accelX: [],
        accelY: [],
        accelZ: [],
        gyroX: [],
        gyroY: [],
        gyroZ: []
      },
      overlay: props.overlay,
      visibleGraphs: props.visibleGraphs
    };

    this.chartSize = {height: 300, width: 500};

    this.state.data.forEach(d => {
      if (!(d.time instanceof Date)) {
        d.time = new Date(2018, 10, 6, d.time.substr(0, 2), d.time.substr(3, 2), d.time.substr(6, 2), d.time.substr(9, 3));
      }
    });

    // this.state.data.forEach(d => {
    //   // this.state.imu1.accelData.push({time: d.time, accelX: d.imu1.accelX, accelY: d.imu1.accelY, accelZ: d.imu1.accelZ});
    //   this.state.imu1.accelX.push({time: d.time, data: d.imu1.accelX, type: 'x'});
    //   this.state.imu1.accelY.push({time: d.time, data: d.imu1.accelY, type: 'y'});
    //   this.state.imu1.accelZ.push({time: d.time, data: d.imu1.accelZ, type: 'z'});
    //   // this.state.imu2.accelData.push({time: d.time, accelX: d.imu2.accelX, accelY: d.imu2.accelY, accelZ: d.imu2.accelZ});
    //   this.state.imu2.accelX.push({time: d.time, data: d.imu2.accelX, type: 'x'});
    //   this.state.imu2.accelY.push({time: d.time, data: d.imu2.accelY, type: 'y'});
    //   this.state.imu2.accelZ.push({time: d.time, data: d.imu2.accelZ, type: 'z'});

    //   this.state.imu1.gyroData.push({time: d.time, gyroX: d.imu1.gyroX, gyroY: d.imu1.gyroY, gyroZ: d.imu1.gyroZ});
    //   this.state.imu2.gyroData.push({time: d.time, gyroX: d.imu2.gyroX, gyroY: d.imu2.gyroY, gyroZ: d.imu2.gyroZ});
    //   this.state.extension.push({time: d.time, stretch1: d.deflection, stretch2: d.extension});
    //   this.state.deviation.push({time: d.time, stretch1: d.radialDeviation, stretch2: d.ulnarDeviation});
    //   this.state.pressure.push({time: d.time, pressure1: d.pressure1, pressure2: d.pressure2});
    // });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      overlay: nextProps.overlay,
      visibleGraphs: nextProps.visibleGraphs
    });
    // console.log(nextProps.data.length);
    // console.log(this.props.data[-1]);
    if (this.props.data) {
      if (this.props.data.length === 0) {
        if (nextProps.data.length > 0) {
          this.formatData(nextProps.data);
        }
      }
      else if (this.props.data[this.props.data.length - 1].time !== nextProps.data[nextProps.data.length - 1].time) {
        this.formatData(nextProps.data);
      }
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.data !== nextProps.data) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  formatData(nextData) {
    const imu1 = {
      accelX: [],
      accelY: [],
      accelZ: [],
      gyroX: [],
      gyroY: [],
      gyroZ: []
    };
    const imu2 = {
      accelX: [],
      accelY: [],
      accelZ: [],
      gyroX: [],
      gyroY: [],
      gyroZ: []
    };
    const deflection = [];
    const extension = [];
    const radialDeviation = [];
    const ulnarDeviation = [];
    const pressure1 = [];
    const pressure2 = [];

    const FRAME_SIZE = 40;
    // nextData.forEach(point => {
    //   this.xData.push({time: point.time, data: point.imu1.accelX, type: "x"});
    //   this.yData.push({time: point.time, data: point.imu1.accelY, type: "y"});
    //   this.zData.push({time: point.time, data: point.imu1.accelZ, type: "z"});
    // });
    // console.log('adding points');
    for (let i = 0; i < FRAME_SIZE; i++) {
      const d = nextData[nextData.length - (FRAME_SIZE - i)];
      if (this.state.visibleGraphs.accel) {
        imu1.accelX.push({time: d.time, data: d.imu1.accelX, type: 'x'});
        imu1.accelY.push({time: d.time, data: d.imu1.accelY, type: 'y'});
        imu1.accelZ.push({time: d.time, data: d.imu1.accelZ, type: 'z'});

        imu2.accelX.push({time: d.time, data: d.imu2.accelX, type: 'x'});
        imu2.accelY.push({time: d.time, data: d.imu2.accelY, type: 'y'});
        imu2.accelZ.push({time: d.time, data: d.imu2.accelZ, type: 'z'});
      }
      if (this.state.visibleGraphs.gyro) {
        imu1.gyroX.push({time: d.time, data: d.imu1.gyroX, type: 'x'});
        imu1.gyroY.push({time: d.time, data: d.imu1.gyroY, type: 'y'});
        imu1.gyroZ.push({time: d.time, data: d.imu1.gyroZ, type: 'z'});
  
        imu2.gyroX.push({time: d.time, data: d.imu2.gyroX, type: 'x'});
        imu2.gyroY.push({time: d.time, data: d.imu2.gyroY, type: 'y'});
        imu2.gyroZ.push({time: d.time, data: d.imu2.gyroZ, type: 'z'});
      }
      if (this.state.visibleGraphs.stretch) {
        deflection.push({time: d.time, data: d.deflection, type: 'deflection'});
        extension.push({time: d.time, data: d.extension, type: 'extension'});
        radialDeviation.push({time: d.time, data: d.radialDeviation, type: 'radial deviation'});
        ulnarDeviation.push({time: d.time, data: d.ulnarDeviation, type: 'ulnar deviation'});
      }
      if (this.state.visibleGraphs.pressure) {
        pressure1.push({time: d.time, data: d.pressure1, type: 'index-side'});
        pressure2.push({time: d.time, data: d.pressure2, type: 'pinky-side'});
      }
    }
    const BUFFER_SIZE = 100;
    this.setState({
      imu1: {
        accelX: [...this.state.imu1.accelX.slice(-BUFFER_SIZE), ...imu1.accelX],
        accelY: [...this.state.imu1.accelY.slice(-BUFFER_SIZE), ...imu1.accelY],
        accelZ: [...this.state.imu1.accelZ.slice(-BUFFER_SIZE), ...imu1.accelZ],
        gyroX: [...this.state.imu1.gyroX.slice(-BUFFER_SIZE), ...imu1.gyroX],
        gyroY: [...this.state.imu1.gyroY.slice(-BUFFER_SIZE), ...imu1.gyroY],
        gyroZ: [...this.state.imu1.gyroZ.slice(-BUFFER_SIZE), ...imu1.gyroZ]
      },
      imu2: {
        accelX: [...this.state.imu2.accelX.slice(-BUFFER_SIZE), ...imu2.accelX],
        accelY: [...this.state.imu2.accelY.slice(-BUFFER_SIZE), ...imu2.accelY],
        accelZ: [...this.state.imu2.accelZ.slice(-BUFFER_SIZE), ...imu2.accelZ],
        gyroX: [...this.state.imu2.gyroX.slice(-BUFFER_SIZE), ...imu2.gyroX],
        gyroY: [...this.state.imu2.gyroY.slice(-BUFFER_SIZE), ...imu2.gyroY],
        gyroZ: [...this.state.imu2.gyroZ.slice(-BUFFER_SIZE), ...imu2.gyroZ]
      },
      deflection: [...this.state.deflection.slice(-BUFFER_SIZE), ...deflection],
      extension: [...this.state.extension.slice(-BUFFER_SIZE), ...extension],
      radialDeviation: [...this.state.radialDeviation.slice(-BUFFER_SIZE), ...radialDeviation],
      ulnarDeviation: [...this.state.ulnarDeviation.slice(-BUFFER_SIZE), ...ulnarDeviation],
      pressure1: [...this.state.pressure1.slice(-BUFFER_SIZE), ...pressure1],
      pressure2: [...this.state.pressure2.slice(-BUFFER_SIZE), ...pressure2]
    });
  }

  render() {
    // console.log(this.state.imu1.accelX);
    return (
      <div style={{flex: '0 0 100%'}}>
        {this.state.overlay ?
          <TestChart data={this.state.data} /> :
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            <div style={{display: 'flex', flex: '0 0 45%'}}>
              <h2>Wrist IMU</h2>
            </div>
            <div style={{display: 'flex', flex: '0 0 45%'}}>
              <h2>Glove IMU</h2>
            </div>
            {this.state.visibleGraphs.accel ?
              <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#ada975'}}>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <TestChart x={this.state.imu1.accelX} y={this.state.imu1.accelY} z={this.state.imu1.accelZ} />
                </div>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <TestChart x={this.state.imu2.accelX} y={this.state.imu2.accelY} z={this.state.imu2.accelZ} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.gyro ?
              <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#b0b0b0'}}>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <RotationChart x={this.state.imu1.gyroX} y={this.state.imu1.gyroY} z={this.state.imu1.gyroZ} />
                </div>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <RotationChart x={this.state.imu2.gyroX} y={this.state.imu2.gyroY} z={this.state.imu2.gyroZ} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.stretch ?
              // <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#70a090'}}>
              <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#adb084'}}>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <StretchChart deflection={this.state.deflection} extension={this.state.extension} isExtension />
                </div>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <StretchChart radialDeviation={this.state.radialDeviation} ulnarDeviation={this.state.ulnarDeviation} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.pressure ?
              <div style={{display: 'flex', flex: '0 0 100%', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: '#b0b0b0'}}>
                <div style={{display: 'flex', flex: '0 0 90%'}}>
                  <h2>Pressure Sensors</h2>
                </div>
                <div style={{height: 200, width: 300, display: 'flex', flex: '0 0 90%'}}>
                  <PressureChart index={this.state.pressure1} pinky={this.state.pressure2} />
                </div>
              </div> :
              null
            }
          </div>
        }
      </div>
    );
  }
}

export default ChartDashboard;
