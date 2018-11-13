#include "sensor_polling.h"

// init
void init_i2c() {
    WICED_BT_TRACE("init_i2c()\r\n");
    wiced_hal_i2c_init();
    wiced_hal_i2c_set_speed(I2CM_SPEED_400KHZ);
    //sleep(1);
    lsm_begin();
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


    uint32_t timestamp = 0;
    uint16_t pres1 = 0;
    uint16_t pres1_v = 0;
    pres1 = wiced_hal_adc_read_raw_sample( PRES1_PIN );
    pres1_v = wiced_hal_adc_read_voltage( PRES1_PIN );
    uint16_t pres2 = 0;
    uint16_t wrist1 = 0;
    uint16_t wrist2 = 0;
    uint16_t wrist3 = 0;
    uint16_t wrist3_v = 0;
    wrist3 = wiced_hal_adc_read_raw_sample( WRIST3_PIN );
    wrist3_v = wiced_hal_adc_read_voltage( WRIST3_PIN );
    uint16_t wrist4 = 0;
    wrist4 = wiced_hal_adc_read_raw_sample( WRIST4_PIN );
    pres1_v = wiced_hal_adc_read_voltage( WRIST4_PIN );
    uint8_t sync = 0;
    uint8_t avail = 0;

    sensor_frame rec = { timestamp, pres1, pres2, wrist1, wrist2, wrist3, wrist4, imu1, imu2, sync, avail };

    return rec;
}

void print_sensor_frame(sensor_frame rec) {
  WICED_BT_TRACE("timestamp %u\r\n", rec.timestamp);
  WICED_BT_TRACE("pres1     %u\r\n", rec.pres1);
  WICED_BT_TRACE("pres2     %u\r\n", rec.pres2);
  WICED_BT_TRACE("wrist1    %u\r\n", rec.wrist1);
  WICED_BT_TRACE("wrist2    %u\r\n", rec.wrist2);
  WICED_BT_TRACE("wrist3    %u\r\n", rec.wrist3);
  WICED_BT_TRACE("wrist4    %u\r\n", rec.wrist3);
  WICED_BT_TRACE("imu1        \r\n");
  WICED_BT_TRACE("    accX  %u\r\n", rec.imu1.accX);
  WICED_BT_TRACE("    accY  %u\r\n", rec.imu1.accY);
  WICED_BT_TRACE("    accZ  %u\r\n", rec.imu1.accZ);
  WICED_BT_TRACE("    magX  %u\r\n", rec.imu1.magX);
  WICED_BT_TRACE("    magY  %u\r\n", rec.imu1.magY);
  WICED_BT_TRACE("    magZ  %u\r\n", rec.imu1.magZ);
  WICED_BT_TRACE("    gyroX %u\r\n", rec.imu1.gyroX);
  WICED_BT_TRACE("    gyroY %u\r\n", rec.imu1.gyroY);
  WICED_BT_TRACE("    gyroZ %u\r\n", rec.imu1.gyroZ);
  WICED_BT_TRACE("imu2        \r\n");
  WICED_BT_TRACE("    accX  %u\r\n", rec.imu2.accX);
  WICED_BT_TRACE("    accY  %u\r\n", rec.imu2.accY);
  WICED_BT_TRACE("    accZ  %u\r\n", rec.imu2.accZ);
  WICED_BT_TRACE("    magX  %u\r\n", rec.imu2.magX);
  WICED_BT_TRACE("    magY  %u\r\n", rec.imu2.magY);
  WICED_BT_TRACE("    magZ  %u\r\n", rec.imu2.magZ);
  WICED_BT_TRACE("    gyroX %u\r\n", rec.imu2.gyroX);
  WICED_BT_TRACE("    gyroY %u\r\n", rec.imu2.gyroY);
  WICED_BT_TRACE("    gyroZ %u\r\n", rec.imu2.gyroZ);
  WICED_BT_TRACE("sync      %u\r\n", rec.sync);
  WICED_BT_TRACE("avail     %u\r\n", rec.avail);
}

imu_frame get_imu_frame(uint16_t addr) {

    lsm_read();

    uint16_t accX = accelData.x;
    uint16_t accY = accelData.y;
    uint16_t accZ = accelData.z;
    uint16_t magX = magData.x;
    uint16_t magY = magData.y;
    uint16_t magZ = magData.z;
    uint16_t gyroX = gyroData.x;
    uint16_t gyroY = gyroData.y;
    uint16_t gyroZ = gyroData.z;

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
