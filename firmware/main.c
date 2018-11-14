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
#if ((defined WICED_BT_TRACE_ENABLE) || (defined HCI_TRACE_OVER_TRANSPORT))
    /* Set the Debug UART as WICED_ROUTE_DEBUG_NONE to get rid of prints */
    //  wiced_set_debug_uart( WICED_ROUTE_DEBUG_NONE );

    /* Set Debug UART as WICED_ROUTE_DEBUG_TO_PUART to see debug traces on Peripheral UART (PUART) */
    wiced_set_debug_uart( WICED_ROUTE_DEBUG_TO_PUART );

    /* Set the Debug UART as WICED_ROUTE_DEBUG_TO_WICED_UART to send debug strings over the WICED debug interface */
    //  wiced_set_debug_uart( WICED_ROUTE_DEBUG_TO_WICED_UART );
#endif

    init_i2c();

    // Setup BLE stack/broadcasting
    gatt_application_start();

    // Init frame buffer
    frame_buffer_init();
}
