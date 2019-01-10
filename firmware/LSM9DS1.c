#include "LSM9DS1.h"

int lsm_begin(UINT8 address_accelgyro, UINT8 address_mag) {
    //WICED_BT_TRACE("lsm_begin\r\n");
    // soft reset & reboot accel/gyro
    i2c_write8(address_accelgyro, LSM9DS1_REGISTER_CTRL_REG8, 0x05);
    // soft reset & reboot magnetometer
    i2c_write8(address_mag, LSM9DS1_REGISTER_CTRL_REG2_M, 0x0C);
    wiced_rtos_delay_milliseconds(1000, KEEP_THREAD_ACTIVE);

    UINT8 id = i2c_read8(address_accelgyro, LSM9DS1_REGISTER_WHO_AM_I_XG);
    while (id != LSM9DS1_XG_ID)
        id = i2c_read8(address_accelgyro, LSM9DS1_REGISTER_WHO_AM_I_XG);

    if (id != LSM9DS1_XG_ID) {
        WICED_BT_TRACE("ERROR on LSM9DS1_REGISTER_WHO_AM_I_XG : %d %d\r\n", id,
        LSM9DS1_XG_ID);
        return 0;
    }

    id = i2c_read8(address_mag, LSM9DS1_REGISTER_WHO_AM_I_M);
    while (id != LSM9DS1_MAG_ID)
        id = i2c_read8(address_accelgyro, LSM9DS1_REGISTER_WHO_AM_I_XG);
    if (id != LSM9DS1_MAG_ID) {
        WICED_BT_TRACE("ERROR on LSM9DS1_REGISTER_WHO_AM_I_M : %d %d\r\n", id,
        LSM9DS1_MAG_ID);
        return 0;
    }

    // enable gyro continuous
    i2c_write8(address_accelgyro, LSM9DS1_REGISTER_CTRL_REG1_G, 0xC0); //0b11000000 ;on XYZ

    // Enable the accelerometer continous
    i2c_write8(address_accelgyro, LSM9DS1_REGISTER_CTRL_REG5_XL, 0x38); // enable X Y and Z axis
    //i2c_write8(LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO, LSM9DS1_REGISTER_CTRL_REG6_XL, 0xC0); // 1 KHz out data rate, BW set by ODR, 408Hz anti-aliasing

    // enable mag continuous
    //i2c_write8(LSM9DS1_INTERNAL_ADDRESS_MAG, LSM9DS1_REGISTER_CTRL_REG1_M, 0xFC); // high perf XY, 80 Hz ODR
    i2c_write8(address_mag, LSM9DS1_REGISTER_CTRL_REG3_M, 0x00); // continuous mode
    //i2c_write8(LSM9DS1_INTERNAL_ADDRESS_MAG, LSM9DS1_REGISTER_CTRL_REG4_M, 0x0C); // high perf Z mode

    // Set default ranges for the various sensors
    lsm_setupAccel(address_accelgyro, LSM9DS1_ACCELRANGE_2G);
    lsm_setupMag(address_mag, LSM9DS1_MAGGAIN_4GAUSS);
    lsm_setupGyro(address_accelgyro, LSM9DS1_GYROSCALE_2000DPS);

    return 0;
}

void lsm_read() {
    UINT8 address = LSM9DS1_ADDRESS_ACCELGYRO;
    lsm_readAccel(address);
    lsm_readGyro(address);
    lsm_readMag(address);
    address = LSM9DS1_ADDRESS_MAG;
    lsm_readTemp(address);
}

void lsm_read_internal() {
    UINT8 address = LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO;
    lsm_readAccel(address);
    lsm_readGyro(address);
    lsm_readMag(address);
    address = LSM9DS1_INTERNAL_ADDRESS_MAG;
    lsm_readTemp(address);
}

void lsm_readAccel(UINT8 address) {
    //WICED_BT_TRACE("lsm_readAccel\r\n");
    // Read the accelerometer
    UINT8 buffer[6];
    i2c_readBuffer(address, 0x80 | LSM9DS1_REGISTER_OUT_X_L_XL, 6, buffer);

    UINT8 xlo = buffer[0];
    int16_t xhi = buffer[1];
    UINT8 ylo = buffer[2];
    int16_t yhi = buffer[3];
    UINT8 zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low UINT8 first)
    xhi <<= 8;
    xhi |= xlo;
    yhi <<= 8;
    yhi |= ylo;
    zhi <<= 8;
    zhi |= zlo;

    accelData.x = xhi;
    accelData.y = yhi;
    accelData.z = zhi;
}

void lsm_readMag(UINT8 address) {
    //WICED_BT_TRACE("lsm_readMag\r\n");
    // Read the magnetometer
    UINT8 buffer[6];
    i2c_readBuffer(address, 0x80 | LSM9DS1_REGISTER_OUT_X_L_M, 6, buffer);

    UINT8 xlo = buffer[0];
    int16_t xhi = buffer[1];
    UINT8 ylo = buffer[2];
    int16_t yhi = buffer[3];
    UINT8 zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low UINT8 first)
    xhi <<= 8;
    xhi |= xlo;
    yhi <<= 8;
    yhi |= ylo;
    zhi <<= 8;
    zhi |= zlo;

    magData.x = xhi;
    magData.y = yhi;
    magData.z = zhi;

}

void lsm_readGyro(UINT8 address) {
    //WICED_BT_TRACE("lsm_readGyro\r\n");
    // Read gyro
    UINT8 buffer[6];
    i2c_readBuffer(address, 0x80 | LSM9DS1_REGISTER_OUT_X_L_G, 6, buffer);

    UINT8 xlo = buffer[0];
    int16_t xhi = buffer[1];
    UINT8 ylo = buffer[2];
    int16_t yhi = buffer[3];
    UINT8 zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low UINT8 first)
    xhi <<= 8;
    xhi |= xlo;
    yhi <<= 8;
    yhi |= ylo;
    zhi <<= 8;
    zhi |= zlo;

    gyroData.x = xhi;
    gyroData.y = yhi;
    gyroData.z = zhi;
}

void lsm_readTemp(UINT8 address) {
    //WICED_BT_TRACE("lsm_readTemp\r\n");
    UINT8 buffer[2];
    i2c_readBuffer(address, 0x80 | LSM9DS1_REGISTER_TEMP_OUT_L, 2, buffer);
    UINT8 xlo = buffer[0];
    int16_t xhi = buffer[1];

    xhi <<= 8;
    xhi |= xlo;

    temperature = xhi;
}

void lsm_setupAccel(UINT8 address, lsm9ds1AccelRange_t range) {
    //WICED_BT_TRACE("lsm_setupAccel\r\n");
    UINT8 reg = i2c_read8(address, LSM9DS1_REGISTER_CTRL_REG6_XL);
    reg &= ~(0b00011000);
    reg |= range;
    i2c_write8(LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO, LSM9DS1_REGISTER_CTRL_REG6_XL, reg);

    switch (range) {
    case LSM9DS1_ACCELRANGE_2G:
        _accel_mg_lsb = LSM9DS1_ACCEL_MG_LSB_2G;
        break;
    case LSM9DS1_ACCELRANGE_4G:
        _accel_mg_lsb = LSM9DS1_ACCEL_MG_LSB_4G;
        break;
    case LSM9DS1_ACCELRANGE_8G:
        _accel_mg_lsb = LSM9DS1_ACCEL_MG_LSB_8G;
        break;
    case LSM9DS1_ACCELRANGE_16G:
        _accel_mg_lsb = LSM9DS1_ACCEL_MG_LSB_16G;
        break;
    }
}

void lsm_setupMag(UINT8 address, lsm9ds1MagGain_t gain) {
    //WICED_BT_TRACE("lsm_setupMag\r\n");
    UINT8 reg = i2c_read8(address, LSM9DS1_REGISTER_CTRL_REG2_M);
    reg &= ~(0b01100000);
    reg |= gain;
    i2c_write8(address, LSM9DS1_REGISTER_CTRL_REG2_M, reg);

    switch (gain) {
    case LSM9DS1_MAGGAIN_4GAUSS:
        _mag_mgauss_lsb = LSM9DS1_MAG_MGAUSS_4GAUSS;
        break;
    case LSM9DS1_MAGGAIN_8GAUSS:
        _mag_mgauss_lsb = LSM9DS1_MAG_MGAUSS_8GAUSS;
        break;
    case LSM9DS1_MAGGAIN_12GAUSS:
        _mag_mgauss_lsb = LSM9DS1_MAG_MGAUSS_12GAUSS;
        break;
    case LSM9DS1_MAGGAIN_16GAUSS:
        _mag_mgauss_lsb = LSM9DS1_MAG_MGAUSS_16GAUSS;
        break;
    }
}

void lsm_setupGyro(UINT8 address, lsm9ds1GyroScale_t scale) {
    //WICED_BT_TRACE("lsm_setupGyro\r\n");
    UINT8 reg = i2c_read8(address, LSM9DS1_REGISTER_CTRL_REG1_G);
    reg &= ~(0b00011000);
    reg |= scale;
    i2c_write8(address, LSM9DS1_REGISTER_CTRL_REG1_G, reg);

    switch (scale) {
    case LSM9DS1_GYROSCALE_245DPS:
        _gyro_dps_digit = LSM9DS1_GYRO_DPS_DIGIT_245DPS;
        break;
    case LSM9DS1_GYROSCALE_500DPS:
        _gyro_dps_digit = LSM9DS1_GYRO_DPS_DIGIT_500DPS;
        break;
    case LSM9DS1_GYROSCALE_2000DPS:
        _gyro_dps_digit = LSM9DS1_GYRO_DPS_DIGIT_2000DPS;
        break;
    }
}


