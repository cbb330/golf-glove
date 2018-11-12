#include "LSM9DS1.h"

int lsm_begin() {
    // soft reset & reboot accel/gyro
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG8, 0x05);
    // soft reset & reboot magnetometer
    lsm_write8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG2_M, 0x0C);
    sleep(1);

    uint8_t id = lsm_read8(XGTYPE, LSM9DS1_REGISTER_WHO_AM_I_XG);
    if (id != LSM9DS1_XG_ID)
        return 0;

    id = lsm_read8(MAGTYPE, LSM9DS1_REGISTER_WHO_AM_I_M);
    if (id != LSM9DS1_MAG_ID)
        return 0;

    // enable gyro continuous
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG1_G, 0xC0); // on XYZ

    // Enable the accelerometer continous
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG5_XL, 0x38); // enable X Y and Z axis
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG6_XL, 0xC0); // 1 KHz out data rate, BW set by ODR, 408Hz anti-aliasing

    // enable mag continuous
    //lsm_write8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG1_M, 0xFC); // high perf XY, 80 Hz ODR
    lsm_write8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG3_M, 0x00); // continuous mode
    //lsm_write8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG4_M, 0x0C); // high perf Z mode

    // Set default ranges for the various sensors
    lsm_setupAccel(LSM9DS1_ACCELRANGE_2G);
    lsm_setupMag(LSM9DS1_MAGGAIN_4GAUSS);
    lsm_setupGyro(LSM9DS1_GYROSCALE_245DPS);

    return 0;
}

void lsm_read() {
    lsm_readAccel();
    lsm_readMag();
    lsm_readGyro();
    lsm_readTemp();
}

void lsm_readAccel() {
    // Read the accelerometer
    byte buffer[6];
    lsm_readBuffer(XGTYPE, 0x80 | LSM9DS1_REGISTER_OUT_X_L_XL, 6, buffer);

    uint8_t xlo = buffer[0];
    int16_t xhi = buffer[1];
    uint8_t ylo = buffer[2];
    int16_t yhi = buffer[3];
    uint8_t zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low byte first)
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

void lsm_readMag() {
    // Read the magnetometer
    byte buffer[6];
    lsm_readBuffer(MAGTYPE, 0x80 | LSM9DS1_REGISTER_OUT_X_L_M, 6, buffer);

    uint8_t xlo = buffer[0];
    int16_t xhi = buffer[1];
    uint8_t ylo = buffer[2];
    int16_t yhi = buffer[3];
    uint8_t zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low byte first)
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

void lsm_readGyro() {
    // Read gyro
    byte buffer[6];
    lsm_readBuffer(XGTYPE, 0x80 | LSM9DS1_REGISTER_OUT_X_L_G, 6, buffer);

    uint8_t xlo = buffer[0];
    int16_t xhi = buffer[1];
    uint8_t ylo = buffer[2];
    int16_t yhi = buffer[3];
    uint8_t zlo = buffer[4];
    int16_t zhi = buffer[5];

    // Shift values to create properly formed integer (low byte first)
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

void lsm_readTemp() {
    byte buffer[2];
    lsm_readBuffer(XGTYPE, 0x80 | LSM9DS1_REGISTER_TEMP_OUT_L, 2, buffer);
    uint8_t xlo = buffer[0];
    int16_t xhi = buffer[1];

    xhi <<= 8;
    xhi |= xlo;

    temperature = xhi;
}

void lsm_setupAccel(lsm9ds1AccelRange_t range) {
    uint8_t reg = lsm_read8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG6_XL);
    reg &= ~(0b00011000);
    reg |= range;
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG6_XL, reg);

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

void lsm_setupMag(lsm9ds1MagGain_t gain) {
    uint8_t reg = lsm_read8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG2_M);
    reg &= ~(0b01100000);
    reg |= gain;
    lsm_write8(MAGTYPE, LSM9DS1_REGISTER_CTRL_REG2_M, reg);

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

void lsm_setupGyro(lsm9ds1GyroScale_t scale) {
    uint8_t reg = lsm_read8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG1_G);
    reg &= ~(0b00011000);
    reg |= scale;
    lsm_write8(XGTYPE, LSM9DS1_REGISTER_CTRL_REG1_G, reg);

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

void lsm_write8(int type, byte reg, byte value) {
    byte address, _cs;

    if (type == MAGTYPE) {
        address = LSM9DS1_ADDRESS_MAG;
        _cs = _csm;
    } else {
        address = LSM9DS1_ADDRESS_ACCELGYRO;
        _cs = _csxg;
    }

    wiced_hal_i2c_write(&reg, 1, address);
    wiced_hal_i2c_write(&value, 1, address);


}

byte lsm_read8(int type, byte reg) {
    uint8_t value;

    lsm_readBuffer(type, reg, 1, &value);

    return value;
}

byte lsm_readBuffer(int type, byte reg, byte len, uint8_t *buffer) {
    byte address, _cs;

    if (type == MAGTYPE) {
        address = LSM9DS1_ADDRESS_MAG;
        _cs = _csm;
    } else {
        address = LSM9DS1_ADDRESS_ACCELGYRO;
        _cs = _csxg;
    }


    wiced_hal_i2c_write(&reg, 1, address);

    if (wiced_hal_i2c_read(&len, 1, address) != len) {
        return 0;
    }

    wiced_hal_i2c_read(buffer, len, address);

    return len;
}

