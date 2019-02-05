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
Sheet 1 12
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
L CYW20719B1KUMLG U4
U 1 1 5BE8FF2C
P 8850 3425
F 0 "U4" H 8049 5153 50  0000 L BNN
F 1 "CYW20719B1KUMLG" H 8049 1523 50  0000 L BNN
F 2 "CYW20719B1KUMLG:QFN40P500X500X60-41N" H 8850 3425 50  0001 L BNN
F 3 "UFQFN-40 Cypress Semiconductor" H 8850 3425 50  0001 L BNN
F 4 "CYW20719B1KUMLG" H 8850 3425 50  0001 L BNN "Field4"
F 5 "https://www.digikey.com/product-detail/en/cypress-semiconductor-corp/CYW20719B1KUMLG/428-4498-ND/8633287?utm_source=snapeda&utm_medium=aggregator&utm_campaign=symbol" H 8850 3425 50  0001 L BNN "Field5"
F 6 "Cypress Semiconductor" H 8850 3425 50  0001 L BNN "Field6"
F 7 "428-4498-ND" H 8850 3425 50  0001 L BNN "Field7"
F 8 "Single-Chip Bluetooth Transceiver and Baseband Processor" H 8850 3425 50  0001 L BNN "Field8"
	1    8850 3425
	1    0    0    -1  
$EndComp
$Comp
L USB_C_Receptacle J1
U 1 1 5C440475
P 1325 2225
F 0 "J1" H 925 3675 50  0000 L CNN
F 1 "USB_C_Receptacle" H 1725 3675 50  0000 R CNN
F 2 "Connectors_USB:USB_C_Receptacle_Amphenol_12401548E4-2A" H 1475 2225 50  0001 C CNN
F 3 "" H 1475 2225 50  0001 C CNN
	1    1325 2225
	1    0    0    -1  
$EndComp
$Comp
L USB_C_Receptacle J3
U 1 1 5C4408B2
P 3225 2250
F 0 "J3" H 2825 3700 50  0000 L CNN
F 1 "USB_C_Receptacle" H 3625 3700 50  0000 R CNN
F 2 "Connectors_USB:USB_C_Receptacle_Amphenol_12401548E4-2A" H 3375 2250 50  0001 C CNN
F 3 "" H 3375 2250 50  0001 C CNN
	1    3225 2250
	1    0    0    -1  
$EndComp
Text GLabel 3875 3150 2    60   Input ~ 0
USBVCC
Text GLabel 3900 1950 2    60   Input ~ 0
SCLK-USB
Text GLabel 3900 1850 2    60   Input ~ 0
SDA-USB
Text GLabel 3400 3875 2    60   Input ~ 0
USBGND
Text GLabel 2000 1925 2    60   Input ~ 0
SCLK
Text GLabel 2000 1825 2    60   Input ~ 0
SDA
Text GLabel 1950 825  2    60   Input ~ 0
ChgVDD
$Comp
L SW_SPDT SW1
U 1 1 5C4455AC
P 5600 6325
F 0 "SW1" H 5600 6495 50  0000 C CNN
F 1 "SW_SPDT" H 5600 6125 50  0000 C CNN
F 2 "SDPT:SDTPSwitchAmazon" H 5600 6325 50  0001 C CNN
F 3 "" H 5600 6325 50  0001 C CNN
	1    5600 6325
	1    0    0    -1  
$EndComp
$Comp
L Conn_01x01 J5
U 1 1 5C445707
P 5075 6325
F 0 "J5" H 5075 6425 50  0000 C CNN
F 1 "Conn_01x01" H 5075 6225 50  0000 C CNN
F 2 "Wire_Pads:SolderWirePad_single_2mmDrill" H 5075 6325 50  0001 C CNN
F 3 "" H 5075 6325 50  0001 C CNN
	1    5075 6325
	-1   0    0    1   
$EndComp
$Comp
L Conn_01x01 J4
U 1 1 5C4457DE
P 5075 6075
F 0 "J4" H 5075 6175 50  0000 C CNN
F 1 "Conn_01x01" H 5075 5975 50  0000 C CNN
F 2 "Wire_Pads:SolderWirePad_single_2mmDrill" H 5075 6075 50  0001 C CNN
F 3 "" H 5075 6075 50  0001 C CNN
	1    5075 6075
	-1   0    0    1   
$EndComp
Text GLabel 5350 5950 1    60   Input ~ 0
GND
Text GLabel 5875 6425 2    60   Input ~ 0
BatteryOutBuck
Text GLabel 5875 6225 2    60   Input ~ 0
BatteryOutChg
Text GLabel 1975 3125 2    60   Input ~ 0
3.3v
Text GLabel 1975 3225 2    60   Input ~ 0
3.3v
Text GLabel 3875 3250 2    60   Input ~ 0
USBVCC
$Comp
L Crystal Y1
U 1 1 5C44DDD3
P 7575 2575
F 0 "Y1" H 7575 2725 50  0000 C CNN
F 1 "Crystal" H 7575 2425 50  0000 C CNN
F 2 "Crystals:Crystal_SMD_0603-2pin_6.0x3.5mm_HandSoldering" H 7575 2575 50  0001 C CNN
F 3 "" H 7575 2575 50  0001 C CNN
	1    7575 2575
	0    1    1    0   
$EndComp
$Comp
L R R4
U 1 1 5C44E005
P 7375 2575
F 0 "R4" V 7455 2575 50  0000 C CNN
F 1 "R" V 7375 2575 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 7305 2575 50  0001 C CNN
F 3 "" H 7375 2575 50  0001 C CNN
	1    7375 2575
	1    0    0    -1  
$EndComp
$Comp
L C C9
U 1 1 5C44E4A5
P 7375 2925
F 0 "C9" H 7400 3025 50  0000 L CNN
F 1 "C" H 7400 2825 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 7413 2775 50  0001 C CNN
F 3 "" H 7375 2925 50  0001 C CNN
	1    7375 2925
	-1   0    0    1   
$EndComp
$Comp
L C C8
U 1 1 5C44E5BB
P 7375 2225
F 0 "C8" H 7400 2325 50  0000 L CNN
F 1 "C" H 7400 2125 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 7413 2075 50  0001 C CNN
F 3 "" H 7375 2225 50  0001 C CNN
	1    7375 2225
	-1   0    0    1   
$EndComp
Text GLabel 7450 2075 2    60   Input ~ 0
GND
Text GLabel 7450 3075 2    60   Input ~ 0
GND
Wire Wire Line
	3900 1850 3825 1850
Wire Wire Line
	3900 1850 3900 1750
Wire Wire Line
	3900 1750 3825 1750
Wire Wire Line
	3900 1950 3825 1950
Wire Wire Line
	3900 1950 3900 2050
Wire Wire Line
	3900 2050 3825 2050
Wire Wire Line
	2925 3875 3400 3875
Wire Wire Line
	3325 3875 3325 3850
Wire Wire Line
	3225 3875 3225 3850
Connection ~ 3325 3875
Wire Wire Line
	3125 3875 3125 3850
Connection ~ 3225 3875
Wire Wire Line
	3025 3875 3025 3850
Connection ~ 3125 3875
Wire Wire Line
	2925 3875 2925 3850
Connection ~ 3025 3875
Wire Wire Line
	1925 1825 2000 1825
Wire Wire Line
	1925 1925 2000 1925
Wire Wire Line
	1950 1925 1950 2025
Wire Wire Line
	1950 2025 1925 2025
Connection ~ 1950 1925
Wire Wire Line
	1950 1825 1950 1725
Wire Wire Line
	1950 1725 1925 1725
Connection ~ 1950 1825
Wire Wire Line
	1950 825  1950 1225
Wire Wire Line
	1950 925  1925 925 
Wire Wire Line
	1950 1025 1925 1025
Connection ~ 1950 925 
Wire Wire Line
	1950 1125 1925 1125
Connection ~ 1950 1025
Wire Wire Line
	1950 1225 1925 1225
Connection ~ 1950 1125
Wire Wire Line
	1025 3850 1475 3850
Wire Wire Line
	1425 3850 1425 3825
Wire Wire Line
	1325 3850 1325 3825
Connection ~ 1425 3850
Wire Wire Line
	1225 3850 1225 3825
Connection ~ 1325 3850
Wire Wire Line
	1125 3850 1125 3825
Connection ~ 1225 3850
Wire Wire Line
	1025 3850 1025 3825
Connection ~ 1125 3850
Wire Wire Line
	5350 5950 5350 6075
Wire Wire Line
	5350 6075 5275 6075
Wire Wire Line
	5275 6325 5400 6325
Wire Wire Line
	5800 6425 5875 6425
Wire Wire Line
	5800 6225 5875 6225
Wire Wire Line
	1975 3125 1925 3125
Wire Wire Line
	1925 3225 1975 3225
Wire Wire Line
	3825 3150 3875 3150
Wire Wire Line
	3875 3250 3825 3250
Wire Wire Line
	7450 2075 7375 2075
Wire Wire Line
	7375 2375 7375 2425
Wire Wire Line
	7375 2425 7850 2425
Wire Wire Line
	7375 2725 7850 2725
Connection ~ 7575 2725
Connection ~ 7575 2425
Wire Wire Line
	7375 2775 7375 2725
Wire Wire Line
	7450 3075 7375 3075
Wire Wire Line
	7850 2425 7850 2525
Wire Wire Line
	7850 2725 7850 2625
Text GLabel 7775 3425 0    60   Input ~ 0
GND
Wire Wire Line
	7775 3425 7850 3425
Text GLabel 10000 2125 2    60   Input ~ 0
3.3v
$Comp
L C C14
U 1 1 5C45223F
P 10150 2425
F 0 "C14" H 10175 2525 50  0000 L CNN
F 1 "C" H 10175 2325 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10188 2275 50  0001 C CNN
F 3 "" H 10150 2425 50  0001 C CNN
	1    10150 2425
	0    1    1    0   
$EndComp
$Comp
L C C13
U 1 1 5C452310
P 10150 1825
F 0 "C13" H 10175 1925 50  0000 L CNN
F 1 "C" H 10175 1725 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10188 1675 50  0001 C CNN
F 3 "" H 10150 1825 50  0001 C CNN
	1    10150 1825
	0    1    1    0   
$EndComp
Wire Wire Line
	10000 2425 9850 2425
Wire Wire Line
	9850 1825 10000 1825
Wire Wire Line
	10000 1825 10000 2425
Text GLabel 10300 2125 2    60   Input ~ 0
GND
Wire Wire Line
	10300 1825 10300 2425
Text GLabel 10575 3750 2    60   Input ~ 0
Sensor3
Text GLabel 10575 3625 2    60   Input ~ 0
Sensor2
Text GLabel 10575 3500 2    60   Input ~ 0
Sensor1
Text GLabel 10575 3875 2    60   Input ~ 0
Sensor4
Wire Wire Line
	7825 3625 7850 3625
Wire Wire Line
	7850 3725 7825 3725
Wire Wire Line
	7825 3825 7850 3825
Wire Wire Line
	7850 3925 7825 3925
Text GLabel 9925 5125 2    60   Input ~ 0
GND
Wire Wire Line
	9850 5125 9925 5125
Text GLabel 5900 7375 2    60   Input ~ 0
PSensor2
Text GLabel 5900 6900 2    60   Input ~ 0
PSensor1
Text GLabel 10575 4125 2    60   Input ~ 0
PSensor2
Text GLabel 10575 4000 2    60   Input ~ 0
PSensor1
Text GLabel 9925 4325 2    60   Input ~ 0
SCLK
Text GLabel 9925 4625 2    60   Input ~ 0
SDA
Wire Wire Line
	9475 4325 9925 4325
Wire Wire Line
	9475 4625 9925 4625
Wire Wire Line
	6775 4525 7850 4525
Text Notes 7525 4400 0    60   ~ 0
8.2pf
$Comp
L Crystal_GND23 Y2
U 1 1 5C45C3BB
P 7650 4975
F 0 "Y2" H 7775 5175 50  0000 L CNN
F 1 "Crystal_GND23" H 6675 4975 50  0000 L CNN
F 2 "Crystals:Crystal_SMD_0603-4pin_6.0x3.5mm_HandSoldering" H 7650 4975 50  0001 C CNN
F 3 "" H 7650 4975 50  0001 C CNN
	1    7650 4975
	-1   0    0    1   
$EndComp
Wire Wire Line
	7800 4975 7800 4125
Wire Wire Line
	7800 4125 7850 4125
Wire Wire Line
	7850 4225 7500 4225
Wire Wire Line
	7500 4225 7500 4975
Text GLabel 7550 4775 0    60   Input ~ 0
GND
$Comp
L C C23
U 1 1 5C45C76E
P 7375 5125
F 0 "C23" H 7400 5225 50  0000 L CNN
F 1 "C" H 7400 5025 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 7413 4975 50  0001 C CNN
F 3 "" H 7375 5125 50  0001 C CNN
	1    7375 5125
	1    0    0    -1  
$EndComp
$Comp
L C C25
U 1 1 5C45CA48
P 7900 5125
F 0 "C25" H 7925 5225 50  0000 L CNN
F 1 "C" H 7925 5025 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 7938 4975 50  0001 C CNN
F 3 "" H 7900 5125 50  0001 C CNN
	1    7900 5125
	1    0    0    -1  
$EndComp
Text Notes 8000 5175 0    60   ~ 0
12pf
Text Notes 7075 5200 0    60   ~ 0
12pf
Wire Wire Line
	7500 4975 7375 4975
Wire Wire Line
	7800 4975 7900 4975
Text GLabel 7650 5275 3    60   Input ~ 0
GND
Wire Wire Line
	7650 4775 7550 4775
Wire Wire Line
	7375 5275 7900 5275
Wire Wire Line
	7650 5275 7650 5175
Connection ~ 7650 5275
Text GLabel 7150 3225 0    60   Input ~ 0
VBAT
$Comp
L C C22
U 1 1 5C46119F
P 7225 3375
F 0 "C22" H 7250 3475 50  0000 L CNN
F 1 "C" H 7250 3275 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 7263 3225 50  0001 C CNN
F 3 "" H 7225 3375 50  0001 C CNN
	1    7225 3375
	1    0    0    -1  
$EndComp
Text GLabel 7175 3525 0    60   Input ~ 0
GND
Wire Wire Line
	7225 3525 7175 3525
Wire Wire Line
	7150 3225 7850 3225
Connection ~ 7225 3225
Text Notes 6900 3400 0    60   ~ 0
10uf
Text Notes 7500 2950 0    60   ~ 0
6pf
Text Notes 7500 2275 0    60   ~ 0
6pf
$Comp
L L L2
U 1 1 5C46268E
P 10050 3125
F 0 "L2" V 10000 3125 50  0000 C CNN
F 1 "L" V 10125 3125 50  0000 C CNN
F 2 "Inductors_SMD:L_0805" H 10050 3125 50  0001 C CNN
F 3 "" H 10050 3125 50  0001 C CNN
	1    10050 3125
	0    1    1    0   
$EndComp
Wire Wire Line
	9900 3125 9850 3125
$Comp
L C C29
U 1 1 5C4628C3
P 10200 3325
F 0 "C29" H 10225 3425 50  0000 L CNN
F 1 "C" H 10225 3225 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10238 3175 50  0001 C CNN
F 3 "" H 10200 3325 50  0001 C CNN
	1    10200 3325
	-1   0    0    1   
$EndComp
Wire Wire Line
	10200 3100 10200 3175
Wire Wire Line
	10200 3100 7850 3100
Wire Wire Line
	7850 3100 7850 3125
$Comp
L C C30
U 1 1 5C463DA4
P 10375 3325
F 0 "C30" H 10400 3425 50  0000 L CNN
F 1 "C" H 10400 3225 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10413 3175 50  0001 C CNN
F 3 "" H 10375 3325 50  0001 C CNN
	1    10375 3325
	-1   0    0    1   
$EndComp
Connection ~ 10200 3125
Wire Wire Line
	10200 3125 10450 3125
Wire Wire Line
	10375 3125 10375 3175
Text GLabel 10200 3525 3    60   Input ~ 0
GND
Wire Wire Line
	10375 3475 10200 3475
Wire Wire Line
	10200 3475 10200 3525
Text GLabel 10450 3125 2    60   Input ~ 0
CBUCK_OUT
Connection ~ 10375 3125
$Comp
L C C28
U 1 1 5C464739
P 10175 2875
F 0 "C28" H 10200 2975 50  0000 L CNN
F 1 "C" H 10200 2775 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10213 2725 50  0001 C CNN
F 3 "" H 10175 2875 50  0001 C CNN
	1    10175 2875
	0    -1   -1   0   
$EndComp
Wire Wire Line
	10025 3025 9850 3025
Wire Wire Line
	10025 2875 10025 3025
Text Notes 9925 3350 0    60   ~ 0
1uf
Text Notes 10475 3350 0    60   ~ 0
1uf
Text GLabel 10375 2875 2    60   Input ~ 0
GND
Wire Wire Line
	10325 2875 10375 2875
Wire Wire Line
	10025 2950 10000 2950
Wire Wire Line
	10000 2950 10000 2775
Wire Wire Line
	10000 2775 10400 2775
Connection ~ 10025 2950
Text GLabel 10400 2775 2    60   Input ~ 0
1P2VRF
Wire Wire Line
	9850 2025 9900 2025
Wire Wire Line
	9900 2025 9900 1375
Wire Wire Line
	9450 1375 9950 1375
$Comp
L C C26
U 1 1 5C467919
P 9550 1525
F 0 "C26" H 9575 1625 50  0000 L CNN
F 1 "C" H 9575 1425 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 9588 1375 50  0001 C CNN
F 3 "" H 9550 1525 50  0001 C CNN
	1    9550 1525
	-1   0    0    1   
$EndComp
Text GLabel 9500 1675 0    60   Input ~ 0
GND
Wire Wire Line
	9500 1675 9550 1675
Text GLabel 9450 1375 0    60   Input ~ 0
PAVDD
Connection ~ 9550 1375
$Comp
L R R11
U 1 1 5C467E15
P 10100 1375
F 0 "R11" V 10180 1375 50  0000 C CNN
F 1 "R" V 10100 1375 50  0000 C CNN
F 2 "Resistors_SMD:R_0402" V 10030 1375 50  0001 C CNN
F 3 "" H 10100 1375 50  0001 C CNN
	1    10100 1375
	0    1    1    0   
$EndComp
Connection ~ 9900 1375
Text GLabel 10250 1275 1    60   Input ~ 0
1P2VRF
Wire Wire Line
	10250 1375 10250 1275
Wire Wire Line
	10250 1375 10325 1375
Text Notes 9675 1550 0    60   ~ 0
1uf
$Comp
L Ferrite_Bead_Small L3
U 1 1 5C46861E
P 10450 1425
F 0 "L3" H 10525 1475 50  0000 L CNN
F 1 "Ferrite_Bead_Small" H 10525 1375 50  0000 L CNN
F 2 "Resistors_SMD:R_0603" V 10380 1425 50  0001 C CNN
F 3 "" H 10450 1425 50  0001 C CNN
	1    10450 1425
	1    0    0    -1  
$EndComp
$Comp
L Ferrite_Bead_Small L4
U 1 1 5C46874A
P 10825 1425
F 0 "L4" H 10900 1475 50  0000 L CNN
F 1 "Ferrite_Bead_Small" H 10900 1375 50  0000 L CNN
F 2 "Resistors_SMD:R_0603" V 10755 1425 50  0001 C CNN
F 3 "" H 10825 1425 50  0001 C CNN
	1    10825 1425
	1    0    0    -1  
$EndComp
$Comp
L C C31
U 1 1 5C468838
P 10425 1725
F 0 "C31" H 10450 1825 50  0000 L CNN
F 1 "C" H 10450 1625 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10463 1575 50  0001 C CNN
F 3 "" H 10425 1725 50  0001 C CNN
	1    10425 1725
	-1   0    0    1   
$EndComp
$Comp
L C C32
U 1 1 5C468939
P 10625 1700
F 0 "C32" H 10650 1800 50  0000 L CNN
F 1 "C" H 10650 1600 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10663 1550 50  0001 C CNN
F 3 "" H 10625 1700 50  0001 C CNN
	1    10625 1700
	-1   0    0    1   
$EndComp
$Comp
L C C33
U 1 1 5C468A29
P 10850 1725
F 0 "C33" H 10875 1825 50  0000 L CNN
F 1 "C" H 10875 1625 50  0000 L CNN
F 2 "Capacitors_SMD:C_0402" H 10888 1575 50  0001 C CNN
F 3 "" H 10850 1725 50  0001 C CNN
	1    10850 1725
	-1   0    0    1   
$EndComp
Wire Wire Line
	9850 2125 9925 2125
Wire Wire Line
	9925 2125 9925 1575
Wire Wire Line
	9925 1575 10425 1575
Wire Wire Line
	10300 1875 10475 1875
Connection ~ 10300 1875
Wire Wire Line
	9850 2325 9950 2325
Wire Wire Line
	9950 2325 9950 1550
Wire Wire Line
	9950 1550 10625 1550
Wire Wire Line
	10625 1850 10475 1850
Wire Wire Line
	10475 1850 10475 1875
Connection ~ 10425 1875
Wire Wire Line
	10400 1550 10400 1575
Connection ~ 10400 1550
Connection ~ 10400 1575
Wire Wire Line
	10450 1550 10450 1525
Connection ~ 10450 1550
Wire Wire Line
	10325 1375 10325 1325
Wire Wire Line
	10325 1325 10825 1325
Connection ~ 10450 1325
Wire Wire Line
	9975 1525 10850 1525
Wire Wire Line
	9975 1525 9975 2225
Wire Wire Line
	9975 2225 9850 2225
Wire Wire Line
	10850 1525 10850 1575
Connection ~ 10825 1525
Wire Wire Line
	10850 1875 10625 1875
Wire Wire Line
	10625 1875 10625 1850
Text Notes 10200 1700 0    60   ~ 0
.1uf
Text Notes 10450 1675 0    60   ~ 0
.1uf
Text Notes 10875 1675 0    60   ~ 0
10pf\n
Text GLabel 7850 2925 2    60   Input ~ 0
CBUCK_OUT
Wire Wire Line
	7850 2925 7850 3025
$Comp
L Conn_01x01 J13
U 1 1 5C47519F
P 10775 1975
F 0 "J13" H 10775 2075 50  0000 C CNN
F 1 "TP4" H 10775 1875 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x01_Pitch2.54mm" H 10775 1975 50  0001 C CNN
F 3 "" H 10775 1975 50  0001 C CNN
	1    10775 1975
	1    0    0    -1  
$EndComp
Wire Wire Line
	9850 1925 10100 1925
Wire Wire Line
	10100 1925 10100 1975
Wire Wire Line
	10100 1975 10575 1975
$Comp
L Conn_01x01 J12
U 1 1 5C475EAA
P 10075 2650
F 0 "J12" H 10075 2750 50  0000 C CNN
F 1 "HOST_WAKE" H 10075 2550 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x01_Pitch2.54mm" H 10075 2650 50  0001 C CNN
F 3 "" H 10075 2650 50  0001 C CNN
	1    10075 2650
	1    0    0    -1  
$EndComp
Wire Wire Line
	9850 2725 9850 2650
Wire Wire Line
	9850 2650 9875 2650
Text Notes 10025 2000 0    60   ~ 0
.1uf
Text Notes 10300 2450 0    60   ~ 0
.1uf
Text Notes 10100 3000 0    60   ~ 0
2.2uf
Text Notes 9825 3200 0    60   ~ 0
2.2uH
Text Notes 10000 1325 0    60   ~ 0
0 Ohm
Text Notes 7325 2475 3    60   ~ 0
10M
Text Notes 7500 2425 0    60   ~ 0
32.768Khz
Text Notes 7825 4900 0    60   ~ 0
24.000Mhz
Wire Wire Line
	9475 3425 10125 3425
Wire Wire Line
	10125 3425 10125 3775
Wire Wire Line
	10125 3775 10350 3775
Wire Wire Line
	10350 3775 10350 3500
Wire Wire Line
	10350 3500 10575 3500
Wire Wire Line
	10575 3625 10375 3625
Wire Wire Line
	10375 3625 10375 3800
Wire Wire Line
	10375 3800 10100 3800
Wire Wire Line
	10100 3800 10100 3525
Wire Wire Line
	10100 3525 9475 3525
Wire Wire Line
	9475 4525 10400 4525
Wire Wire Line
	10400 4525 10400 3750
Wire Wire Line
	10400 3750 10575 3750
Wire Wire Line
	9925 3875 10575 3875
Wire Wire Line
	10000 4000 10575 4000
Wire Wire Line
	10575 4125 10475 4125
Wire Wire Line
	10475 4125 10475 4925
Wire Wire Line
	10475 4925 9475 4925
$Comp
L Conn_01x16_Male J11
U 1 1 5C4824CB
P 9275 4125
F 0 "J11" H 9275 4925 50  0000 C CNN
F 1 "Conn_01x16_Male" H 9275 3225 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x08_Pitch2.54mm" H 9275 4125 50  0001 C CNN
F 3 "" H 9275 4125 50  0001 C CNN
	1    9275 4125
	1    0    0    -1  
$EndComp
Connection ~ 9850 3425
Connection ~ 9850 3525
Wire Wire Line
	9475 3625 9850 3625
Wire Wire Line
	9850 3725 9475 3725
Wire Wire Line
	9475 3825 9850 3825
Wire Wire Line
	9850 3925 9475 3925
Wire Wire Line
	9475 4025 9850 4025
Wire Wire Line
	9475 4125 9925 4125
Wire Wire Line
	9475 4225 10000 4225
Connection ~ 9850 4325
Wire Wire Line
	9850 4425 9475 4425
Connection ~ 9850 4525
Connection ~ 9850 4625
Connection ~ 9850 4925
Text GLabel 7775 2825 0    60   Input ~ 0
RST_N
Wire Wire Line
	7775 2825 7850 2825
Wire Wire Line
	10000 4225 10000 4000
Connection ~ 9850 4225
Wire Wire Line
	9925 4125 9925 3875
Connection ~ 9850 4125
Wire Wire Line
	9475 4725 9850 4725
Wire Wire Line
	9850 4825 9475 4825
Text GLabel 1975 2525 2    60   Input ~ 0
3.3v
Text GLabel 1975 2625 2    60   Input ~ 0
3.3v
Wire Wire Line
	1975 2525 1925 2525
Wire Wire Line
	1925 2625 1975 2625
Text GLabel 3875 2550 2    60   Input ~ 0
USBVCC
Text GLabel 3875 2650 2    60   Input ~ 0
USBVCC
Wire Wire Line
	3825 2550 3875 2550
Wire Wire Line
	3875 2650 3825 2650
$Sheet
S 1475 7300 775  350 
U 5C4970FF
F0 "BuckConverterRev1" 60
F1 "BuckConverterRev1.sch" 60
F2 "GND" I L 1475 7575 60 
F3 "BuckIn" I L 1475 7375 60 
F4 "BuckOut" I R 2250 7475 60 
$EndSheet
$Sheet
S 1475 6625 675  475 
U 5C49B6D3
F0 "ChargerLipoRev1" 60
F1 "ChargerLipoRev1.sch" 60
F2 "ChargerVDD" I L 1475 6700 60 
F3 "GND" I L 1475 6825 60 
F4 "VBat" I R 2150 6825 60 
$EndSheet
$Sheet
S 1475 6175 700  275 
U 5C49E8BA
F0 "VoltageIndicatorRev1" 60
F1 "VoltageIndicatorRev1.sch" 60
F2 "GND" I L 1475 6350 60 
F3 "3.3vIn" I L 1475 6225 60 
F4 "RST_N" I R 2175 6350 60 
$EndSheet
$Sheet
S 1200 4900 800  275 
U 5C4A2290
F0 "LSM9DS1TR_Accel_Rev1" 60
F1 "LSM9DS1TR_Accel_Rev1.sch" 60
F2 "3.3v_IN" I R 2000 4950 60 
F3 "SCLK" I L 1200 4950 60 
F4 "SDA" I L 1200 5100 60 
F5 "GND" I R 2000 5100 60 
$EndSheet
$Sheet
S 1200 5425 800  275 
U 5C4A8BAE
F0 "LSM9DS1TR_Accel_Rev1_NOPULLUP" 60
F1 "LSM9DS1TR_Accel_Rev1_NOPULLUP.sch" 60
F2 "3.3v_IN" I R 2000 5475 60 
F3 "SCLK" I L 1200 5475 60 
F4 "SDA" I L 1200 5625 60 
F5 "GND" I R 2000 5625 60 
$EndSheet
$Sheet
S 3375 5925 700  275 
U 5C4B9358
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 3375 6000 60 
F3 "GND" I L 3375 6100 60 
F4 "SIGNAL" I R 4075 6000 60 
$EndSheet
$Sheet
S 3375 6400 700  275 
U 5C4BB400
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 3375 6475 60 
F3 "GND" I L 3375 6575 60 
F4 "SIGNAL" I R 4075 6475 60 
$EndSheet
$Sheet
S 3375 6875 700  275 
U 5C4BB725
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 3375 6950 60 
F3 "GND" I L 3375 7050 60 
F4 "SIGNAL" I R 4075 6950 60 
$EndSheet
$Sheet
S 3375 7350 700  275 
U 5C4BB72A
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 3375 7425 60 
F3 "GND" I L 3375 7525 60 
F4 "SIGNAL" I R 4075 7425 60 
$EndSheet
$Sheet
S 5125 6825 700  275 
U 5C4BBBA5
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 5125 6900 60 
F3 "GND" I L 5125 7000 60 
F4 "SIGNAL" I R 5825 6900 60 
$EndSheet
$Sheet
S 5125 7300 700  275 
U 5C4BBBAA
F0 "Sensor2PinRev1-0" 60
F1 "Sensor2PinRev1-0.sch" 60
F2 "VIN" I L 5125 7375 60 
F3 "GND" I L 5125 7475 60 
F4 "SIGNAL" I R 5825 7375 60 
$EndSheet
Text GLabel 2325 7475 2    60   Input ~ 0
3.3v
Text GLabel 1350 7375 0    60   Input ~ 0
BatteryOutBuck
Text GLabel 1350 7575 0    60   Input ~ 0
GND
Wire Wire Line
	1350 7375 1475 7375
Wire Wire Line
	1475 7575 1350 7575
Wire Wire Line
	2250 7475 2325 7475
Text GLabel 1475 3850 2    60   Input ~ 0
GND
Text GLabel 2225 6825 2    60   Input ~ 0
BatteryOutChg
Text GLabel 1400 6700 0    60   Input ~ 0
ChgVDD
Text GLabel 1400 6825 0    60   Input ~ 0
GND
Wire Wire Line
	1400 6700 1475 6700
Wire Wire Line
	1475 6825 1400 6825
Wire Wire Line
	2150 6825 2225 6825
Text GLabel 2250 6350 2    60   Input ~ 0
RST_N
Text GLabel 1400 6350 0    60   Input ~ 0
GND
Text GLabel 1400 6225 0    60   Input ~ 0
3.3v
Wire Wire Line
	1400 6225 1475 6225
Wire Wire Line
	1475 6350 1400 6350
Wire Wire Line
	2175 6350 2250 6350
Text GLabel 1100 5100 0    60   Input ~ 0
SDA
Text GLabel 1100 4950 0    60   Input ~ 0
SCLK
Text GLabel 2125 4950 2    60   Input ~ 0
3.3v
Text GLabel 2125 5100 2    60   Input ~ 0
GND
Wire Wire Line
	1100 4950 1200 4950
Wire Wire Line
	1200 5100 1100 5100
Wire Wire Line
	2000 5100 2125 5100
Wire Wire Line
	2125 4950 2000 4950
Text GLabel 2075 5625 2    60   Input ~ 0
USBGND
Text GLabel 1125 5475 0    60   Input ~ 0
SCLK-USB
Text GLabel 1125 5625 0    60   Input ~ 0
SDA-USB
Text GLabel 2075 5475 2    60   Input ~ 0
USBVCC
Wire Wire Line
	1125 5475 1200 5475
Wire Wire Line
	1200 5625 1125 5625
Wire Wire Line
	2000 5475 2075 5475
Wire Wire Line
	2000 5625 2075 5625
Text GLabel 4150 6000 2    60   Input ~ 0
Sensor1
Text GLabel 4150 6475 2    60   Input ~ 0
Sensor2
Text GLabel 4150 6950 2    60   Input ~ 0
Sensor3
Text GLabel 4150 7425 2    60   Input ~ 0
Sensor4
Text GLabel 3300 6100 0    60   Input ~ 0
GND
Text GLabel 3300 6575 0    60   Input ~ 0
GND
Text GLabel 3300 7050 0    60   Input ~ 0
GND
Text GLabel 3300 7525 0    60   Input ~ 0
GND
Text GLabel 3300 6000 0    60   Input ~ 0
3.3v
Text GLabel 3300 6475 0    60   Input ~ 0
3.3v
Text GLabel 3300 6950 0    60   Input ~ 0
3.3v
Text GLabel 3300 7425 0    60   Input ~ 0
3.3v
Text GLabel 5050 7000 0    60   Input ~ 0
GND
Text GLabel 5050 6900 0    60   Input ~ 0
3.3v
Text GLabel 5050 7475 0    60   Input ~ 0
GND
Text GLabel 5050 7375 0    60   Input ~ 0
3.3v
Wire Wire Line
	3300 6000 3375 6000
Wire Wire Line
	3375 6100 3300 6100
Wire Wire Line
	3300 6475 3375 6475
Wire Wire Line
	3375 6575 3300 6575
Wire Wire Line
	3300 6950 3375 6950
Wire Wire Line
	3375 7050 3300 7050
Wire Wire Line
	3300 7425 3375 7425
Wire Wire Line
	3375 7525 3300 7525
Wire Wire Line
	5050 7375 5125 7375
Wire Wire Line
	5125 7475 5050 7475
Wire Wire Line
	5050 7000 5125 7000
Wire Wire Line
	5125 6900 5050 6900
Wire Wire Line
	4150 6000 4075 6000
Wire Wire Line
	4075 6475 4150 6475
Wire Wire Line
	4150 6950 4075 6950
Wire Wire Line
	4075 7425 4150 7425
Wire Wire Line
	5825 7375 5900 7375
Wire Wire Line
	5825 6900 5900 6900
Text Label 7825 3625 2    50   ~ 0
BT_UART_RX
Text Label 7825 3725 2    50   ~ 0
BT_UART_TX
Text Label 7825 3825 2    50   ~ 0
BT_UART_RTS
Text Label 7825 3925 2    50   ~ 0
BT_UART_CTS
Text GLabel 5800 3400 3    60   Input ~ 0
GND
Wire Wire Line
	5750 3350 5800 3350
Wire Wire Line
	5800 3350 5800 3400
Text Label 5800 3250 0    50   ~ 0
BT_UART_RTS
Text Label 5800 3050 0    50   ~ 0
BT_UART_RX
Text Label 5800 2950 0    50   ~ 0
BT_UART_TX
Text Label 5800 2850 0    50   ~ 0
BT_UART_CTS
Wire Wire Line
	5750 2850 5800 2850
Wire Wire Line
	5750 2950 5800 2950
Wire Wire Line
	5750 3050 5800 3050
Wire Wire Line
	5750 3250 5800 3250
$Comp
L Conn_01x06 J2
U 1 1 5C598653
P 5550 3150
F 0 "J2" H 5550 3450 50  0000 C CNN
F 1 "Conn_01x06" H 5550 2750 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x06_Pitch2.54mm" H 5550 3150 50  0001 C CNN
F 3 "" H 5550 3150 50  0001 C CNN
	1    5550 3150
	-1   0    0    1   
$EndComp
Text GLabel 6600 6650 0    60   Input ~ 0
GND
$Comp
L GND #PWR1
U 1 1 5C59B296
P 6775 6700
F 0 "#PWR1" H 6775 6450 50  0001 C CNN
F 1 "GND" H 6775 6550 50  0000 C CNN
F 2 "" H 6775 6700 50  0001 C CNN
F 3 "" H 6775 6700 50  0001 C CNN
	1    6775 6700
	1    0    0    -1  
$EndComp
Wire Wire Line
	6600 6650 6775 6650
Wire Wire Line
	6775 6650 6775 6700
$Comp
L Conn_01x02 J17
U 1 1 5C59DA7F
P 6500 3350
F 0 "J17" H 6500 3450 50  0000 C CNN
F 1 "Conn_01x02" H 6500 3150 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Angled_1x02_Pitch2.54mm" H 6500 3350 50  0001 C CNN
F 3 "" H 6500 3350 50  0001 C CNN
	1    6500 3350
	0    1    1    0   
$EndComp
Wire Wire Line
	5750 3150 6400 3150
Text GLabel 6500 2950 2    60   Input ~ 0
UART_5v
Wire Wire Line
	6500 3150 6500 2950
Wire Wire Line
	1400 7375 1400 7175
Wire Wire Line
	1400 7175 1350 7175
Connection ~ 1400 7375
Text GLabel 1350 7175 0    60   Input ~ 0
UART_5v
$Comp
L 2450AT42B100E AE1
U 1 1 5C59CB0B
P 6175 4525
F 0 "AE1" H 6375 4825 50  0000 L BNN
F 1 "2450AT42B100E" H 6375 4725 50  0000 L BNN
F 2 "ANTENNA---------------------:XCVR_2450AT42B100E" H 6175 4525 50  0001 L BNN
F 3 "None" H 6175 4525 50  0001 L BNN
F 4 "Unavailable" H 6175 4525 50  0001 L BNN "Field4"
F 5 "2450AT42B100E" H 6175 4525 50  0001 L BNN "Field5"
F 6 "Johanson Technology" H 6175 4525 50  0001 L BNN "Field6"
F 7 "Antenna Chip 2.4ghz" H 6175 4525 50  0001 L BNN "Field7"
F 8 "None" H 6175 4525 50  0001 L BNN "Field8"
	1    6175 4525
	-1   0    0    1   
$EndComp
$Comp
L L L1
U 1 1 5C59D98B
P 6625 4525
F 0 "L1" V 6575 4525 50  0000 C CNN
F 1 "L" V 6700 4525 50  0000 C CNN
F 2 "Inductors_SMD:L_0402" H 6625 4525 50  0001 C CNN
F 3 "" H 6625 4525 50  0001 C CNN
	1    6625 4525
	0    1    1    0   
$EndComp
$Comp
L L L6
U 1 1 5C59DAC4
P 6850 4325
F 0 "L6" V 6800 4325 50  0000 C CNN
F 1 "L" V 6925 4325 50  0000 C CNN
F 2 "Inductors_SMD:L_0402" H 6850 4325 50  0001 C CNN
F 3 "" H 6850 4325 50  0001 C CNN
	1    6850 4325
	1    0    0    -1  
$EndComp
Text GLabel 6775 4100 0    60   Input ~ 0
GND
Wire Wire Line
	6775 4100 6850 4100
Wire Wire Line
	6850 4100 6850 4175
Wire Wire Line
	6850 4525 6850 4475
Connection ~ 6850 4525
Wire Wire Line
	6375 4525 6475 4525
$EndSCHEMATC
