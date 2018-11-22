/*
 * gatt_hooks.c
 *
 * Function declarations for GATT read/write operation hooks into main application code.
 */

#ifndef __GATT_HOOKS_H
#define __GATT_HOOKS_H

#include "gatt/golf_glove_db.h"

void get_generic_access_device_name_value(gatt_db_lookup_table tbl);
void get_generic_access_appearance_value(gatt_db_lookup_table tbl);
void get_golf_glove_next_frame_value(gatt_db_lookup_table tbl);

// TODO (@willcarroll7): Finish writing GATT hooks

#endif