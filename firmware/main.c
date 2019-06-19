/*
 * main.c
 *
 * Application startup procedures and event loop.
 */

#include "wiced_bt_trace.h"
#include "wiced_rtos.h"
#include "wiced_bt_gatt.h"
#include "wiced_timer.h"
#include "rtc.h"
#include "buffer/frame_buffer.h"
#include "buffer/circular_buffer.h"
#include "gatt/golf_glove.h"
#include "gatt/golf_glove_db.h"
#include "sensor_polling.h"


int count;
// BOOL32 swung;
wiced_thread_t* thread;
void do_thread(uint32_t arg);
void do_timer(uint32_t arg);
cbuf_handle_t cbuffer;

static wiced_thread_t* sensor_loop_handle;

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
    // frame_buffer_init();

    WICED_BT_TRACE("Main Sensor Loop\r\n");
    WICED_BT_TRACE("bytes: %10d\r\n", wiced_memory_get_free_bytes());

    //new thread sensor_loop();
    sensor_loop_handle = wiced_rtos_create_thread();
    wiced_rtos_init_thread(sensor_loop_handle, 6, "sensor_loop", sensor_loop, 512, NULL);

    // configure and initialize real time clock
    rtcConfig.oscillatorFrequencykHz = RTC_REF_CLOCK_SRC_32KHZ;
    rtc_init();

    count = 0;
    // swung = FALSE;

    wiced_rtos_delay_milliseconds(3000, KEEP_THREAD_ACTIVE);

    thread = wiced_rtos_create_thread();
    wiced_rtos_init_thread(thread, 6, "Main Thread", do_thread, 256, NULL);
    // sensor_loop();
}

void do_thread(uint32_t arg) {
    wiced_timer_t timer;

    wiced_init_timer(&timer, do_timer, NULL, WICED_MILLI_SECONDS_PERIODIC_TIMER);
    wiced_start_timer(&timer, POLL_PERIOD * 2);

    while (1) {
        wiced_rtos_delay_milliseconds(1000, ALLOW_THREAD_TO_SLEEP);
    }
}

void do_timer(uint32_t arg) {
    //WICED_BT_TRACE("AAAAAAAAAAAAAAAAA\r\n");
    // WICED_BT_TRACE("sensor_loop: connected: %02x\r\n", connected);
    // count++;
    // if (count >= 200) {
    //     count = 0;
        // WICED_BT_TRACE("counted to 200.\r\n");
        // WICED_BT_TRACE("circular_buf_empty readiness: %02x %02x\r\n",
        //     circular_buf_empty(cbuffer), get_readiness());
        // WICED_BT_TRACE("swinging readiness swung: %02x %02x %02x\r\n",
            // get_swinging(), get_readiness(), swung);
        // WICED_BT_TRACE("circular_buf_empty: %02x\r\n", circular_buf_empty(cbuffer));
        // WICED_BT_TRACE("readiness: %02x\r\n", get_readiness());        
        // WICED_BT_TRACE("accel1z: %06d\r\n", get_accel1z());
    // }
    if (curr_state == STATE_SENDING) {
        // connected and swing has ended
        if (!circular_buf_empty(cbuffer)) {
            // buffer still has data, send it
            wiced_bt_gatt_send_notification(1, HDLC_GOLF_GLOVE_NEXT_FRAME_VALUE, 0, NULL);
            // send_next_frame_notification();
        }
    }
}
