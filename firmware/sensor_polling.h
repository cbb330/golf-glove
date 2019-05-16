#ifndef __SENSOR_POLLING_H
#define __SENSOR_POLLING_H

#include "wiced.h"
#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_memory.h"
#include "sparcommon.h"
#include "wiced_hal_i2c.h"
#include "wiced_hal_adc.h"
#include "wiced_rtos.h"
#include "rtc.h"
#include "string.h"
#include "LSM9DS1.h"
#include "ADS1015.h"
#include <unistd.h>
#include <stdlib.h>
#include <time.h>

#define WRIST_IMU_ADDR 0x0000 // wrist IMU I2C Addr
#define HAND_IMU_ADDR 0x0000 // hand IMU I2C Addr
#define POLL_RATE 120 // hertz

#define WRIST1_PIN ADC_INPUT_P0
#define WRIST2_PIN ADC_INPUT_P1
#define WRIST3_PIN ADC_INPUT_P28
#define WRIST4_PIN ADC_INPUT_P16
#define PRES1_PIN ADC_INPUT_P17
#define PRES2_PIN ADC_INPUT_P38

int real_time = 0;

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

// init
void init_i2c();

// Main loop (contains process states)
void sensor_loop();
void print_sensor_frame(sensor_frame rec);

// Sensor polling logic
sensor_frame get_sensor_frame();
imu_frame get_imu_frame();
imu_frame get_imu_frame_internal();

// Swing Detection/frameing
int detect_swing(sensor_frame current, sensor_frame last);
void frame_swing();

// Data pushing/updating
void add_swing(sensor_frame* swing);
#endif
