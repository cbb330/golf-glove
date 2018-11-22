/**
 * golf_glove.h
 *
 * Makes gatt_application_start(void) available outside of the golf_glove.c.
 */

#ifndef __GOLF_GLOVE_H
#define __GOLF_GLOVE_H

#include "wiced_bt_dev.h"

extern void gatt_application_start(void);
extern wiced_bt_dev_status_t golf_glove_management_callback( wiced_bt_management_evt_t event, wiced_bt_management_evt_data_t *p_event_data );

#endif
