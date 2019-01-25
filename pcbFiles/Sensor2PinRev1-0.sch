EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:switches
LIBS:relays
LIBS:motors
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:ADS1115IDGST
LIBS:CYW20719B1KUMLG
LIBS:LSM9DS1TR
LIBS:TPS63001DRCT
LIBS:MCP73831T-2ACI_OT
LIBS:A-1JB
LIBS:XC6119N16A7R-G
LIBS:GolfGloveMainBoardV1.0.0-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 7 12
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L R R?
U 1 1 5C4B94B6
P 5150 3175
F 0 "R?" V 5230 3175 50  0000 C CNN
F 1 "R" V 5150 3175 50  0000 C CNN
F 2 "" V 5080 3175 50  0001 C CNN
F 3 "" H 5150 3175 50  0001 C CNN
	1    5150 3175
	0    1    1    0   
$EndComp
$Comp
L Conn_01x02 J?
U 1 1 5C4B9547
P 4700 3175
F 0 "J?" H 4700 3275 50  0000 C CNN
F 1 "Conn_01x02" H 4700 2975 50  0000 C CNN
F 2 "" H 4700 3175 50  0001 C CNN
F 3 "" H 4700 3175 50  0001 C CNN
	1    4700 3175
	-1   0    0    1   
$EndComp
Text GLabel 5000 3075 2    60   Input ~ 0
Vin
Text GLabel 5400 3175 2    60   Input ~ 0
GND
Text GLabel 5000 3350 2    60   Input ~ 0
SensorIn
Wire Wire Line
	4900 3075 5000 3075
Wire Wire Line
	4900 3175 5000 3175
Wire Wire Line
	4950 3175 4950 3350
Wire Wire Line
	4950 3350 5000 3350
Connection ~ 4950 3175
Wire Wire Line
	5300 3175 5400 3175
Text HLabel 4950 2275 0    60   Input ~ 0
VIN
Text HLabel 4950 2400 0    60   Input ~ 0
GND
Text HLabel 4950 2525 0    60   Input ~ 0
SIGNAL
Text GLabel 5025 2275 2    60   Input ~ 0
Vin
Text GLabel 5025 2400 2    60   Input ~ 0
GND
Text GLabel 5025 2525 2    60   Input ~ 0
SensorIn
Wire Wire Line
	4950 2275 5025 2275
Wire Wire Line
	5025 2400 4950 2400
Wire Wire Line
	4950 2525 5025 2525
$EndSCHEMATC
