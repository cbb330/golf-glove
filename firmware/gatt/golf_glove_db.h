/*
 * This file has been automatically generated by the WICED 20719-B1 Designer.
 * Definitions for constants used in the device's GATT database and function
 * prototypes.
 *
 */

// golf_glove_db.h

#ifndef __GATT_DATABASE_H__
#define __GATT_DATABASE_H__

#include "wiced.h"
#include "wiced_bt_types.h"

#define __UUID_GOLF_GLOVE                                     0x3a, 0xc5, 0x98, 0xd6, 0x1b, 0x7e, 0x42, 0x2e, 0xb5, 0xf1, 0x34, 0xfe, 0x48, 0x89, 0x83, 0x7c
#define __UUID_GOLF_GLOVE_NEXT_FRAME                          0x5a, 0x41, 0x42, 0x57, 0xd5, 0x13, 0x4c, 0x6f, 0xb8, 0xab, 0x53, 0x43, 0x8a, 0x86, 0x35, 0x6c
#define __UUID_GOLF_GLOVE_REALTIME_ENABLED                    0x59, 0x92, 0x53, 0x7e, 0x1b, 0x6d, 0x41, 0x78, 0xba, 0x27, 0x22, 0xfa, 0xb3, 0x8c, 0xe4, 0x72
#define __UUID_GOLF_GLOVE_DATA_AVAILABLE                      0x90, 0x93, 0x34, 0xaa, 0xc6, 0xce, 0x4b, 0xd0, 0x95, 0xab, 0x73, 0x98, 0x33, 0xae, 0xf7, 0xbd

// ***** Primary Service 'Generic Attribute'
#define HDLS_GENERIC_ATTRIBUTE                                0x0001

// ***** Primary Service 'Generic Access'
#define HDLS_GENERIC_ACCESS                                   0x0014
// ----- Characteristic 'Device Name'
#define HDLC_GENERIC_ACCESS_DEVICE_NAME                       0x0015
#define HDLC_GENERIC_ACCESS_DEVICE_NAME_VALUE                 0x0016
// ----- Characteristic 'Appearance'
#define HDLC_GENERIC_ACCESS_APPEARANCE                        0x0017
#define HDLC_GENERIC_ACCESS_APPEARANCE_VALUE                  0x0018

// ***** Primary Service 'golf_glove'
#define HDLS_GOLF_GLOVE                                       0x0028
// ----- Characteristic 'next_frame'
#define HDLC_GOLF_GLOVE_NEXT_FRAME                            0x0029
#define HDLC_GOLF_GLOVE_NEXT_FRAME_VALUE                      0x002A
// ===== Descriptor 'Client Configuration'
#define HDLD_GOLF_GLOVE_NEXT_FRAME_CLIENT_CONFIGURATION       0x002B
// ----- Characteristic 'realtime_enabled'
#define HDLC_GOLF_GLOVE_REALTIME_ENABLED                      0x002C
#define HDLC_GOLF_GLOVE_REALTIME_ENABLED_VALUE                0x002D
// ===== Descriptor 'Client Configuration'
#define HDLD_GOLF_GLOVE_REALTIME_ENABLED_CLIENT_CONFIGURATION 0x002E
// ----- Characteristic 'data_available'
#define HDLC_GOLF_GLOVE_DATA_AVAILABLE                        0x002F
#define HDLC_GOLF_GLOVE_DATA_AVAILABLE_VALUE                  0x0030
// ===== Descriptor 'Client Configuration'
#define HDLD_GOLF_GLOVE_DATA_AVAILABLE_CLIENT_CONFIGURATION   0x0031

// External Lookup Table Entry
typedef struct
{
    uint16_t handle;
    uint16_t max_len;
    uint16_t cur_len;
    uint8_t  *p_data;
} gatt_db_lookup_table;

// External definitions
extern const uint8_t  gatt_database[];
extern const uint16_t gatt_database_len;
extern gatt_db_lookup_table golf_glove_gatt_db_ext_attr_tbl[];
extern const uint16_t golf_glove_gatt_db_ext_attr_tbl_size;
extern uint8_t BT_LOCAL_NAME[];
extern const uint16_t BT_LOCAL_NAME_CAPACITY;

#endif /* __GATT_DATABASE_H__ */
