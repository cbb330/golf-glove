/*
 * This file has been automatically generated by the WICED 20719-B1 Designer.
 * BLE device's GATT database and device configuration.
 *
 */

// golf_glove_db.c

#include "wiced_bt_uuid.h"
#include "wiced_bt_gatt.h"
#include "golf_glove_db.h"

/*************************************************************************************
** GATT server definitions
*************************************************************************************/

const uint8_t gatt_database[] = // Define GATT database
{
    /* Primary Service 'Generic Attribute' */
    PRIMARY_SERVICE_UUID16 (HDLS_GENERIC_ATTRIBUTE, UUID_SERVICE_GATT),

    /* Primary Service 'Generic Access' */
    PRIMARY_SERVICE_UUID16 (HDLS_GENERIC_ACCESS, UUID_SERVICE_GAP),

        /* Characteristic 'Device Name' */
        CHARACTERISTIC_UUID16 (HDLC_GENERIC_ACCESS_DEVICE_NAME, HDLC_GENERIC_ACCESS_DEVICE_NAME_VALUE,
            UUID_CHARACTERISTIC_DEVICE_NAME, LEGATTDB_CHAR_PROP_READ,
            LEGATTDB_PERM_READABLE),

        /* Characteristic 'Appearance' */
        CHARACTERISTIC_UUID16 (HDLC_GENERIC_ACCESS_APPEARANCE, HDLC_GENERIC_ACCESS_APPEARANCE_VALUE,
            UUID_CHARACTERISTIC_APPEARANCE, LEGATTDB_CHAR_PROP_READ,
            LEGATTDB_PERM_READABLE),

    /* Primary Service 'golf_glove' */
    PRIMARY_SERVICE_UUID128 (HDLS_GOLF_GLOVE, __UUID_GOLF_GLOVE),

        /* Characteristic 'next_frame' */
        CHARACTERISTIC_UUID128 (HDLC_GOLF_GLOVE_NEXT_FRAME, HDLC_GOLF_GLOVE_NEXT_FRAME_VALUE,
            __UUID_GOLF_GLOVE_NEXT_FRAME, LEGATTDB_CHAR_PROP_READ | LEGATTDB_CHAR_PROP_NOTIFY | LEGATTDB_CHAR_PROP_INDICATE,
            LEGATTDB_PERM_READABLE),

            /* Descriptor 'Client Characteristic Configuration' */
            CHAR_DESCRIPTOR_UUID16_WRITABLE (HDLD_GOLF_GLOVE_NEXT_FRAME_CLIENT_CONFIGURATION,
                UUID_DESCRIPTOR_CLIENT_CHARACTERISTIC_CONFIGURATION, LEGATTDB_PERM_READABLE | LEGATTDB_PERM_WRITE_REQ | LEGATTDB_PERM_AUTH_WRITABLE),

        /* Characteristic 'realtime_enabled' */
        CHARACTERISTIC_UUID128_WRITABLE (HDLC_GOLF_GLOVE_REALTIME_ENABLED, HDLC_GOLF_GLOVE_REALTIME_ENABLED_VALUE,
            __UUID_GOLF_GLOVE_REALTIME_ENABLED, LEGATTDB_CHAR_PROP_READ | LEGATTDB_CHAR_PROP_WRITE,
            LEGATTDB_PERM_READABLE | LEGATTDB_PERM_WRITE_REQ),

        /* Characteristic 'data_available' */
        CHARACTERISTIC_UUID128 (HDLC_GOLF_GLOVE_DATA_AVAILABLE, HDLC_GOLF_GLOVE_DATA_AVAILABLE_VALUE,
            __UUID_GOLF_GLOVE_DATA_AVAILABLE, LEGATTDB_CHAR_PROP_READ | LEGATTDB_CHAR_PROP_NOTIFY | LEGATTDB_CHAR_PROP_INDICATE,
            LEGATTDB_PERM_READABLE),

            /* Descriptor 'Client Characteristic Configuration' */
            CHAR_DESCRIPTOR_UUID16_WRITABLE (HDLD_GOLF_GLOVE_DATA_AVAILABLE_CLIENT_CONFIGURATION,
                UUID_DESCRIPTOR_CLIENT_CHARACTERISTIC_CONFIGURATION, LEGATTDB_PERM_READABLE | LEGATTDB_PERM_WRITE_REQ | LEGATTDB_PERM_AUTH_WRITABLE),

        /* Characteristic 'send_data' */
        CHARACTERISTIC_UUID128_WRITABLE (HDLC_GOLF_GLOVE_SEND_DATA, HDLC_GOLF_GLOVE_SEND_DATA_VALUE,
            __UUID_GOLF_GLOVE_SEND_DATA, LEGATTDB_CHAR_PROP_READ | LEGATTDB_CHAR_PROP_WRITE,
            LEGATTDB_PERM_READABLE | LEGATTDB_PERM_WRITE_REQ),

            /* Descriptor 'Characteristic User Description' */
            CHAR_DESCRIPTOR_UUID16 (HDLD_GOLF_GLOVE_SEND_DATA_USER_DESCRIPTION,
                UUID_DESCRIPTOR_CHARACTERISTIC_USER_DESCRIPTION, LEGATTDB_PERM_READABLE),

};

// Length of the GATT database
const uint16_t gatt_database_len = sizeof(gatt_database);

