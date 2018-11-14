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
#include "string.h"
#include "LSM9DS1.h"
#include <unistd.h>
#include <stdlib.h>
#include <time.h>

#define WRIST_IMU_ADDR 0x0000 // wrist IMU I2C Addr
#define HAND_IMU_ADDR 0x0000 // hand IMU I2C Addr
#define POLL_RATE 120 // hertz

#define PRES1_PIN ADC_INPUT_P10
#define PRES2_PIN ADC_INPUT_P10
#define WRIST1_PIN ADC_INPUT_P10
#define WRIST2_PIN ADC_INPUT_P10
#define WRIST3_PIN ADC_INPUT_P16
#define WRIST4_PIN ADC_INPUT_P17

int real_time = 0;

// 9-way IMU sensor data
typedef struct {
    uint16_t accX;
    uint16_t accY;
    uint16_t accZ;
    uint16_t magX;
    uint16_t magY;
    uint16_t magZ;
    uint16_t gyroX;
    uint16_t gyroY;
    uint16_t gyroZ;
} imu_frame;

// Total Sensor data
typedef struct {
    uint32_t timestamp;                         //0-3
    uint16_t pres1;                             //4-5
    uint16_t pres2;                             //6-7
    uint16_t wrist1; // deflection              //8-9
    uint16_t wrist2; // extension               //10-11
    uint16_t wrist3; // radial deviation        //12-13
    uint16_t wrist4; // ulnar deviation         //14-15
    imu_frame imu1; // Wrist                    //16-33
    imu_frame imu2; // Hand                     //34-51
    uint16_t sync;                               //52-53
    uint16_t avail;                              //54-55
} sensor_frame;

// init
void init_i2c();

// Main loop (contains process states)
void sensor_loop();
void print_sensor_frame(sensor_frame rec);

// Sensor polling logic
sensor_frame get_sensor_frame();
imu_frame get_imu_frame(uint16_t addr);

// Swing Detection/frameing
int detect_swing(sensor_frame current, sensor_frame last);
void frame_swing();

// Data pushing/updating
void add_swing(sensor_frame* swing);
#endif
