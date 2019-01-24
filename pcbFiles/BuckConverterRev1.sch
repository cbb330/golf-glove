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
Sheet 2 6
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
L TPS63001DRCT U7
U 1 1 5C497246
P 5250 3050
F 0 "U7" H 5069 3852 50  0000 L BNN
F 1 "TPS63001DRCT" H 5088 1976 50  0000 L BNN
F 2 "SON50P300X300X100-11N" H 5250 3050 50  0001 L BNN
F 3 "VSON-10 Texas Instruments" H 5250 3050 50  0001 L BNN
F 4 "TPS63001DRCT" H 5250 3050 50  0001 L BNN "Field4"
F 5 "https://www.digikey.com/product-detail/en/texas-instruments/TPS63001DRCT/296-32517-1-ND/3505619?utm_source=snapeda&utm_medium=aggregator&utm_campaign=symbol" H 5250 3050 50  0001 L BNN "Field5"
F 6 "Texas Instruments" H 5250 3050 50  0001 L BNN "Field6"
F 7 "296-32517-1-ND" H 5250 3050 50  0001 L BNN "Field7"
F 8 "96% Buck-Boost Converter with 1.7A Current Switches, 3.3V fixed Output voltage in 3x3 QFN 10-VSON -40 to 85" H 5250 3050 50  0001 L BNN "Field8"
	1    5250 3050
	1    0    0    -1  
$EndComp
$Comp
L L L5
U 1 1 5C4972CB
P 4375 3300
F 0 "L5" V 4325 3300 50  0000 C CNN
F 1 "L" V 4450 3300 50  0000 C CNN
F 2 "" H 4375 3300 50  0001 C CNN
F 3 "" H 4375 3300 50  0001 C CNN
	1    4375 3300
	1    0    0    -1  
$EndComp
$Comp
L C C36
U 1 1 5C497370
P 4225 2850
F 0 "C36" H 4250 2950 50  0000 L CNN
F 1 "C" H 4250 2750 50  0000 L CNN
F 2 "" H 4263 2700 50  0001 C CNN
F 3 "" H 4225 2850 50  0001 C CNN
	1    4225 2850
	0    1    1    0   
$EndComp
$Comp
L C C35
U 1 1 5C4973CD
P 3875 2700
F 0 "C35" H 3900 2800 50  0000 L CNN
F 1 "C" H 3900 2600 50  0000 L CNN
F 2 "" H 3913 2550 50  0001 C CNN
F 3 "" H 3875 2700 50  0001 C CNN
	1    3875 2700
	1    0    0    -1  
$EndComp
$Comp
L C C37
U 1 1 5C497420
P 6100 2700
F 0 "C37" H 6125 2800 50  0000 L CNN
F 1 "C" H 6125 2600 50  0000 L CNN
F 2 "" H 6138 2550 50  0001 C CNN
F 3 "" H 6100 2700 50  0001 C CNN
	1    6100 2700
	1    0    0    -1  
$EndComp
$Comp
L C C38
U 1 1 5C49751F
P 6350 2700
F 0 "C38" H 6375 2800 50  0000 L CNN
F 1 "C" H 6375 2600 50  0000 L CNN
F 2 "" H 6388 2550 50  0001 C CNN
F 3 "" H 6350 2700 50  0001 C CNN
	1    6350 2700
	1    0    0    -1  
$EndComp
$Comp
L R R15
U 1 1 5C497674
P 4450 2700
F 0 "R15" V 4530 2700 50  0000 C CNN
F 1 "R" V 4450 2700 50  0000 C CNN
F 2 "" V 4380 2700 50  0001 C CNN
F 3 "" H 4450 2700 50  0001 C CNN
	1    4450 2700
	1    0    0    -1  
$EndComp
Wire Wire Line
	4375 2850 4550 2850
Connection ~ 4450 2850
Wire Wire Line
	3800 2850 4075 2850
Wire Wire Line
	4450 2850 4450 3050
Wire Wire Line
	4450 3050 4550 3050
Wire Wire Line
	4550 3250 4550 3150
Wire Wire Line
	4550 3150 4375 3150
Wire Wire Line
	4375 3450 4550 3450
Wire Wire Line
	4550 3450 4550 3350
Wire Wire Line
	5950 2550 6525 2550
Connection ~ 6100 2550
Wire Wire Line
	6100 2850 6525 2850
Text HLabel 6525 2850 2    60   Input ~ 0
GND
Text HLabel 3800 2850 0    60   Input ~ 0
GND
Connection ~ 6350 2850
Connection ~ 3875 2850
Wire Wire Line
	4550 2850 4550 2650
Wire Wire Line
	3800 2550 4550 2550
Connection ~ 4450 2550
Text HLabel 3800 2550 0    60   Input ~ 0
BuckIn
Connection ~ 3875 2550
Text HLabel 4475 3550 0    60   Input ~ 0
GND
Text HLabel 4475 3650 0    60   Input ~ 0
GND
Text HLabel 4475 3750 0    60   Input ~ 0
GND
Wire Wire Line
	4475 3550 4550 3550
Wire Wire Line
	4550 3650 4475 3650
Wire Wire Line
	4475 3750 4550 3750
Wire Wire Line
	4550 2950 5950 2950
Wire Wire Line
	5950 2950 5950 2550
Text HLabel 6525 2550 2    60   Input ~ 0
BuckOut
Connection ~ 6350 2550
$EndSCHEMATC
