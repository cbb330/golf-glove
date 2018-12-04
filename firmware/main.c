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

#include "wiced_bt_gatt.h"

#include "buffer/frame_buffer.h"
#include "gatt/golf_glove.h"
#include "sensor/sensor_polling.h"

#define DEFAULT_STACK_SIZE 256

/* Function Declarations */
wiced_bt_dev_status_t bt_management_callback( wiced_bt_management_evt_t event, wiced_bt_management_evt_data_t *p_event_data );
void frame_push_exec(uint32_t arg);

/* Constant Declarations */
extern const wiced_bt_cfg_settings_t wiced_bt_cfg_settings;
extern const wiced_bt_cfg_buf_pool_t wiced_bt_cfg_buf_pools[WICED_BT_CFG_NUM_BUF_POOLS];

static wiced_thread_t* frame_push_thread;

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
        // Start thread to regularly push data frames to client
        frame_push_thread = wiced_rtos_create_thread();
        if (wiced_rtos_init_thread(frame_push_thread, 6, "Frame Push Thread", frame_push_exec, DEFAULT_STACK_SIZE, NULL) != WICED_SUCCESS)  {
            WICED_BT_TRACE("FrameThread: Failed to initialize.\r\n");
        }
    }
    
    return golf_glove_management_callback(event, p_event_data);
}

void frame_push_exec(uint32_t arg) {
    WICED_BT_TRACE("FrameThread: Started.\r\n");

    // Setup Frame Pushing Timer/Callback
    sensor_polling_frame_push_init();
}

void frame_push_cb(uint32_t arg) {
    //WICED_BT_TRACE("TIMER CALLBACK\r\n");
    sensor_frame frame = {0};
    wiced_hal_rand_gen_num_array(&frame, sizeof(sensor_frame) / 4);
    frame_buffer_push_frame(&frame);
    wiced_bt_gatt_send_notification(1, 0x002A, 0, NULL);
    //WICED_BT_TRACE("Sent frame.\r\n");
}