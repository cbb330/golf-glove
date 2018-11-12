# Golf Glove GATT Service Reference #

## `golf-glove` Service ###
| Property | Value |
| --- | --- |
| Name | `golf-glove` |
| UUID | `3a c5 98 d6 1b 7e 42 2e b5 f1 34 fe 48 89 83 7c` (MSB -> LSB) |
| Description | Vendor Specific Service: golf_glove |

### `next_frame` Characteristic ###
| Property | Value |
| --- | --- |
| Name | `next_frame` |
| UUID | `5a 41 42 57 d5 13 4c 6f b8 ab 53 43 8a 86 35 6c` (MSB -> LSB) |
| Actions | Read, Notify, Indicate |
| Description | Returns the data frame from the front of the data buffer, if no frame is present, an empty frame will be sent. |

The data returned by reading this characteristic is a **54-byte** value with the following format:

| Bytes | Name | Encoding |
| --- | --- | --- |
| 0-3 | Timestamp | Unsigned 32-bit counter that increments by 1 for each frame. Can be converted to a time offset for frames by multiplying the difference in two frames' timestamps by 1 / Sensor Refresh Rate. |
| 4-5 | Pressure Sensor 1 | Unsigned 16-bit integer indicating the pressure applied to Pressure Sensor 1. |
| 6-7 | Pressure Sensor 2 | [See above] |
| 8-9 | Wrist Deflection | Unsigned 16-bit integer representing the angle of wrist deflection as indicated by the upper soft robotic sensor. |
| 10-11 | Wrist Extension | Unsigned 16-bit integer representing the angle of wrist extension as indicated by the lower soft robotic sensor. |
| 12-13 | Radial Deviation | Unsigned 16-bit integer representing the angle of radial deviation (turning of the right hand to the left, or vice versa) as indicated by the outside soft robotic sensor. |
| 14-15 | Ulnar Deviation | Unsigned 16-bit integer representing the angle of ulnar deviation (turning of the right hand to the right, or vice versa) as indicated by the inside soft robotic sensor. |
| 16-33 | Wrist IMU | Inertial data as indicated by wrist-mounted IMU [See table below for details] |
| 34-51 | Hand IMU | Inertial data as indicated by hand-mounted IMU [See table below for details] |
| 52 | Swing Sync | 0 = middle of swing or real-time mode data point, 1 = beginning of swing, 2 = end of swing |
| 53 | Data Available | 0 = no more frames to fetch in frame buffer, 1 = more frames to fetch in frame buffer |

IMU Data Format:

| Bytes | Name | Encoding |
| --- | --- | --- |
| 0-1 | Acceleration X | Signed 16-bit integer indicating acceleration on the X axis -32768 to 32767 scales to +/- 2g. |
| 2-3 | Acceleration Y | Signed 16-bit integer indicating acceleration on the Y axis -32768 to 32767 scales to +/- 2g. |
| 4-5 | Acceleration Z | Signed 16-bit integer indicating acceleration on the Z axis -32768 to 32767 scales to +/- 2g. |
| 6-7 | Magnetic Field X | Signed 16-bit integer indicating magnetic field on the X axis -32768 to 32767 scales to +/- 4 gauss. |
| 8-9 | Magnetic Field Y | Signed 16-bit integer indicating magnetic field on the Y axis -32768 to 32767 scales to +/- 4 gauss. |
| 10-11 | Magnetic Field Z | Signed 16-bit integer indicating magnetic field on the Z axis -32768 to 32767 scales to +/- 4 gauss. |
| 12-13 | Rotation X | Signed 16-bit integer indicating rotation on the X axis -32768 to 32767 scales to +/- 2000 dps. |
| 14-15 | Rotation Y | Signed 16-bit integer indicating rotation on the Y axis -32768 to 32767 scales to +/- 2000 dps. |
| 16-17 | Rotation Z | Signed 16-bit integer indicating rotation on the Z axis -32768 to 32767 scales to +/- 2000 dps. |

### `realtime_enabled` Characteristic ###
| Property | Value |
| --- | --- |
| Name | `realtime_enabled` |
| UUID | `59 92 53 7e 1b 6d 41 78 ba 27 22 fa b3 8c e4 72` (MSB -> LSB) |
| Actions | Read, **TODO: WRITE**, Notify, Indicate |
| Description | Sets whether the swing detection algorithm will be used or if data will be continuously streamed to the device. |

### `data_available` Characteristic ###
| Property | Value |
| --- | --- |
| Name | `data_available` |
| UUID | `90 93 34 aa c6 ce 4b d0 95 ab 73 98 33 ae f7 bd` (MSB -> LSB) |
| Actions | Read, Notify, Indicate |
| Description | Returns a boolean value indicating whether data is available to be read from the frame buffer. |
