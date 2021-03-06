#
# This file has been automatically generated by the WICED 20719-B1 Designer.
#

APP_SRC = gatt/golf_glove.c
APP_SRC += gatt/golf_glove_db.c
APP_SRC += gatt/wiced_bt_cfg.c

APP_SRC += buffer/frame_buffer.c
APP_SRC += sensor_polling.c
APP_SRC += LSM9DS1.c
APP_SRC += ADS1015.c
APP_SRC += i2c_operations.c

APP_SRC += main.c

C_FLAGS += -DWICED_BT_TRACE_ENABLE

# If defined, HCI traces are sent over transport/WICED HCI interface
# C_FLAGS += -DHCI_TRACE_OVER_TRANSPORT

########################################################################
################ DO NOT MODIFY FILE BELOW THIS LINE ####################
########################################################################

