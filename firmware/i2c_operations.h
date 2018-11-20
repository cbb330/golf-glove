#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_rtos.h"
#include "sparcommon.h"
#include "wiced_hal_i2c.h"
#include <unistd.h>
typedef unsigned char UINT8;

void i2c_write8(UINT8 addr, UINT8 reg, UINT8 value);
void i2c_write16(UINT8 address, UINT8 reg, UINT16 value);
UINT8 i2c_read8(UINT8 addr, UINT8 reg);
UINT16 i2c_read16(UINT8 addr, UINT8 reg);
UINT8 i2c_readBuffer(UINT8 addr, UINT8 reg, UINT8 len, UINT8 *buffer);
