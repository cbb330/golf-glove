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
LIBS:2450AT42B100E
LIBS:GolfGloveMainBoardV1.0.0-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 12 12
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
L R R7
U 1 1 5C4B94B6
P 5150 3175
AR Path="/5C4B9358/5C4B94B6" Ref="R7"  Part="1" 
AR Path="/5C4BB400/5C4B94B6" Ref="R8"  Part="1" 
AR Path="/5C4BB725/5C4B94B6" Ref="R9"  Part="1" 
AR Path="/5C4BB72A/5C4B94B6" Ref="R10"  Part="1" 
AR Path="/5C4BBBA5/5C4B94B6" Ref="R12"  Part="1" 
AR Path="/5C4BBBAA/5C4B94B6" Ref="R13"  Part="1" 
F 0 "R13" V 5230 3175 50  0000 C CNN
F 1 "R" V 5150 3175 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 5080 3175 50  0001 C CNN
F 3 "" H 5150 3175 50  0001 C CNN
	1    5150 3175
	0    1    1    0   
$EndComp
$Comp
L Conn_01x02 J7
U 1 1 5C4B9547
P 4700 3175
AR Path="/5C4B9358/5C4B9547" Ref="J7"  Part="1" 
AR Path="/5C4BB400/5C4B9547" Ref="J8"  Part="1" 
AR Path="/5C4BB725/5C4B9547" Ref="J9"  Part="1" 
AR Path="/5C4BB72A/5C4B9547" Ref="J14"  Part="1" 
AR Path="/5C4BBBA5/5C4B9547" Ref="J15"  Part="1" 
AR Path="/5C4BBBAA/5C4B9547" Ref="J16"  Part="1" 
F 0 "J16" H 4700 3275 50  0000 C CNN
F 1 "Conn_01x02" H 4700 2975 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 4700 3175 50  0001 C CNN
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
