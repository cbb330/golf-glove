EESchema Schematic File Version 4
LIBS:power
LIBS:74xx
LIBS:GolfGloveMainBoardV1.0.0-cache
EELAYER 26 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 6 12
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
L LSM9DS1TR U?
U 1 1 5C4A2352
P 5375 3325
AR Path="/5C4A2290/5C4A2352" Ref="U?"  Part="1" 
AR Path="/5C4A8BAE/5C4A2352" Ref="U?"  Part="1" 
F 0 "U?" H 4874 4352 50  0000 L BNN
F 1 "LSM9DS1TR" H 4874 2323 50  0000 L BNN
F 2 "PQFN43P300X350X102-24N" H 5375 3325 50  0001 L BNN
F 3 "TFLGA-24 STMicroelectronics" H 5375 3325 50  0001 L BNN
F 4 "LSM9DS1TR" H 5375 3325 50  0001 L BNN "Field4"
F 5 "https://www.digikey.com/product-detail/en/stmicroelectronics/LSM9DS1TR/497-14946-1-ND/4988079?utm_source=snapeda&utm_medium=aggregator&utm_campaign=symbol" H 5375 3325 50  0001 L BNN "Field5"
F 6 "STMicroelectronics" H 5375 3325 50  0001 L BNN "Field6"
F 7 "497-14946-1-ND" H 5375 3325 50  0001 L BNN "Field7"
F 8 "LSM9DS1 Series ±2/±4/±8/±16 g 3D Digital Linear Acceleration Sensor - LGA-24" H 5375 3325 50  0001 L BNN "Field8"
	1    5375 3325
	1    0    0    -1  
$EndComp
$Comp
L C C?
U 1 1 5C4A23DC
P 6325 3825
AR Path="/5C4A2290/5C4A23DC" Ref="C?"  Part="1" 
AR Path="/5C4A8BAE/5C4A23DC" Ref="C?"  Part="1" 
F 0 "C?" V 6275 3875 50  0000 L CNN
F 1 "C" V 6275 3700 50  0000 L CNN
F 2 "" H 6363 3675 50  0001 C CNN
F 3 "" H 6325 3825 50  0001 C CNN
	1    6325 3825
	0    1    1    0   
$EndComp
$Comp
L C C?
U 1 1 5C4A24C3
P 6325 3925
AR Path="/5C4A2290/5C4A24C3" Ref="C?"  Part="1" 
AR Path="/5C4A8BAE/5C4A24C3" Ref="C?"  Part="1" 
F 0 "C?" V 6375 3975 50  0000 L CNN
F 1 "C" V 6375 3800 50  0000 L CNN
F 2 "" H 6363 3775 50  0001 C CNN
F 3 "" H 6325 3925 50  0001 C CNN
	1    6325 3925
	0    1    1    0   
$EndComp
$Comp
L C C?
U 1 1 5C4A251C
P 6150 2225
AR Path="/5C4A2290/5C4A251C" Ref="C?"  Part="1" 
AR Path="/5C4A8BAE/5C4A251C" Ref="C?"  Part="1" 
F 0 "C?" H 6175 2325 50  0000 L CNN
F 1 "C" H 6175 2125 50  0000 L CNN
F 2 "" H 6188 2075 50  0001 C CNN
F 3 "" H 6150 2225 50  0001 C CNN
	1    6150 2225
	1    0    0    -1  
$EndComp
$Comp
L C C?
U 1 1 5C4A258F
P 6375 2225
AR Path="/5C4A2290/5C4A258F" Ref="C?"  Part="1" 
AR Path="/5C4A8BAE/5C4A258F" Ref="C?"  Part="1" 
F 0 "C?" H 6400 2325 50  0000 L CNN
F 1 "C" H 6400 2125 50  0000 L CNN
F 2 "" H 6413 2075 50  0001 C CNN
F 3 "" H 6375 2225 50  0001 C CNN
	1    6375 2225
	-1   0    0    1   
$EndComp
$Comp
L C C?
U 1 1 5C4A25B2
P 6150 2725
AR Path="/5C4A2290/5C4A25B2" Ref="C?"  Part="1" 
AR Path="/5C4A8BAE/5C4A25B2" Ref="C?"  Part="1" 
F 0 "C?" H 6175 2825 50  0000 L CNN
F 1 "C" H 6175 2625 50  0000 L CNN
F 2 "" H 6188 2575 50  0001 C CNN
F 3 "" H 6150 2725 50  0001 C CNN
	1    6150 2725
	1    0    0    -1  
$EndComp
Text GLabel 4250 2925 0    60   Input ~ 0
SDA
Text GLabel 4250 2625 0    60   Input ~ 0
SCLK
Wire Wire Line
	4250 2625 4625 2625
Wire Wire Line
	4625 2625 4625 2725
Wire Wire Line
	4625 2825 4625 2925
Wire Wire Line
	4625 2925 4250 2925
Text GLabel 6200 2475 2    60   Input ~ 0
3.3v
Wire Wire Line
	6075 2375 6075 2575
Wire Wire Line
	6200 2475 6075 2475
Connection ~ 6075 2475
Wire Wire Line
	6075 2375 6375 2375
Connection ~ 6075 2425
Connection ~ 6150 2375
Wire Wire Line
	6075 2575 6150 2575
Connection ~ 6075 2525
Text GLabel 6525 2075 2    60   Input ~ 0
GND
Text GLabel 6525 2875 2    60   Input ~ 0
GND
Wire Wire Line
	6150 2075 6525 2075
Connection ~ 6375 2075
Wire Wire Line
	6150 2875 6525 2875
Text GLabel 6475 4125 2    60   Input ~ 0
GND
Wire Wire Line
	6475 3825 6475 4125
Connection ~ 6475 3925
Wire Wire Line
	6475 4125 6075 4125
Wire Wire Line
	6075 3825 6175 3825
Wire Wire Line
	6175 3925 6075 3925
Text HLabel 4050 1800 0    60   Input ~ 0
3.3v_IN
Text HLabel 4050 1900 0    60   Input ~ 0
SCLK
Text HLabel 4050 2000 0    60   Input ~ 0
SDA
Text HLabel 4050 2100 0    60   Input ~ 0
GND
Text GLabel 4125 1900 2    60   Input ~ 0
SCLK
Text GLabel 4125 2000 2    60   Input ~ 0
SDA
Text GLabel 4125 1800 2    60   Input ~ 0
3.3v
Text GLabel 4125 2100 2    60   Input ~ 0
GND
Wire Wire Line
	4050 1800 4125 1800
Wire Wire Line
	4125 1900 4050 1900
Wire Wire Line
	4050 2000 4125 2000
Wire Wire Line
	4125 2100 4050 2100
Wire Wire Line
	4625 2725 4675 2725
Wire Wire Line
	4625 2825 4675 2825
$EndSCHEMATC
