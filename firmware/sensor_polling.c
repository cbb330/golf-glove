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
    wiced_hal_adc_set_input_range(ADC_RANGE_0_3P6V);
    //sleep(1);
    lsm_begin(LSM9DS1_INTERNAL_ADDRESS_ACCELGYRO, LSM9DS1_INTERNAL_ADDRESS_MAG);
    lsm_begin(LSM9DS1_ADDRESS_ACCELGYRO, LSM9DS1_ADDRESS_MAG);
    //ads_setup();
    //ads_configureADC(ADS1015_1_ADDRESS, 3);
    //ads_configureADC(ADS1015_2_ADDRESS, 3);
    //ads_configureADC(ADS1015_3_ADDRESS, 3);
    //ads_configureADC(ADS1015_4_ADDRESS, 3);
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
    curr_state = STATE_INIT;
    // swinging = FALSE;

    // frame_buffer = malloc(BUFFER_SIZE * sizeof(sensor_frame));
    // cbuffer = circular_buf_init(frame_buffer, BUFFER_SIZE);
    cbuffer = circular_buf_init();

    INT16 threshold = -50 * 1000 / (LSM9DS1_ACCEL_MG_LSB_8G * SENSORS_GRAVITY_EARTH);
    WICED_BT_TRACE("threshold: %4d\r\n", threshold);
    // WICED_BT_TRACE("swinging: %2x\r\n", swinging);

    while (1) {
        if (connected) {
            // WICED_BT_TRACE("sensor_loop: connected: %02x\r\n", connected);
            sensor_frame current = get_sensor_frame();
            // accel1z = current.imu1.accZ;
            // frame_buffer_push_frame(&current);
            // WICED_BT_TRACE("accel1Z: %6d\r\n", (INT16) current.imu1.accZ);
            // WICED_BT_TRACE("cbuffer size: %4d\r\n", circular_buf_size(cbuffer));

            switch (curr_state) {
            case STATE_INIT:
                circular_buf_put(cbuffer, &current);
                if (circular_buf_size(cbuffer) > PRE_BUFFER_SIZE) {
                    curr_state = STATE_PRERECORDING;
                    WICED_BT_TRACE("new state: %02d STATE_PRERECORDING\r\n", curr_state);
                }
                break;
            case STATE_PRERECORDING:
                circular_buf_preput(cbuffer, &current);
                if ((INT16) current.imu1.accZ <= threshold) {
                    curr_state = STATE_RECORDING;
                    WICED_BT_TRACE("new state: %02d STATE_RECORDING\r\n", curr_state);
                }
                break;
            case STATE_RECORDING:
                circular_buf_put(cbuffer, &current);
                if (circular_buf_full(cbuffer)) {
                    curr_state = STATE_SENDING;
                    WICED_BT_TRACE("new state: %02d STATE_SENDING\r\n", curr_state);
                }
                break;
            case STATE_SENDING:
                if (circular_buf_empty(cbuffer)) {
                    curr_state = STATE_INIT;
                    WICED_BT_TRACE("new state: %02d STATE_INIT\r\n", curr_state);
                }
            default:
                break;
            }

            // if (((INT16) current.imu1.accZ) <= (INT16) threshold || swinging) {
            //     if (circular_buf_full(cbuffer)) {
            //         swinging = FALSE;
            //         WICED_BT_TRACE("full cbuffer\r\n");
            //     }
            //     else if (swinging) {

            //     }
            //     else if (circular_buf_empty(cbuffer)) {
            //         if (!swinging) swinging = TRUE;
            //     }
            //     if (circular_buf_empty(cbuffer)) {
            //         if (!swinging) swinging = TRUE;
            //         circular_buf_put(cbuffer, current);
            //     }
            //     else {
            //         // process buffer by sending notifications...
            //     }
            // }
            // if (((INT16) current.imu1.accZ) <= (INT16) threshold) {
            //     if (!swinging && circular_buf_empty(cbuffer)) swinging = TRUE;
            // }
            // if (swinging && circular_buf_empty(cbuffer)) {
            //     circular_buf_put(cbuffer, current);
            // }
            // else if (swinging) {

            // }
        }
        wiced_rtos_delay_milliseconds(POLL_PERIOD - 3, ALLOW_THREAD_TO_SLEEP);
    }
}

// Sensor polling logic
sensor_frame get_sensor_frame() {
    imu_frame imu1 = get_imu_frame_internal(); // Wrist
    imu_frame imu2 = get_imu_frame(); // Hand

    // get the raw real time clock counter and then convert to milliseconds
    // the magic number 15 comes from the 32.768 kHz crystal:
    // 2^15 = 32768 so shift to remove that multiplier from the counter
    tRTC_REAL_TIME_CLOCK rtc;
    rtc_getRTCRawClock(&rtc);
    UINT32 t = rtc.rtc64 * 1000 >> 15;

    // read ADCs for pressure and flex sensor values
    INT16 pres1 = wiced_hal_adc_read_raw_sample(PRES1_PIN);
    INT16 pres2 = wiced_hal_adc_read_raw_sample(PRES2_PIN);
    INT16 wrist1 = wiced_hal_adc_read_raw_sample(WRIST1_PIN);
    INT16 wrist2 = wiced_hal_adc_read_raw_sample(WRIST2_PIN);
    INT16 wrist3 = wiced_hal_adc_read_raw_sample(WRIST3_PIN);
    INT16 wrist4 = wiced_hal_adc_read_raw_sample(WRIST4_PIN);

    // TODO: replace these dummy values once swing detection is implemented
    uint8_t sync = 0;
    uint8_t avail = 0;

    sensor_frame rec = { t, pres1, pres2, wrist1, wrist2, wrist3, wrist4, imu1, imu2, sync, avail };

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
    WICED_BT_TRACE("    gyroX %u\r\n", rec.imu1.gyroX);
    WICED_BT_TRACE("    gyroY %u\r\n", rec.imu1.gyroY);
    WICED_BT_TRACE("    gyroZ %u\r\n", rec.imu1.gyroZ);
    WICED_BT_TRACE("imu2        \r\n");
    WICED_BT_TRACE("    accX  %u\r\n", rec.imu2.accX);
    WICED_BT_TRACE("    accY  %u\r\n", rec.imu2.accY);
    WICED_BT_TRACE("    accZ  %u\r\n", rec.imu2.accZ);
    WICED_BT_TRACE("    gyroX %u\r\n", rec.imu2.gyroX);
    WICED_BT_TRACE("    gyroY %u\r\n", rec.imu2.gyroY);
    WICED_BT_TRACE("    gyroZ %u\r\n", rec.imu2.gyroZ);
    WICED_BT_TRACE("sync      %u\r\n", rec.sync);
    WICED_BT_TRACE("avail     %u\r\n", rec.avail);
    */

   WICED_BT_TRACE("{ %x %x %x %x %x %x }\r\n", rec.pres1, rec.pres2, rec.wrist1, rec.wrist2, rec.wrist3, rec.wrist4);
   WICED_BT_TRACE("{ %x %x %x %x %x %x }\r\n", rec.imu1.accX, rec.imu1.accY, rec.imu1.accZ, rec.imu1.gyroX, rec.imu1.gyroY, rec.imu1.gyroZ);
   WICED_BT_TRACE("{ %x %x %x %x %x %x }\r\n\r\n", rec.imu2.accX, rec.imu2.accY, rec.imu2.accZ, rec.imu2.gyroX, rec.imu2.gyroY, rec.imu2.gyroZ);

}

imu_frame get_imu_frame() {
    lsm_read();

    UINT16 accX = accelData.x;
    UINT16 accY = accelData.y;
    UINT16 accZ = accelData.z;
    UINT16 gyroX = gyroData.x;
    UINT16 gyroY = gyroData.y;
    UINT16 gyroZ = gyroData.z;

    imu_frame rec = { accX, accY, accZ, gyroX, gyroY, gyroZ }; //null data

    return rec;
}

imu_frame get_imu_frame_internal() {

    lsm_read_internal();

    UINT16 accX = accelData.x;
    UINT16 accY = accelData.y;
    UINT16 accZ = accelData.z;
    UINT16 gyroX = gyroData.x;
    UINT16 gyroY = gyroData.y;
    UINT16 gyroZ = gyroData.z;

    imu_frame rec = { accX, accY, accZ, gyroX, gyroY, gyroZ }; //null data

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

// Data connection readiness
void set_readiness(BOOL8 state) {
    connected = state;
    WICED_BT_TRACE("set_readinesss: connected: %02x\r\n", connected);
}

BOOL8 get_readiness() {
    return connected;
}

UINT16 get_accel1z() {
    return accel1z;
}

void set_accel1z(UINT16* value) {
    memcpy(&accel1z, value, sizeof(UINT16));
}

state_t get_state() {
    return curr_state;
}
