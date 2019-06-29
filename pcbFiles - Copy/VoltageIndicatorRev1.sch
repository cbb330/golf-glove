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
LIBS:2450AT42B100E
LIBS:CD4011BM96
LIBS:MMDT3904V-7
LIBS:MMPQ3904
LIBS:S2B-PH-K-S_LF__SN_
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
L SW_Push SW2
U 1 1 5C49E9D3
P 5175 2550
F 0 "SW2" H 5225 2650 50  0000 L CNN
F 1 "SW_Push" H 5175 2490 50  0000 C CNN
F 2 "Buttons_Switches_THT:SW_PUSH_6mm" H 5175 2750 50  0001 C CNN
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
Text HLabel 3225 1750 0    60   Input ~ 0
GND
Text HLabel 3225 1625 0    60   Input ~ 0
3.3vIn
Text HLabel 3225 1875 0    60   Input ~ 0
RST_N
Wire Wire Line
	3225 1625 3325 1625
Wire Wire Line
	3325 1750 3225 1750
Wire Wire Line
	3225 1875 3325 1875
Wire Wire Line
	5500 3500 6375 3500
Wire Wire Line
	4900 2550 4975 2550
Wire Wire Line
	5500 2425 5500 3500
Connection ~ 5500 2550
Wire Wire Line
	5500 2125 5500 2050
Text Label 3325 1625 0    60   ~ 0
3.3v
Text Label 3325 1750 0    60   ~ 0
GND
Text Label 3325 1875 0    60   ~ 0
RST_N
Text Label 6375 3500 0    60   ~ 0
RST_N
Text Label 5500 2050 0    60   ~ 0
3.3v
Text Label 4900 2550 0    60   ~ 0
GND
Wire Wire Line
	5375 2550 5500 2550
$EndSCHEMATC
