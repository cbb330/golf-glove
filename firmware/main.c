/*
 * main.c
 *
 * Application startup procedures and event loop.
 */

#include "wiced.h"
#include "wiced_bt_cfg.h"
#include "wiced_bt_stack.h"
#include "wiced_bt_trace.h"
#include "wiced_hal_rand.h"
#include "wiced_platform.h"
#include "wiced_rtos.h"
#include "wiced_timer.h"
#include "sparcommon.h"

#include "buffer/frame_buffer.h"
#include "gatt/golf_glove.h"
#include "sensor/sensor_frame.h"

/* Function Declarations */
wiced_bt_dev_status_t bt_management_callback( wiced_bt_management_evt_t event, wiced_bt_management_evt_data_t *p_event_data );

/* Constant Declarations */
extern const wiced_bt_cfg_settings_t wiced_bt_cfg_settings;
extern const wiced_bt_cfg_buf_pool_t wiced_bt_cfg_buf_pools[WICED_BT_CFG_NUM_BUF_POOLS];

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
    // wiced_set_debug_uart( WICED_ROUTE_DEBUG_TO_WICED_UART );
#endif

    // Setup BLE stack/broadcasting
    gatt_application_start();
    wiced_bt_stack_init(bt_management_callback, &wiced_bt_cfg_settings, wiced_bt_cfg_buf_pools);
}

wiced_bt_dev_status_t bt_management_callback( wiced_bt_management_evt_t event, wiced_bt_management_evt_data_t *p_event_data ) {
    // Perform on Bluetooth setup complete
    if (event == BTM_ENABLED_EVT) {
        // TODO
    }
    
    return golf_glove_management_callback(event, p_event_data);
}
