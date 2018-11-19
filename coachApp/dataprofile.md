# Golf Glove Frontend Data Reference

## test route
```javascript
{
  timestamp: number,
  pressure1: number,
  pressure2: number,
  deflection: number,
  extension: number,
  radialDeviation: number,
  ulnarDeviation: number,
  imu1: {
    accelX: number,
    accelY: number,
    accelZ: number,
    magX: number,
    magY: number,
    magZ: number,
    gyroX: number,
    gyroY: number,
    gyroZ: number
  },
  imu2: {
    accelX: number,
    accelY: number,
    accelZ: number,
    magX: number,
    magY: number,
    magZ: number,
    gyroX: number,
    gyroY: number,
    gyroZ: number
  },
  swingSync: ['0', '1', '2'],
  dataAvailable: boolean
}
```
