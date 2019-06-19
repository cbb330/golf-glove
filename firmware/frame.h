#ifndef __FRAME_H
#define __FRAME_H


#include "wiced.h"
#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"

// 6-way IMU sensor data
typedef struct {
    UINT16 accX;
    UINT16 accY;
    UINT16 accZ;
    UINT16 gyroX;
    UINT16 gyroY;
    UINT16 gyroZ;
} imu_frame;

// Total Sensor data
typedef struct {
    uint32_t timestamp;                         //0-3
    INT16 pres1;                             //4-5
    INT16 pres2;                             //6-7
    INT16 wrist1; // deflection              //8-9
    INT16 wrist2; // extension               //10-11
    INT16 wrist3; // radial deviation        //12-13
    INT16 wrist4; // ulnar deviation         //14-15
    imu_frame imu1; // Wrist                    //16-33
    imu_frame imu2; // Hand                     //34-51
    UINT16 sync;                               //52-53
    UINT16 avail;                              //54-55
} sensor_frame;

#endif
