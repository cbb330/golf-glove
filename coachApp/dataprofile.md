# Golf Glove Frontend Data Reference

## test route
```javascript
{
  timestamp: number,
  pressure1: number,
  pressure2: number,
  deflection: number,
  extension: number,
  radial_deviation: number,
  ulnar_deviation: number,
  imu1: {
    accel_x: number,
    accel_y: number,
    accel_z: number,
    mag_x: number,
    mag_y: number,
    mag_z: number,
    rot_x: number,
    rot_y: number,
    rot_z: number
  },
  imu2: {
    accel_x: number,
    accel_y: number,
    accel_z: number,
    mag_x: number,
    mag_y: number,
    mag_z: number,
    rot_x: number,
    rot_y: number,
    rot_z: number
  },
  swing_sync: ['0', '1', '2'],
  data_available: boolean
}
```
