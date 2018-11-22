/*
 * frame_buffer.c
 *
 * Definitions for functions used in managing the global sensor data frame buffer.
 */

#include "frame_buffer.h"

#include "wiced.h"
#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_result.h"

#include "sensor/sensor_frame.h"

// Temporary "frame buffer"
static sensor_frame current_frame;

wiced_result_t frame_buffer_init(void) {
    memset(&current_frame, 0xFFFFFFFF, sizeof(sensor_frame));
    return WICED_SUCCESS;
}

wiced_bool_t frame_buffer_is_data_available(void) {
    return WICED_TRUE;
}

wiced_bool_t frame_buffer_is_full(void) {
    return WICED_FALSE;
}

wiced_result_t frame_buffer_push_frame(sensor_frame* frame) {
    memcpy(&current_frame, frame, sizeof(sensor_frame));
    return WICED_SUCCESS;
}

wiced_result_t frame_buffer_pop_frame(sensor_frame* frame) {
    memcpy(frame, &current_frame, sizeof(sensor_frame));
    return WICED_SUCCESS;
}

wiced_result_t frame_buffer_clear(void) {
    memset(&current_frame, 0xFF, sizeof(sensor_frame));
    return WICED_SUCCESS;
}
