/*
 * sensor_frame.h
 *
 * Struct definitions for storing and handling sensor data.
 */

#ifndef __SENSOR_FRAME_H
#define __SENSOR_FRAME_H

#include "wiced_bt_types.h"

/**
 * imu_frame Struct
 * 
 * Stores one instant of data from a 9-axis 16-bit inertial measurement unit. 
 */
typedef struct {
    uint16_t accX;                          // 0-1
    uint16_t accY;                          // 2-3
    uint16_t accZ;                          // 4-5
    uint16_t magX;                          // 6-7
    uint16_t magY;                          // 8-9
    uint16_t magZ;                         // 10-11
    uint16_t gyroX;                        // 12-13
    uint16_t gyroY;                        // 14-15
    uint16_t gyroZ;                        // 16-17
} imu_frame;

/**
 * sensor_frame Struct
 * 
 * Stores one instant of data for the golf glove application. 
 */
typedef struct {
    uint32_t timestamp;                      // 0-3
    uint16_t pres1;                          // 4-5
    uint16_t pres2;                          // 6-7
    uint16_t wrist1;    // flexion              8-9
    uint16_t wrist2;    // extension           10-11
    uint16_t wrist3;    // radial deviation    12-13
    uint16_t wrist4;    // ulnar deviation     14-15
    imu_frame imu1;     // Wrist               16-33
    imu_frame imu2;     // Hand                34-51
    uint16_t sync;                          // 52-53
    uint16_t avail;                         // 54-55
} sensor_frame;

#endif