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
LIBS:GolfGloveSD1Schematic-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
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
L GND #PWR2
U 1 1 5BF4D1E9
P 4175 2675
F 0 "#PWR2" H 4175 2425 50  0001 C CNN
F 1 "GND" H 4175 2525 50  0000 C CNN
F 2 "" H 4175 2675 50  0001 C CNN
F 3 "" H 4175 2675 50  0001 C CNN
	1    4175 2675
	1    0    0    -1  
$EndComp
Text GLabel 4275 2000 2    60   Input ~ 0
A0
Text GLabel 4275 2100 2    60   Input ~ 0
A1
Text GLabel 4275 2200 2    60   Input ~ 0
A2
Text GLabel 4275 2300 2    60   Input ~ 0
A3
Text GLabel 4275 2600 2    60   Input ~ 0
GND
Text GLabel 4750 2000 0    60   Input ~ 0
VCC
Text GLabel 3075 1850 0    60   Input ~ 0
SS3.3V
Text GLabel 3075 2200 0    60   Input ~ 0
SS3.3V
Text GLabel 3075 2550 0    60   Input ~ 0
SS3.3V
Text GLabel 3075 2900 0    60   Input ~ 0
SS3.3V
Text GLabel 3075 1750 0    60   Input ~ 0
SS1
Text GLabel 3075 2100 0    60   Input ~ 0
SS2
Text GLabel 3075 2450 0    60   Input ~ 0
SS3
Text GLabel 3075 2800 0    60   Input ~ 0
SS4
Text Notes 4425 1900 0    60   ~ 0
ADC1
Text Notes 2550 1650 0    60   ~ 0
Stretch Sensors
Text GLabel 4750 2325 0    60   Input ~ 0
Sclk
Text GLabel 4750 2450 0    60   Input ~ 0
Sda
Text Notes 5775 2550 0    60   ~ 0
Microcontroller
Text GLabel 5800 2675 2    60   Input ~ 0
Sclk1
Text GLabel 5800 2800 2    60   Input ~ 0
Sda1
$Comp
L GND #PWR7
U 1 1 5BF4D5D0
P 5675 3725
F 0 "#PWR7" H 5675 3475 50  0001 C CNN
F 1 "GND" H 5675 3575 50  0000 C CNN
F 2 "" H 5675 3725 50  0001 C CNN
F 3 "" H 5675 3725 50  0001 C CNN
	1    5675 3725
	1    0    0    -1  
$EndComp
Text GLabel 5800 3675 2    60   Input ~ 0
GND
Text GLabel 4850 2000 2    60   Input ~ 0
3.3V
Text GLabel 6550 2650 2    60   Input ~ 0
3.3V
Text GLabel 6425 2650 0    60   Input ~ 0
VCC
$Comp
L GND #PWR1
U 1 1 5BF4DF47
P 3850 2900
F 0 "#PWR1" H 3850 2650 50  0001 C CNN
F 1 "GND" H 3850 2750 50  0000 C CNN
F 2 "" H 3850 2900 50  0001 C CNN
F 3 "" H 3850 2900 50  0001 C CNN
	1    3850 2900
	1    0    0    -1  
$EndComp
Text GLabel 3075 3075 0    60   Input ~ 0
3.3V
Text GLabel 5800 2975 2    60   Input ~ 0
A0
Text GLabel 5800 3100 2    60   Input ~ 0
A1
Text GLabel 6175 4925 0    60   Input ~ 0
PS1
Text GLabel 6175 5050 0    60   Input ~ 0
PS3.3V
Text GLabel 6175 5350 0    60   Input ~ 0
PS2
Text GLabel 6175 5475 0    60   Input ~ 0
PS3.3V
$Comp
L GND #PWR9
U 1 1 5BF4EEE7
P 6800 5625
F 0 "#PWR9" H 6800 5375 50  0001 C CNN
F 1 "GND" H 6800 5475 50  0000 C CNN
F 2 "" H 6800 5625 50  0001 C CNN
F 3 "" H 6800 5625 50  0001 C CNN
	1    6800 5625
	1    0    0    -1  
$EndComp
Text GLabel 6175 5700 0    60   Input ~ 0
3.3V
Text Notes 5675 4825 0    60   ~ 0
Pressure Sensors
Text GLabel 7800 2775 2    60   Input ~ 0
Sclk
Text GLabel 7800 2975 2    60   Input ~ 0
Sda
Text GLabel 8300 2775 0    60   Input ~ 0
VCC
Text GLabel 8300 2975 0    60   Input ~ 0
GND
Text Notes 7950 2675 0    60   ~ 0
IMU1
Text GLabel 7800 3300 2    60   Input ~ 0
Sclk
Text GLabel 7800 3500 2    60   Input ~ 0
Sda
Text GLabel 8300 3300 0    60   Input ~ 0
VCC
Text GLabel 8300 3500 0    60   Input ~ 0
GND
Text Notes 7950 3200 0    60   ~ 0
IMU2
Text GLabel 8500 2775 2    60   Input ~ 0
3.3V
$Comp
L GND #PWR11
U 1 1 5BF4FB02
P 8375 3600
F 0 "#PWR11" H 8375 3350 50  0001 C CNN
F 1 "GND" H 8375 3450 50  0000 C CNN
F 2 "" H 8375 3600 50  0001 C CNN
F 3 "" H 8375 3600 50  0001 C CNN
	1    8375 3600
	1    0    0    -1  
$EndComp
Text GLabel 6650 4075 0    60   Input ~ 0
BAT+
Text GLabel 6650 4275 0    60   Input ~ 0
GND
$Comp
L GND #PWR8
U 1 1 5BF5231C
P 6750 4325
F 0 "#PWR8" H 6750 4075 50  0001 C CNN
F 1 "GND" H 6750 4175 50  0000 C CNN
F 2 "" H 6750 4325 50  0001 C CNN
F 3 "" H 6750 4325 50  0001 C CNN
	1    6750 4325
	1    0    0    -1  
$EndComp
Text Notes 6125 3925 0    60   ~ 0
Li-Po Battery
$Comp
L GND #PWR3
U 1 1 5C060712
P 4175 3600
F 0 "#PWR3" H 4175 3350 50  0001 C CNN
F 1 "GND" H 4175 3450 50  0000 C CNN
F 2 "" H 4175 3600 50  0001 C CNN
F 3 "" H 4175 3600 50  0001 C CNN
	1    4175 3600
	1    0    0    -1  
$EndComp
Text GLabel 4275 2925 2    60   Input ~ 0
A0
Text GLabel 4275 3025 2    60   Input ~ 0
A1
Text GLabel 4275 3125 2    60   Input ~ 0
A2
Text GLabel 4275 3225 2    60   Input ~ 0
A3
Text GLabel 4275 3525 2    60   Input ~ 0
GND
Text GLabel 4750 2925 0    60   Input ~ 0
VCC
Text Notes 4425 2825 0    60   ~ 0
ADC2
Text GLabel 4750 3250 0    60   Input ~ 0
Sclk
Text GLabel 4750 3375 0    60   Input ~ 0
Sda
Text GLabel 4850 2925 2    60   Input ~ 0
3.3V
$Comp
L GND #PWR4
U 1 1 5C060751
P 4175 4525
F 0 "#PWR4" H 4175 4275 50  0001 C CNN
F 1 "GND" H 4175 4375 50  0000 C CNN
F 2 "" H 4175 4525 50  0001 C CNN
F 3 "" H 4175 4525 50  0001 C CNN
	1    4175 4525
	1    0    0    -1  
$EndComp
Text GLabel 4275 3850 2    60   Input ~ 0
A0
Text GLabel 4275 3950 2    60   Input ~ 0
A1
Text GLabel 4275 4050 2    60   Input ~ 0
A2
Text GLabel 4275 4450 2    60   Input ~ 0
GND
Text GLabel 4750 3850 0    60   Input ~ 0
VCC
Text GLabel 4750 4175 0    60   Input ~ 0
Sclk
Text GLabel 4750 4300 0    60   Input ~ 0
Sda
Text GLabel 4850 3850 2    60   Input ~ 0
3.3V
$Comp
L GND #PWR5
U 1 1 5C060771
P 4175 4525
F 0 "#PWR5" H 4175 4275 50  0001 C CNN
F 1 "GND" H 4175 4375 50  0000 C CNN
F 2 "" H 4175 4525 50  0001 C CNN
F 3 "" H 4175 4525 50  0001 C CNN
	1    4175 4525
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR6
U 1 1 5C060777
P 4175 5450
F 0 "#PWR6" H 4175 5200 50  0001 C CNN
F 1 "GND" H 4175 5300 50  0000 C CNN
F 2 "" H 4175 5450 50  0001 C CNN
F 3 "" H 4175 5450 50  0001 C CNN
	1    4175 5450
	1    0    0    -1  
$EndComp
Text GLabel 4275 4775 2    60   Input ~ 0
A0
Text GLabel 4275 4875 2    60   Input ~ 0
A1
Text GLabel 4275 4975 2    60   Input ~ 0
A2
Text GLabel 4275 5075 2    60   Input ~ 0
A3
Text GLabel 4275 5375 2    60   Input ~ 0
GND
Text GLabel 4750 4775 0    60   Input ~ 0
VCC
Text GLabel 4750 5100 0    60   Input ~ 0
Sclk
Text GLabel 4750 5225 0    60   Input ~ 0
Sda
Text GLabel 4850 4775 2    60   Input ~ 0
3.3V
Text GLabel 4275 4150 2    60   Input ~ 0
A3
Wire Notes Line
	4275 1925 4275 2700
Wire Notes Line
	4275 2700 4750 2700
Wire Notes Line
	4750 2700 4750 1925
Wire Notes Line
	4750 1925 4275 1925
Wire Wire Line
	4275 2600 4175 2600
Wire Wire Line
	4175 2600 4175 2675
Wire Notes Line
	2275 1900 3075 1900
Wire Notes Line
	3075 1900 3075 1700
Wire Notes Line
	3075 1700 2275 1700
Wire Notes Line
	2275 2050 3075 2050
Wire Notes Line
	2275 2600 3075 2600
Wire Notes Line
	3075 2600 3075 2400
Wire Notes Line
	3075 2400 2275 2400
Wire Notes Line
	2275 2750 3075 2750
Wire Notes Line
	3075 2950 3075 2750
Wire Notes Line
	2275 2950 3075 2950
Wire Wire Line
	3125 1850 3125 3075
Wire Wire Line
	3125 1850 3075 1850
Wire Wire Line
	3075 2200 3125 2200
Connection ~ 3125 2200
Wire Wire Line
	3075 2550 3125 2550
Connection ~ 3125 2550
Wire Wire Line
	3075 2900 3125 2900
Connection ~ 3125 2900
Wire Notes Line
	5800 2575 5800 3750
Wire Notes Line
	5800 3750 6425 3750
Wire Notes Line
	6425 3750 6425 2575
Wire Notes Line
	6425 2575 5800 2575
Wire Wire Line
	4750 2325 5275 2325
Wire Wire Line
	5275 2325 5275 5100
Wire Wire Line
	5275 2675 5800 2675
Wire Wire Line
	4750 2450 5150 2450
Wire Wire Line
	5150 2450 5150 5225
Wire Wire Line
	5150 2800 5800 2800
Wire Wire Line
	5675 3725 5675 3675
Wire Wire Line
	5675 3675 5800 3675
Wire Wire Line
	6425 2650 6550 2650
Wire Wire Line
	4850 2000 4750 2000
Wire Wire Line
	3550 2825 3850 2825
Connection ~ 3650 2825
Connection ~ 3750 2825
Wire Wire Line
	3850 2775 3850 2900
Wire Wire Line
	3125 3075 3075 3075
Wire Wire Line
	3650 2100 3650 2475
Wire Wire Line
	3075 2450 3200 2450
Wire Wire Line
	3200 2450 3200 2200
Wire Wire Line
	3750 2200 3750 2475
Wire Wire Line
	3075 2800 3300 2800
Wire Wire Line
	3300 2800 3300 2300
Wire Wire Line
	3850 2300 3850 2475
Wire Wire Line
	3075 1750 3200 1750
Wire Wire Line
	3200 1750 3200 2000
Wire Wire Line
	3200 2000 4275 2000
Wire Wire Line
	3550 2000 3550 2475
Connection ~ 3550 2000
Connection ~ 3650 2100
Connection ~ 3750 2200
Connection ~ 3850 2300
Wire Notes Line
	5925 4875 6175 4875
Wire Notes Line
	6175 4875 6175 5100
Wire Notes Line
	6175 5100 5925 5100
Wire Notes Line
	5925 5300 6175 5300
Wire Notes Line
	6175 5300 6175 5525
Wire Notes Line
	6175 5525 5925 5525
Wire Notes Line
	3075 2050 3075 2250
Wire Notes Line
	3075 2250 2275 2250
Wire Wire Line
	6175 5350 6375 5350
Wire Wire Line
	6375 5350 6375 5050
Wire Wire Line
	6800 4600 6800 5225
Wire Wire Line
	6700 5575 6800 5575
Wire Wire Line
	6800 5525 6800 5625
Connection ~ 6800 5050
Wire Wire Line
	6700 4700 6700 5225
Connection ~ 6700 4925
Wire Wire Line
	6175 5700 6275 5700
Wire Wire Line
	6275 5700 6275 5050
Wire Wire Line
	6275 5050 6175 5050
Wire Wire Line
	6175 5475 6275 5475
Connection ~ 6275 5475
Wire Notes Line
	7800 2700 7800 3050
Wire Notes Line
	7800 2700 8300 2700
Wire Notes Line
	8300 2700 8300 3050
Wire Notes Line
	8300 3050 7800 3050
Wire Notes Line
	7800 3225 7800 3575
Wire Notes Line
	7800 3225 8300 3225
Wire Notes Line
	8300 3225 8300 3575
Wire Notes Line
	8300 3575 7800 3575
Wire Wire Line
	5700 2675 5700 2275
Wire Wire Line
	5700 2275 7700 2275
Wire Wire Line
	7700 2275 7700 3300
Wire Wire Line
	7700 3300 7800 3300
Connection ~ 5700 2675
Wire Wire Line
	7800 2775 7700 2775
Connection ~ 7700 2775
Wire Wire Line
	7800 2975 7600 2975
Wire Wire Line
	7600 2375 7600 3500
Wire Wire Line
	7600 2375 5600 2375
Wire Wire Line
	5600 2375 5600 2800
Connection ~ 5600 2800
Wire Wire Line
	7600 3500 7800 3500
Connection ~ 7600 2975
Wire Wire Line
	8300 3500 8375 3500
Wire Wire Line
	8375 2975 8375 3600
Wire Wire Line
	8300 2975 8375 2975
Connection ~ 8375 3500
Wire Wire Line
	8300 2775 8500 2775
Wire Wire Line
	8300 3300 8450 3300
Wire Wire Line
	8450 3300 8450 2775
Connection ~ 8450 2775
Wire Notes Line
	6175 4000 6175 4400
Wire Notes Line
	6175 4400 6650 4400
Wire Notes Line
	6650 4400 6650 4000
Wire Notes Line
	6650 4000 6175 4000
Wire Wire Line
	6650 4275 6750 4275
Wire Wire Line
	6750 4275 6750 4325
Wire Wire Line
	6650 4075 6750 4075
Wire Notes Line
	4275 2850 4275 3625
Wire Notes Line
	4275 3625 4750 3625
Wire Notes Line
	4750 3625 4750 2850
Wire Notes Line
	4750 2850 4275 2850
Wire Wire Line
	4275 3525 4175 3525
Wire Wire Line
	4175 3525 4175 3600
Wire Wire Line
	4850 2925 4750 2925
Wire Notes Line
	4275 3775 4275 4550
Wire Notes Line
	4275 4550 4750 4550
Wire Notes Line
	4750 4550 4750 3775
Wire Notes Line
	4750 3775 4275 3775
Wire Wire Line
	4275 4450 4175 4450
Wire Wire Line
	4175 4450 4175 4525
Wire Wire Line
	4850 3850 4750 3850
Wire Notes Line
	4275 4700 4275 5475
Wire Notes Line
	4275 5475 4750 5475
Wire Notes Line
	4750 5475 4750 4700
Wire Notes Line
	4750 4700 4275 4700
Wire Wire Line
	4275 5375 4175 5375
Wire Wire Line
	4175 5375 4175 5450
Wire Wire Line
	4850 4775 4750 4775
Wire Wire Line
	3075 2100 4100 2100
Wire Wire Line
	3200 2200 4025 2200
Wire Wire Line
	3300 2300 3950 2300
Wire Wire Line
	4100 2100 4100 2925
Wire Wire Line
	4100 2925 4275 2925
Wire Wire Line
	4025 2200 4025 3850
Wire Wire Line
	4025 3850 4275 3850
Wire Wire Line
	3950 2300 3950 4775
Wire Wire Line
	3950 4775 4275 4775
Text Notes 4400 3750 0    60   ~ 0
ADC3
Text Notes 4400 4675 0    60   ~ 0
ADC4
Wire Wire Line
	5275 3250 4750 3250
Connection ~ 5275 2675
Wire Wire Line
	5275 4175 4750 4175
Connection ~ 5275 3250
Wire Wire Line
	5275 5100 4750 5100
Connection ~ 5275 4175
Wire Wire Line
	4750 3375 5150 3375
Connection ~ 5150 2800
Wire Wire Line
	5150 4300 4750 4300
Connection ~ 5150 3375
Wire Wire Line
	5150 5225 4750 5225
Connection ~ 5150 4300
Wire Wire Line
	5400 2975 5800 2975
Wire Wire Line
	5800 3100 5525 3100
Text GLabel 7150 3975 2    60   Input ~ 0
3.3V
$Comp
L SW_SPDT SW1
U 1 1 5C061247
P 6950 4075
F 0 "SW1" H 6950 4245 50  0000 C CNN
F 1 "SW_SPDT" H 6950 3875 50  0000 C CNN
F 2 "" H 6950 4075 50  0001 C CNN
F 3 "" H 6950 4075 50  0001 C CNN
	1    6950 4075
	1    0    0    -1  
$EndComp
Wire Notes Line
	7625 4100 8050 4100
Wire Notes Line
	8050 4100 8050 4500
Wire Notes Line
	8050 4500 7625 4500
Wire Notes Line
	7625 4500 7625 4100
Text GLabel 7625 4175 2    60   Input ~ 0
Bat+
Text GLabel 7625 4400 2    60   Input ~ 0
Bat-
$Comp
L GND #PWR10
U 1 1 5C061395
P 7525 4450
F 0 "#PWR10" H 7525 4200 50  0001 C CNN
F 1 "GND" H 7525 4300 50  0000 C CNN
F 2 "" H 7525 4450 50  0001 C CNN
F 3 "" H 7525 4450 50  0001 C CNN
	1    7525 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	7625 4400 7525 4400
Wire Wire Line
	7525 4400 7525 4450
Wire Wire Line
	7150 4175 7625 4175
Text Notes 7675 4075 0    60   ~ 0
Charger
Wire Wire Line
	6175 4925 6700 4925
Wire Wire Line
	6375 5050 6800 5050
Wire Wire Line
	6700 4700 5400 4700
Wire Wire Line
	5400 4700 5400 2975
Wire Wire Line
	5525 3100 5525 4600
Wire Wire Line
	5525 4600 6800 4600
$Comp
L R R1
U 1 1 5C0619D7
P 3550 2625
F 0 "R1" V 3550 2650 50  0000 C CNN
F 1 "R" V 3550 2625 50  0000 C CNN
F 2 "" V 3480 2625 50  0001 C CNN
F 3 "" H 3550 2625 50  0001 C CNN
	1    3550 2625
	1    0    0    -1  
$EndComp
$Comp
L R R2
U 1 1 5C061A12
P 3650 2625
F 0 "R2" V 3650 2650 50  0000 C CNN
F 1 "R" V 3650 2625 50  0000 C CNN
F 2 "" V 3580 2625 50  0001 C CNN
F 3 "" H 3650 2625 50  0001 C CNN
	1    3650 2625
	1    0    0    -1  
$EndComp
$Comp
L R R3
U 1 1 5C061A52
P 3750 2625
F 0 "R3" V 3750 2650 50  0000 C CNN
F 1 "R" V 3750 2625 50  0000 C CNN
F 2 "" V 3680 2625 50  0001 C CNN
F 3 "" H 3750 2625 50  0001 C CNN
	1    3750 2625
	1    0    0    -1  
$EndComp
$Comp
L R R4
U 1 1 5C061A58
P 3850 2625
F 0 "R4" V 3850 2650 50  0000 C CNN
F 1 "R" V 3850 2625 50  0000 C CNN
F 2 "" V 3780 2625 50  0001 C CNN
F 3 "" H 3850 2625 50  0001 C CNN
	1    3850 2625
	1    0    0    -1  
$EndComp
Wire Wire Line
	3750 2775 3750 2825
Wire Wire Line
	3650 2775 3650 2825
Wire Wire Line
	3550 2775 3550 2825
Connection ~ 3850 2825
$Comp
L R R5
U 1 1 5C0620B7
P 6700 5375
F 0 "R5" V 6700 5400 50  0000 C CNN
F 1 "R" V 6700 5375 50  0000 C CNN
F 2 "" V 6630 5375 50  0001 C CNN
F 3 "" H 6700 5375 50  0001 C CNN
	1    6700 5375
	1    0    0    -1  
$EndComp
$Comp
L R R6
U 1 1 5C0620E2
P 6800 5375
F 0 "R6" V 6800 5400 50  0000 C CNN
F 1 "R" V 6800 5375 50  0000 C CNN
F 2 "" V 6730 5375 50  0001 C CNN
F 3 "" H 6800 5375 50  0001 C CNN
	1    6800 5375
	1    0    0    -1  
$EndComp
Connection ~ 6800 5575
Wire Wire Line
	6700 5575 6700 5525
Wire Notes Line
	2275 1700 2275 1900
Wire Notes Line
	2275 2250 2275 2050
Wire Notes Line
	2275 2400 2275 2600
Wire Notes Line
	2275 2750 2275 2950
$EndSCHEMATC
