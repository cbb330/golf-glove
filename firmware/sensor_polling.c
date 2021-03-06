#include "sensor_polling.h"

//need these for setup
#define LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO (0x6A) /*Motion sensor slave address*/
#define LSM9DS1_INTERNAL_ADDRESS_MAG       (0x1C)
#define LSM9DS1_ADDRESS_ACCELGYRO          (0x6B)
#define LSM9DS1_ADDRESS_MAG                (0x1E)

// init
void init_i2c() {
    WICED_BT_TRACE("init_i2c()\r\n");
    wiced_hal_i2c_init();
    wiced_hal_i2c_set_speed(I2CM_SPEED_400KHZ);
    //sleep(1);
    lsm_begin(LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO, LSM9DS1_INTERNAL_ADDRESS_MAG);
    lsm_begin(LSM9DS1_ADDRESS_ACCELGYRO, LSM9DS1_ADDRESS_MAG);
    ads_setup();
    ads_configureADC(ADS1015_1_ADDRESS, 3);
    ads_configureADC(ADS1015_2_ADDRESS, 3);
    ads_configureADC(ADS1015_3_ADDRESS, 3);
    ads_configureADC(ADS1015_4_ADDRESS, 3);
}

// Main Loop
void sensor_loop(uint32_t arg) {
    /*sensor_frame last;

     while (1) {
     sensor_frame current = get_sensor_frame();
     if (real_time) {
     sensor_frame swing[1] = {current};
     add_swing(swing);
     }
     if (detect_swing(current, last) == 1) frame_swing();
     // else sleep
     }*/
    while (1) {
        sensor_frame current = get_sensor_frame();
        frame_buffer_push_frame(&current);
        wiced_rtos_delay_milliseconds(8, KEEP_THREAD_ACTIVE);
    }
}

// Sensor polling logic
sensor_frame get_sensor_frame() {
    imu_frame imu1 = get_imu_frame_internal(); // Wrist
    imu_frame imu2 = get_imu_frame(); // Hand

    uint32_t timestamp = 0;
    UINT16 pres1 =          wiced_hal_adc_read_raw_sample(PRES1_PIN);
    UINT16 pres2 =          wiced_hal_adc_read_raw_sample(PRES2_PIN);
    UINT16 wrist1 =         ads_readADC_SingleEnded(ADS1015_1_ADDRESS);
    UINT16 wrist2 =         ads_readADC_SingleEnded(ADS1015_2_ADDRESS);
    UINT16 wrist3 =         ads_readADC_SingleEnded(ADS1015_3_ADDRESS);
    UINT16 wrist4 =         ads_readADC_SingleEnded(ADS1015_4_ADDRESS);
    uint8_t sync = 0;
    uint8_t avail = 0;

    sensor_frame rec = { timestamp, pres1, pres2, wrist1, wrist2, wrist3,
            wrist4, imu1, imu2, sync, avail };

    return rec;
}

void print_sensor_frame(sensor_frame rec) {
    /*
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
    */

   WICED_BT_TRACE("{ %x %x %x %x %x %x }\r\n", rec.pres1, rec.pres2, rec.wrist1, rec.wrist2, rec.wrist3, rec.wrist4);
   WICED_BT_TRACE("{ %x %x %x %x %x %x %x %x %x }\r\n", rec.imu1.accX, rec.imu1.accY, rec.imu1.accZ, rec.imu1.magX, rec.imu1.magY, rec.imu1.magZ, rec.imu1.gyroX, rec.imu1.gyroY, rec.imu1.gyroZ);
   WICED_BT_TRACE("{ %x %x %x %x %x %x %x %x %x }\r\n\r\n", rec.imu2.accX, rec.imu2.accY, rec.imu2.accZ, rec.imu2.magX, rec.imu2.magY, rec.imu2.magZ, rec.imu2.gyroX, rec.imu2.gyroY, rec.imu2.gyroZ);

}

imu_frame get_imu_frame() {
    lsm_read();

    UINT16 accX = accelData.x;
    UINT16 accY = accelData.y;
    UINT16 accZ = accelData.z;
    UINT16 magX = magData.x;
    UINT16 magY = magData.y;
    UINT16 magZ = magData.z;
    UINT16 gyroX = gyroData.x;
    UINT16 gyroY = gyroData.y;
    UINT16 gyroZ = gyroData.z;

    imu_frame rec = { accX, accY, accZ, magX, magY, magZ, gyroX, gyroY, gyroZ }; //null data

    return rec;
}

imu_frame get_imu_frame_internal() {

    lsm_read_internal();

    UINT16 accX = accelData.x;
    UINT16 accY = accelData.y;
    UINT16 accZ = accelData.z;
    UINT16 magX = magData.x;
    UINT16 magY = magData.y;
    UINT16 magZ = magData.z;
    UINT16 gyroX = gyroData.x;
    UINT16 gyroY = gyroData.y;
    UINT16 gyroZ = gyroData.z;

    imu_frame rec = { accX, accY, accZ, magX, magY, magZ, gyroX, gyroY, gyroZ }; //null data

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
    sensor_frame* swing = (sensor_frame*) malloc(
            sizeof(sensor_frame) * 3 * POLL_RATE); //max swing length 3 seconds
    while (1) {
        if (i == 3 * POLL_RATE)
            break;
        swing[i++] = get_sensor_frame();
        if (i > 0 && !detect_swing(swing[i], swing[i - 1]))
            break;
    }
}

// Data pushing/updating
void add_swing(sensor_frame* swing) {
    // TODO: Push swing data to coaching application maybe by updating a global array that the BT side of the program reads from?
}
