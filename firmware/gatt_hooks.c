/*
 * gatt_hooks.c
 *
 * Definitions for functions used as hooks for responding to GATT attribute requests.
 */

#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"

#include "gatt_hooks.h"
#include "sensor_polling.h"
#include "buffer/frame_buffer.h"

uint32_t gatt_read_next_frame(void) {
    uint32_t next_frame;
    wiced_result_t result = frame_buffer_pop_frame(&next_frame);

    if (result != WICED_SUCCESS) {
        memset(&next_frame, 0, sizeof(sensor_frame));
    }
    return next_frame;
}

wiced_bool_t gatt_read_data_available(void) {
    wiced_bool_t is_data_available = frame_buffer_is_data_available();
    return is_data_available;
}
