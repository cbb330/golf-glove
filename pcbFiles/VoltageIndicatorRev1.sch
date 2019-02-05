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
Sheet 4 12
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
L XC6119N16A7R-G U2
U 1 1 5C49E973
P 4700 3500
F 0 "U2" H 5500 4200 60  0000 C CNN
F 1 "XC6119N16A7R-G" H 5075 4075 60  0000 C CNN
F 2 "DFN-4-------------------------:DFN-4" H 5500 4040 60  0001 C CNN
F 3 "" H 4700 3500 60  0000 C CNN
	1    4700 3500
	1    0    0    -1  
$EndComp
$Comp
L SW_Push SW2
U 1 1 5C49E9D3
P 5175 2550
F 0 "SW2" H 5225 2650 50  0000 L CNN
F 1 "SW_Push" H 5175 2490 50  0000 C CNN
F 2 "Buttons_Switches_SMD:Panasonic_EVQPUL_EVQPUC" H 5175 2750 50  0001 C CNN
F 3 "" H 5175 2750 50  0001 C CNN
	1    5175 2550
	1    0    0    -1  
$EndComp
$Comp
L R R3
U 1 1 5C49EA34
P 5500 2275
F 0 "R3" H 5600 2275 50  0000 C CNN
F 1 "R" H 5500 2275 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 5430 2275 50  0001 C CNN
F 3 "" H 5500 2275 50  0001 C CNN
	1    5500 2275
	1    0    0    -1  
$EndComp
$Comp
L C C4
U 1 1 5C49EB39
P 5775 2550
F 0 "C4" V 5825 2625 50  0000 L CNN
F 1 "C" V 5825 2425 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 5813 2400 50  0001 C CNN
F 3 "" H 5775 2550 50  0001 C CNN
	1    5775 2550
	0    1    1    0   
$EndComp
$Comp
L C C3
U 1 1 5C49EC00
P 4625 3725
F 0 "C3" H 4650 3825 50  0000 L CNN
F 1 "C" H 4650 3625 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 4663 3575 50  0001 C CNN
F 3 "" H 4625 3725 50  0001 C CNN
	1    4625 3725
	1    0    0    -1  
$EndComp
Text HLabel 3225 1750 0    60   Input ~ 0
GND
Text HLabel 3225 1625 0    60   Input ~ 0
3.3vIn
Text HLabel 3225 1875 0    60   Input ~ 0
RST_N
Text GLabel 3325 1875 2    60   Input ~ 0
RST_N
Text GLabel 3325 1750 2    60   Input ~ 0
GND
Text GLabel 3325 1625 2    60   Input ~ 0
3.3v
Wire Wire Line
	3225 1625 3325 1625
Wire Wire Line
	3325 1750 3225 1750
Wire Wire Line
	3225 1875 3325 1875
Text GLabel 5500 2050 1    60   Input ~ 0
3.3v
Text GLabel 4625 3950 3    60   Input ~ 0
GND
Text GLabel 4900 2550 0    60   Input ~ 0
GND
Text GLabel 6375 3500 2    60   Input ~ 0
RST_N
Wire Wire Line
	6375 3500 6300 3500
Text GLabel 5500 4350 3    60   Input ~ 0
GND
Wire Wire Line
	5500 4300 5500 4350
Wire Wire Line
	4625 3875 4625 3950
Wire Wire Line
	4700 3500 4625 3500
Wire Wire Line
	4625 3500 4625 3575
Text GLabel 6000 2550 2    60   Input ~ 0
GND
Wire Wire Line
	4900 2550 4975 2550
Wire Wire Line
	5375 2550 5625 2550
Wire Wire Line
	5500 2425 5500 2700
Connection ~ 5500 2550
Wire Wire Line
	5500 2125 5500 2050
Wire Wire Line
	5925 2550 6000 2550
$Comp
L Screw_Terminal_01x02 J6
U 1 1 5C49F0AE
P 5125 2150
F 0 "J6" V 5125 2250 50  0000 C CNN
F 1 "Screw_Terminal_01x02" V 5250 2450 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 5125 2150 50  0001 C CNN
F 3 "" H 5125 2150 50  0001 C CNN
	1    5125 2150
	0    -1   -1   0   
$EndComp
Wire Wire Line
	5125 2350 4975 2350
Wire Wire Line
	4975 2350 4975 2550
Wire Wire Line
	5225 2350 5375 2350
Wire Wire Line
	5375 2350 5375 2550
$EndSCHEMATC
