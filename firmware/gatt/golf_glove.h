/**
 * golf_glove.h
 *
 * Makes gatt_application_start(void) available outside of the golf_glove.c.
 */

#ifndef __GOLF_GLOVE_H
#define __GOLF_GLOVE_H

extern void gatt_application_start(void);
extern void send_next_frame_notification();

#endif
