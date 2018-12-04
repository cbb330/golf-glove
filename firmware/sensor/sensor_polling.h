/*
 * sensor_polling.h
 *
 * Function prototypes for polling and packaging sensor data.
 */

#ifndef __SENSOR_POLLING_H
#define __SENSOR_POLLING_H

#include "wiced_bt_types.h"

#include "sensor/sensor_frame.h"

#define FRAME_RATE 250  // Hertz, 125 chosen b/c 1000ms / 125 Hz = 8.0 ms
#define FRAME_PERIOD (1000 / FRAME_RATE)    // milliseconds

/**
 * Initializes resources for the frame pushing system.
 */
void sensor_polling_frame_push_init(void);

/**
 * Callback function for the frame pushing timer.
 * 
 * @param arg : Reserved.
 */
void sensor_polling_frame_push_timer_cb(uint32_t arg);

/**
 * Reads all sensor values and retrieves fully populated sensor frame.
 */
sensor_frame sensor_polling_fetch_frame(void);

#endif