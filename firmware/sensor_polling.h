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
#include "frame.h"
#include "buffer/circular_buffer.h"
#include <unistd.h>
#include <stdlib.h>
#include <time.h>

#define WRIST_IMU_ADDR 0x0000 // wrist IMU I2C Addr
#define HAND_IMU_ADDR 0x0000 // hand IMU I2C Addr
#define POLL_RATE 200 // hertz
#define POLL_PERIOD 5 // milliseconds

#define WRIST1_PIN ADC_INPUT_P0
#define WRIST2_PIN ADC_INPUT_P28
#define WRIST3_PIN ADC_INPUT_P1
#define WRIST4_PIN ADC_INPUT_P16
#define PRES1_PIN ADC_INPUT_P17
#define PRES2_PIN ADC_INPUT_P38

typedef enum {
    STATE_INIT,
    STATE_PRERECORDING,
    STATE_RECORDING,
    STATE_SENDING,
    NUM_STATES
} state_t; 

state_t curr_state;

// sensor_frame* frame_buffer;
cbuf_handle_t cbuffer;

static BOOL8 connected = FALSE;
static UINT16 accel1z = 14;
int real_time = 0;

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

// Data connection readiness
void set_readiness(BOOL8 state);
BOOL8 get_readiness();

UINT16 get_accel1z();
void set_accel1z(UINT16* value);

state_t get_state();

#endif
