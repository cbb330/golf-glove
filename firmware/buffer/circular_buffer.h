#ifndef __CIRCULAR_BUFFER_H
#define __CIRCULAR_BUFFER_H

// Usage

// When using the library, the client is responsible for creating the underlying
// data buffer to circular_buf_init, and a cbuf_handle_t is returned:
//      buffer_t * buffer  = malloc(EXAMPLE_BUFFER_SIZE * sizeof(uint8_t));
//      cbuf_handle_t cbuf = circular_buf_init(buffer, EXAMPLE_BUFFER_SIZE);

// This handle is used to interact with all remaining library functions:
//      bool full = circular_buf_full(cbuf);
//      bool empty = circular_buf_empty(cbuf);
//      printf("Current buffer size: %zu\n", circular_buf_size(cbuf);

// Don't forget to free both the underlying data buffer and the container when you are done:
//      free(buffer);
//      circular_buf_free(cbuf);

#include "wiced.h"
#include "wiced_bt_trace.h"
#include "wiced_bt_types.h"
#include "wiced_memory.h"
#include "frame.h"

#define BUFFER_SIZE 1000
#define PRE_BUFFER_SIZE 500

typedef sensor_frame buffer_t;

// Opaque circular buffer structure
typedef struct circular_buf_t circular_buf_t;

// Handle type, the way users interact with the API
typedef circular_buf_t* cbuf_handle_t;

// Returns a circular buffer handle
cbuf_handle_t circular_buf_init();

// Reset the circular buffer to empty, head == tail
void circular_buf_reset(cbuf_handle_t cbuf);

// Put version 1 continues to add data if the buffer is full
// Old data is overwritten
void circular_buf_put(cbuf_handle_t cbuf, buffer_t* data);

// Put Version 2 rejects new data if the buffer is full
// Returns 0 on success, -1 if buffer is full
INT8 circular_buf_put2(cbuf_handle_t cbuf, buffer_t data);

// Retrieve a value from the buffer
// Returns 0 on success, -1 if the buffer is empty
INT8 circular_buf_get(cbuf_handle_t cbuf, buffer_t * data);

// Returns true if the buffer is empty
BOOL32 circular_buf_empty(cbuf_handle_t cbuf);

// Returns true if the buffer is full
BOOL32 circular_buf_full(cbuf_handle_t cbuf);

// Returns the maximum capacity of the buffer
UINT32 circular_buf_capacity(cbuf_handle_t cbuf);

// Returns the current number of elements in the buffer
UINT32 circular_buf_size(cbuf_handle_t cbuf);

#endif
