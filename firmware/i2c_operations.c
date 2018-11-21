#include "i2c_operations.h"

void i2c_write8(UINT8 address, UINT8 reg, UINT8 value) {
    //WICED_BT_TRACE("i2c_write8\r\n");
    UINT8 res;
    UINT8 data[2] = {reg, value};
    res = wiced_hal_i2c_write(data, 2, address);
    if (res == 1)
        WICED_BT_TRACE("ERROR: i2c write Error.\r\n");

}

void i2c_write16(UINT8 address, UINT8 reg, UINT16 value) {
    UINT8 res;
    UINT8 data[3] = {reg, value>>8, value & 0xFF};
    res = wiced_hal_i2c_write(data, 3, address);
    if (res == 1)
        WICED_BT_TRACE("ERROR: i2c write Error.\r\n");
}

UINT8 i2c_read8(UINT8 address, UINT8 reg) {
    //WICED_BT_TRACE("i2c_read8\r\n");
    UINT8 value;

    i2c_readBuffer(address, reg, 1, &value);

    return value;
}

UINT16 i2c_read16(UINT8 address, UINT8 reg) {
    UINT8 buf[2];
    i2c_readBuffer(address, reg, 2, buf);
    UINT16 value = buf[0] << 8 | buf[1];
    return value;
}

UINT8 i2c_readBuffer(UINT8 address, UINT8 reg, UINT8 len, UINT8 *buffer) {
    //WICED_BT_TRACE("i2c_readBuffer\r\n");

    UINT8 res;
    res = wiced_hal_i2c_combined_read(&reg, 1, buffer, sizeof(buffer), address);
    if (res == 1)
        WICED_BT_TRACE("ERROR: i2c combined read Error.\r\n");
    else {
        /*
         WICED_BT_TRACE("I2C READ ");
         int i;
         for (i = 0; i < len; i++)
         WICED_BT_TRACE("0x%x ", buffer[0]);
         WICED_BT_TRACE("\r\n");
         */
    }


    return res;
}
