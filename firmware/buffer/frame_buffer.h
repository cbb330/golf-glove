/*
 * frame_buffer.h
 *
 * Declarations for constants and variables used in managing the global sensor data frame buffer.
 */

#ifndef __FRAME_BUFFER_H
#define __FRAME_BUFFER_H

#include "wiced.h"
#include "wiced_bt_types.h"
#include "wiced_result.h"

#include "sensor/sensor_frame.h"

/**
 * Allocates and initializes the frame buffer.
 *
 * @return    WICED_SUCCESS : on success.
 * @return    WICED_ERROR   : if an error or timeout occurred
 */
wiced_result_t frame_buffer_init(void);

/**
 * Returns 1 if the frame buffer has data available
 *
 * @return  0 : no data available
 * @return  1 : data available
 */
wiced_bool_t frame_buffer_is_data_available(void);

/**
 * Returns 1 if the frame buffer is full.
 *
 * @return 0 : not full
 * @return 1 : full
 */
wiced_bool_t frame_buffer_is_full(void);

/**
 * Pushes a sensor data frame into the frame buffer queue.
 *
 * @param frame : sensor_frame struct to push into the queue
 *
 * @return    WICED_SUCCESS : on success.
 * @return    WICED_ERROR   : if an error or timeout occurred
 */
wiced_result_t frame_buffer_push_frame(sensor_frame* frame);

/**
 * Pops a sensor data frame from the frame buffer queue.
 *
 * @param frame : blank sensor_frame struct to write the data into
 *
 * @return    WICED_SUCCESS : on success.
 * @return    WICED_ERROR   : if an error or timeout occurred
 */
wiced_result_t frame_buffer_pop_frame(sensor_frame* frame);

/**
 * Clears all data from the frame buffer.
 *
 * @return    WICED_SUCCESS : on success.
 * @return    WICED_ERROR   : if an error or timeout occurred
 */
wiced_result_t frame_buffer_clear(void);

#endif
