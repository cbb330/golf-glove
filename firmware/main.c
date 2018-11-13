/*
 * main.c
 *
 * Application startup procedures and event loop.
 */

#include "wiced_bt_trace.h"

#include "buffer/frame_buffer.h"
#include "gatt/golf_glove.h"
#include "sensor_polling.h"

/**
 * Application entry point. Initializes BLE subsystem and application logic.
 */
void application_start(void) {
    // Setup BLE stack/broadcasting
    gatt_application_start();

    //Initialize buffers
    wiced_result_t frame_buffer_result = frame_buffer_init();
    if (frame_buffer_result == WICED_SUCCESS) {
        WICED_BT_TRACE("Frame buffer initialized.\r\n");
    } else {
        WICED_BT_TRACE("Error: Frame buffer failed to initialize.\r\n");
    }

    uint32_t frame;
    memset(&frame, 5, sizeof(uint32_t));
    wiced_result_t temp = frame_buffer_push_frame(&frame);
    if (temp == WICED_SUCCESS) {
        WICED_BT_TRACE("Pushed frame to buffer.\r\n");
    } else {
        WICED_BT_TRACE("Error: Could not push frame to buffer.\r\n");
    }
}
