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
Sheet 3 12
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
L MCP73831T-2ACI/OT U1
U 1 1 5C49B798
P 5225 3250
F 0 "U1" H 5063 3647 50  0000 L BNN
F 1 "MCP73831T-2ACI/OT" H 4991 2573 50  0000 L BNN
F 2 "MCP73831T-2ACI_OT:SOT95P280X145-5N" H 5225 3250 50  0001 L BNN
F 3 "SOT-23 Microchip" H 5225 3250 50  0001 L BNN
F 4 "MCP73831T-2ACI/OT" H 5225 3250 50  0001 L BNN "Field4"
F 5 "https://www.digikey.com/product-detail/en/microchip-technology/MCP73831T-2ACI-OT/MCP73831T-2ACI-OTCT-ND/1979802?utm_source=snapeda&utm_medium=aggregator&utm_campaign=symbol" H 5225 3250 50  0001 L BNN "Field5"
F 6 "Microchip" H 5225 3250 50  0001 L BNN "Field6"
F 7 "MCP73831T-2ACI/OTCT-ND" H 5225 3250 50  0001 L BNN "Field7"
F 8 "MCP73831 Series Single-Cell Li-Ion/Li-Polymer Battery Charge Controller SOT-23-5" H 5225 3250 50  0001 L BNN "Field8"
	1    5225 3250
	1    0    0    -1  
$EndComp
$Comp
L R R1
U 1 1 5C49B813
P 4275 3450
F 0 "R1" V 4355 3450 50  0000 C CNN
F 1 "R" V 4275 3450 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 4205 3450 50  0001 C CNN
F 3 "" H 4275 3450 50  0001 C CNN
	1    4275 3450
	0    1    1    0   
$EndComp
$Comp
L R R2
U 1 1 5C49B864
P 5000 2775
F 0 "R2" V 5080 2775 50  0000 C CNN
F 1 "R" V 5000 2775 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 4930 2775 50  0001 C CNN
F 3 "" H 5000 2775 50  0001 C CNN
	1    5000 2775
	0    1    1    0   
$EndComp
$Comp
L C C1
U 1 1 5C49B8A9
P 4000 3300
F 0 "C1" H 4025 3400 50  0000 L CNN
F 1 "C" H 4025 3200 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 4038 3150 50  0001 C CNN
F 3 "" H 4000 3300 50  0001 C CNN
	1    4000 3300
	1    0    0    -1  
$EndComp
$Comp
L C C2
U 1 1 5C49B8F8
P 6000 3500
F 0 "C2" H 6025 3600 50  0000 L CNN
F 1 "C" H 6025 3400 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 6038 3350 50  0001 C CNN
F 3 "" H 6000 3500 50  0001 C CNN
	1    6000 3500
	1    0    0    -1  
$EndComp
$Comp
L LED D1
U 1 1 5C49B969
P 5400 2775
F 0 "D1" H 5400 2875 50  0000 C CNN
F 1 "LED" H 5400 2675 50  0000 C CNN
F 2 "Capacitors_SMD:C_0603" H 5400 2775 50  0001 C CNN
F 3 "" H 5400 2775 50  0001 C CNN
	1    5400 2775
	-1   0    0    1   
$EndComp
Wire Wire Line
	4525 3350 4475 3350
Wire Wire Line
	4475 3350 4475 3450
Wire Wire Line
	4475 3450 4425 3450
Wire Wire Line
	4125 3450 4000 3450
Wire Wire Line
	3900 3150 4525 3150
Wire Wire Line
	4000 3150 4000 2775
Wire Wire Line
	4000 2775 4850 2775
Wire Wire Line
	5150 2775 5250 2775
Wire Wire Line
	5550 2775 5950 2775
Wire Wire Line
	5950 2775 5950 3150
Wire Wire Line
	5950 3150 5925 3150
Wire Wire Line
	5925 3350 6125 3350
Wire Wire Line
	4525 3550 4000 3550
Wire Wire Line
	4000 3550 4000 3450
Wire Wire Line
	4525 3550 4525 3850
Wire Wire Line
	4475 3850 6000 3850
Wire Wire Line
	6000 3850 6000 3650
Text HLabel 3900 3150 0    60   Input ~ 0
ChargerVDD
Text HLabel 4475 3850 0    60   Input ~ 0
GND
Text HLabel 6125 3350 2    60   Input ~ 0
VBat
Connection ~ 6000 3350
Connection ~ 4525 3850
Connection ~ 4000 3150
$EndSCHEMATC
