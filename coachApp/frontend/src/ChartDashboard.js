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
      pressure: [],
      extension: [],
      deviation: [],
      imu1: {
        accelX: [],
        accelY: [],
        accelZ: [],
        gyroData: []
      },
      imu2: {
        accelX: [],
        accelY: [],
        accelZ: [],
        gyroData: []
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

    this.state.data.forEach(d => {
      // this.state.imu1.accelData.push({time: d.time, accelX: d.imu1.accelX, accelY: d.imu1.accelY, accelZ: d.imu1.accelZ});
      this.state.imu1.accelX.push({time: d.time, data: d.imu1.accelX, type: 'x'});
      this.state.imu1.accelY.push({time: d.time, data: d.imu1.accelY, type: 'y'});
      this.state.imu1.accelZ.push({time: d.time, data: d.imu1.accelZ, type: 'z'});
      // this.state.imu2.accelData.push({time: d.time, accelX: d.imu2.accelX, accelY: d.imu2.accelY, accelZ: d.imu2.accelZ});
      this.state.imu2.accelX.push({time: d.time, data: d.imu2.accelX, type: 'x'});
      this.state.imu2.accelY.push({time: d.time, data: d.imu2.accelY, type: 'y'});
      this.state.imu2.accelZ.push({time: d.time, data: d.imu2.accelZ, type: 'z'});

      this.state.imu1.gyroData.push({time: d.time, gyroX: d.imu1.gyroX, gyroY: d.imu1.gyroY, gyroZ: d.imu1.gyroZ});
      this.state.imu2.gyroData.push({time: d.time, gyroX: d.imu2.gyroX, gyroY: d.imu2.gyroY, gyroZ: d.imu2.gyroZ});
      this.state.extension.push({time: d.time, stretch1: d.deflection, stretch2: d.extension});
      this.state.deviation.push({time: d.time, stretch1: d.radialDeviation, stretch2: d.ulnarDeviation});
      this.state.pressure.push({time: d.time, pressure1: d.pressure1, pressure2: d.pressure2});
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      overlay: nextProps.overlay,
      visibleGraphs: nextProps.visibleGraphs
    });
  }

  render() {
    // console.log(this.state.visibleGraphs);
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
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <TestChart x={this.state.imu1.accelY} y={this.state.imu1.accelX} z={this.state.imu1.accelZ} />
                </div>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                <TestChart x={this.state.imu2.accelY} y={this.state.imu2.accelX} z={this.state.imu2.accelZ} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.gyro ?
              <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#b0b0b0'}}>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <RotationChart data={this.state.imu1.gyroData} />
                </div>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <RotationChart data={this.state.imu2.gyroData} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.stretch ?
              // <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#70a090'}}>
              <div style={{display: 'flex', flex: '0 0 100%', justifyContent: 'space-evenly', backgroundColor: '#adb084'}}>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <StretchChart data={this.state.extension} isExtension />
                </div>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 45%'}}>
                  <StretchChart data={this.state.deviation} />
                </div>
              </div> :
              null
            }
            {this.state.visibleGraphs.pressure ?
              <div style={{display: 'flex', flex: '0 0 100%', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: '#b0b0b0'}}>
                <div style={{display: 'flex', flex: '0 0 90%'}}>
                  <h2>Pressure Sensors</h2>
                </div>
                <div style={{height: 300, width: 300, display: 'flex', flex: '0 0 90%'}}>
                  <PressureChart data={this.state.pressure} />
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
