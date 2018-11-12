#ifndef __GOLF_GLOVE_H
#define __GOLF_GLOVE_H

#include "wiced.h"
#include "wiced_bt_cfg.h"
#include "wiced_bt_gatt.h"
#include "wiced_transport.h"

/*******************************************************************
 * Constant Definitions
 ******************************************************************/
#define TRANS_UART_BUFFER_SIZE  1024
#define TRANS_UART_BUFFER_COUNT 2

/*******************************************************************
 * Variable Definitions
 ******************************************************************/
extern const wiced_bt_cfg_settings_t wiced_bt_cfg_settings;
extern const wiced_bt_cfg_buf_pool_t wiced_bt_cfg_buf_pools[WICED_BT_CFG_NUM_BUF_POOLS];
// Transport pool for sending RFCOMM data to host
static wiced_transport_buffer_pool_t* transport_pool = NULL;

/*******************************************************************
 * Function Prototypes
 ******************************************************************/
extern void gatt_application_start(void);
static void golf_glove_app_init(void);
static wiced_bt_dev_status_t golf_glove_management_callback(
        wiced_bt_management_evt_t event,
        wiced_bt_management_evt_data_t *p_event_data);
static void golf_glove_set_advertisement_data(void);
static void golf_glove_advertisement_stopped(void);
static void golf_glove_reset_device(void);
/* GATT Registration Callbacks */
static wiced_bt_gatt_status_t golf_glove_write_handler(
        wiced_bt_gatt_write_t *p_write_req, uint16_t conn_id);
static wiced_bt_gatt_status_t golf_glove_read_handler(
        wiced_bt_gatt_read_t *p_read_req, uint16_t conn_id);
static wiced_bt_gatt_status_t golf_glove_connect_callback(
        wiced_bt_gatt_connection_status_t *p_conn_status);
static wiced_bt_gatt_status_t golf_glove_server_callback(uint16_t conn_id,
        wiced_bt_gatt_request_type_t type, wiced_bt_gatt_request_data_t *p_data);
static wiced_bt_gatt_status_t golf_glove_event_handler(
        wiced_bt_gatt_evt_t event, wiced_bt_gatt_event_data_t *p_event_data);
static uint32_t hci_control_process_rx_cmd(uint8_t* p_data, uint32_t len);
#ifdef HCI_TRACE_OVER_TRANSPORT
static void golf_glove_trace_callback ( wiced_bt_hci_trace_type_t type, uint16_t length, uint8_t* p_data );
#endif

/*******************************************************************
 * Macro Definitions
 ******************************************************************/
// Macro to extract uint16_t from little-endian byte array
#define LITTLE_ENDIAN_BYTE_ARRAY_TO_UINT16(byte_array) \
        (uint16_t)( ((byte_array)[0] | ((byte_array)[1] << 8)) )

#endif
