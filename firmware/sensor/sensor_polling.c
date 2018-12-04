/*
 * sensor_polling.c
 *
 * Functions for polling and packaging sensor data.
 */


#include "sensor/sensor_polling.h"

#include "wiced.h"
#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_rtos.h"
#include "wiced_timer.h"

#include "sensor/sensor_frame.h"

void sensor_polling_frame_push_init(void) {
    // Initialize Frame Buffer
    if (frame_buffer_init() != WICED_SUCCESS) {
        WICED_BT_TRACE("FrameBuffer: Failed to initialize.\r\n");
    } else {
        WICED_BT_TRACE("FrameBuffer: Initialized.\r\n");
    }

    // Start Frame Push Timer
    static wiced_timer_t frame_push_timer;
    if (wiced_init_timer(&frame_push_timer, sensor_polling_frame_push_timer_cb, NULL, WICED_MILLI_SECONDS_PERIODIC_TIMER) != WICED_SUCCESS) {
        WICED_BT_TRACE("FrameTimer: Failed to initialize.\r\n");
    } else {
        WICED_BT_TRACE("FrameTimer: Initialized.\r\n");
    }

    if (wiced_start_timer(&frame_push_timer, FRAME_PERIOD) != WICED_SUCCESS) {
        WICED_BT_TRACE("FrameTimer: Failed to start.\r\n");
    } else {
        WICED_BT_TRACE("FrameTimer: Started.\r\n");
    }
}

void sensor_polling_frame_push_timer_cb(uint32_t arg) {
    sensor_frame frame = {0};
    wiced_hal_rand_gen_num_array(&frame, sizeof(sensor_frame) / 4);
    frame_buffer_push_frame(&frame);
    wiced_bt_gatt_send_notification(1, 0x002A, 0, NULL);
}