/*
 * gatt_hooks.h
 *
 * Declarations for functions used as hooks for responding to GATT attribute requests.
 */

#ifndef __GATT_HOOKS_H
#define __GATT_HOOKS_H

#include "wiced_bt_types.h"

#include "sensor_polling.h"

#define GATT_RETURN(p_value) memcpy(golf_glove_gatt_db_ext_attr_tbl[i].p_data, p_value, golf_glove_gatt_db_ext_attr_tbl[i].cur_len)

extern uint32_t gatt_read_next_frame(void);
extern wiced_bool_t gatt_read_data_available(void);

#endif
