/*
 * frame_buffer.c
 *
 * Definitions for functions used in managing the global sensor data frame buffer.
 */

#include "wiced_bt_trace.h"
#include "wiced_result.h"
#include "wiced_rtos.h"

#include "buffers/frame_buffer.h"
#include "sensor_polling.h"

wiced_result_t frame_buffer_init( void ) {
    _frame_buffer = wiced_rtos_create_queue();
    wiced_result_t result = wiced_rtos_init_queue(_frame_buffer, "Frame Buffer",
                                                  sizeof(sensor_frame), FRAME_BUFFER_SIZE);
    return result;
}

int frame_buffer_is_data_available( void ) {
    wiced_bool_t is_empty = wiced_rtos_is_queue_empty(_frame_buffer);
    return !is_empty;
}

int frame_buffer_is_full( void ) {
    wiced_bool_t is_full = wiced_rtos_is_queue_full(_frame_buffer);
    return is_full;
}

wiced_result_t frame_buffer_push_frame(sensor_frame* frame) {
    wiced_result_t result = wiced_rtos_push_to_queue(_frame_buffer, frame, FRAME_BUFFER_TIMEOUT);
    return result;
}

wiced_result_t frame_buffer_pop_frame(sensor_frame* frame) {
    wiced_result_t result = wiced_rtos_pop_from_queue(_frame_buffer, frame, FRAME_BUFFER_TIMEOUT);
    return result;
}

wiced_result_t frame_buffer_clear( void ) {
    wiced_result_t result = wiced_rtos_deinit_queue(_frame_buffer);
    if (result != WICED_SUCCESS) {
        return WICED_ERROR;
    }

    result = wiced_rtos_init_queue(_frame_buffer, "Frame Buffer",
                                                  sizeof(sensor_frame), FRAME_BUFFER_SIZE);
    return result;
}
