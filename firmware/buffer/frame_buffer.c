/*
 * frame_buffer.c
 *
 * Definitions for functions used in managing the global sensor data frame buffer.
 */

#include "../buffer/frame_buffer.h"

#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_result.h"
#include "wiced_rtos.h"

#include "sensor_polling.h"

/* Initializes the frame buffer as a queue */
wiced_result_t frame_buffer_init(void) {
    _frame_buffer = wiced_rtos_create_queue();
    if(!_frame_buffer) {
        WICED_BT_TRACE("ERROR: Queue Creation Failed.\r\n");
        return WICED_ERROR;
    }
    WICED_BT_TRACE("uint32_t size: %d\r\n", sizeof(uint32_t));
    wiced_result_t result = wiced_rtos_init_queue(_frame_buffer, "Frame Buffer", sizeof(uint32_t), FRAME_BUFFER_SIZE);
    return result;
}

/* Returns integer 1 if data is available to be read from frame buffer */
wiced_bool_t frame_buffer_is_data_available(void) {
    wiced_bool_t is_empty = (wiced_rtos_is_queue_empty(_frame_buffer) == WICED_SUCCESS) ? 1 : 0;
    return !is_empty;
}

/* Returns integer 1 if the frame buffer is full */
wiced_bool_t frame_buffer_is_full(void) {
    wiced_bool_t is_full = (wiced_rtos_is_queue_full(_frame_buffer) == WICED_SUCCESS) ? 1 : 0;
    return is_full;
}

/* Returns WICED_SUCCESS if a frame item was successfully pushed into the frame buffer */
wiced_result_t frame_buffer_push_frame(uint32_t* frame) {
    wiced_result_t result = wiced_rtos_push_to_queue(_frame_buffer, frame, WICED_WAIT_FOREVER);
    return result;
}

/* Returns WICED_SUCCESS if a frame item was successfully popped from the frame buffer */
wiced_result_t frame_buffer_pop_frame(uint32_t* frame) {
    wiced_result_t result = wiced_rtos_pop_from_queue(_frame_buffer, frame, 100);
    WICED_BT_TRACE("adsf");
    return result;
}

/* Returns WICED_SUCCESS if the frame buffer was successfully cleared */
wiced_result_t frame_buffer_clear(void) {
    wiced_result_t result = wiced_rtos_deinit_queue(_frame_buffer);
    if (result != WICED_SUCCESS) {
        return WICED_ERROR;
    }

    result = wiced_rtos_init_queue(_frame_buffer, "Frame Buffer", sizeof(uint32_t), FRAME_BUFFER_SIZE);
    return result;
}
