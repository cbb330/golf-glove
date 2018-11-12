#include "sensor_polling.h"

// init
void init_i2c() {
    wiced_hal_i2c_init();

}

// Main Loop
void sensor_loop() {
    sensor_frame last;

    while (1) {
        sensor_frame current = get_sensor_frame();
        if (real_time) {
            sensor_frame swing[1] = {current};
            add_swing(swing);
        }
        if (detect_swing(current, last) == 1) frame_swing();
        // else sleep
    }
}

// Sensor polling logic
sensor_frame get_sensor_frame() {
    imu_frame imu1 = get_imu_frame(WRIST_IMU_ADDR); // Wrist
    imu_frame imu2 = get_imu_frame(HAND_IMU_ADDR); // Hand

    uint32_t timestamp = 0x69DE;
    uint16_t pres1 = 0xAD;
    uint16_t pres2 = 0xBE;
    uint16_t wrist1 = 0xEF;
    uint16_t wrist2 = 0xCA;
    uint16_t wrist3 = 0xFE;
    uint16_t wrist4 = 0xBA;
    uint8_t sync = 0xBE;
    uint8_t avail = 0x11;

    sensor_frame rec = { timestamp, pres1, pres2, wrist1, wrist2, wrist3, wrist4, imu1, imu2, sync, avail };

    return rec;
}

imu_frame get_imu_frame(uint16_t addr) {
    // TODO: Poll I2C @ addr for the required values

    uint16_t accX = 0xFE;
    uint16_t accY = 0xED;
    uint16_t accZ = 0xDA;
    uint16_t magX = 0xDE;
    uint16_t magY = 0xBA;
    uint16_t magZ = 0xDD;
    uint16_t gyroX = 0xBE;
    uint16_t gyroY = 0xAD;
    uint16_t gyroZ = 0xFA;

    imu_frame rec = {accX, accY, accZ, magX, magY, magZ, gyroX, gyroY, gyroZ}; //null data

    return rec;
}

// Swing Detection/frameing
int detect_swing(sensor_frame current, sensor_frame last) {
    if (current.pres1 > last.pres2) {
        return 1;
    }
    return 0;
}

void frame_swing() {

    int i = 0;
    sensor_frame* swing = (sensor_frame*) malloc(sizeof(sensor_frame) * 3 * POLL_RATE); //max swing length 3 seconds
    while(1) {
        if (i == 3*POLL_RATE) break;
        swing[i++] = get_sensor_frame();
        if (i>0 && !detect_swing(swing[i], swing[i-1])) break;
    }
}

// Data pushing/updating
void add_swing(sensor_frame* swing) {
    // TODO: Push swing data to coaching application maybe by updating a global array that the BT side of the program reads from?
}
