/*
 * main.c
 *
 * Application startup procedures and event loop.
 */

#include "buffer/frame_buffer.h"
#include "gatt/golf_glove.h"

/**
 * Application entry point. Initializes BLE subsystem and application logic.
 */
void application_start(void) {
    // Setup BLE stack/broadcasting
    gatt_application_start();

    // Init frame buffer
    frame_buffer_init();
}
