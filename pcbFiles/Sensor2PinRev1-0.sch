EESchema Schematic File Version 4
LIBS:power
LIBS:74xx
LIBS:GolfGloveMainBoardV1.0.0-cache
EELAYER 26 0
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
AR Path="/5C4B9358/5C4B94B6" Ref="R?"  Part="1" 
AR Path="/5C4BB400/5C4B94B6" Ref="R?"  Part="1" 
AR Path="/5C4BB725/5C4B94B6" Ref="R?"  Part="1" 
AR Path="/5C4BB72A/5C4B94B6" Ref="R?"  Part="1" 
AR Path="/5C4BBBA5/5C4B94B6" Ref="R?"  Part="1" 
AR Path="/5C4BBBAA/5C4B94B6" Ref="R?"  Part="1" 
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
AR Path="/5C4B9358/5C4B9547" Ref="J?"  Part="1" 
AR Path="/5C4BB400/5C4B9547" Ref="J?"  Part="1" 
AR Path="/5C4BB725/5C4B9547" Ref="J?"  Part="1" 
AR Path="/5C4BB72A/5C4B9547" Ref="J?"  Part="1" 
AR Path="/5C4BBBA5/5C4B9547" Ref="J?"  Part="1" 
AR Path="/5C4BBBAA/5C4B9547" Ref="J?"  Part="1" 
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
