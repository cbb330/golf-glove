#include "circular_buffer.h"

struct circular_buf_t {
    buffer_t buffer[BUFFER_SIZE];
    UINT32 head;
    UINT32 tail;
    UINT32 capacity;
    BOOL32 full;
};

circular_buf_t circular_buffer = {0};
cbuf_handle_t cbuf = &circular_buffer;

cbuf_handle_t circular_buf_init() {
    // cbuf_handle_t cbuf = {0};

    cbuf->capacity = BUFFER_SIZE;
    circular_buf_reset(cbuf);

    return cbuf;
}

void circular_buf_reset(cbuf_handle_t cbuf) {
    cbuf->head = 0;
    cbuf->tail = 0;
    cbuf->full = FALSE;
}

BOOL32 circular_buf_full(cbuf_handle_t cbuf) {
    return cbuf->full;
}

BOOL32 circular_buf_empty(cbuf_handle_t cbuf) {
    return (!cbuf->full && (cbuf->head == cbuf->tail));
}

UINT32 circular_buf_capacity(cbuf_handle_t cbuf) {
    return cbuf->capacity;
}

UINT32 circular_buf_size(cbuf_handle_t cbuf) {
    UINT32 size = cbuf->capacity;

    if (!cbuf->full) {
        if (cbuf->head >= cbuf->tail) {
            size = (cbuf->head - cbuf->tail);
        }
        else {
            size = (cbuf->capacity + cbuf->head - cbuf->tail);
        }
    }

    return size;
}

static void advance_pointer(cbuf_handle_t cbuf) {
    if (cbuf->full) {
        cbuf->tail = (cbuf->tail + 1) % cbuf->capacity;
    }

    cbuf->head = (cbuf->head + 1) % cbuf->capacity;
    cbuf->full = (cbuf->head == cbuf->tail);
}

static void retreat_pointer(cbuf_handle_t cbuf) {
    cbuf->full = FALSE;
    cbuf->tail = (cbuf->tail + 1) % cbuf->capacity;
}

void circular_buf_preput(cbuf_handle_t cbuf, buffer_t* data) {
    cbuf->buffer[cbuf->head] = *data;
    // memcpy(&cbuf->buffer[cbuf->head], data, sizeof(buffer_t));

    retreat_pointer(cbuf);
    advance_pointer(cbuf);
}

void circular_buf_put(cbuf_handle_t cbuf, buffer_t* data) {
    cbuf->buffer[cbuf->head] = *data;
    // memcpy(&cbuf->buffer[cbuf->head], data, sizeof(buffer_t));

    advance_pointer(cbuf);
}

INT8 circular_buf_put2(cbuf_handle_t cbuf, buffer_t data) {
    INT8 r = -1;

    if (!circular_buf_full(cbuf)) {
        cbuf->buffer[cbuf->head] = data;
        advance_pointer(cbuf);
        r = 0;
    }

    return r;
}

INT8 circular_buf_get(cbuf_handle_t cbuf, buffer_t* data) {
    INT8 r = -1;

    if (!circular_buf_empty(cbuf)) {
        *data = cbuf->buffer[cbuf->tail];
        retreat_pointer(cbuf);

        r = 0;
    }

    return r;
}

