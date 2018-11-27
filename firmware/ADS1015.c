#include "ADS1015.h"

void ads_setup()
{
   m_conversionDelay = /*1;*/ ADS1115_CONVERSIONDELAY;
   m_bitShift = 0;
   m_gain = GAIN_SIXTEEN; /* +/- 6.144V range (limited to VDD +0.3V max!) */
}

/**************************************************************************/
/*!
    @brief  Gets a single-ended ADC reading from the specified channel
*/
/**************************************************************************/
void ads_configureADC(UINT8 address, UINT8 channel) {
  if (channel > 3)
  {
    return 0;
  }

  // Start with default values
  UINT16 config = ADS1015_REG_CONFIG_CQUE_NONE    | // Disable the comparator (default val)
                    ADS1015_REG_CONFIG_CLAT_NONLAT  | // Non-latching (default val)
                    ADS1015_REG_CONFIG_CPOL_ACTVLOW | // Alert/Rdy active low   (default val)
                    ADS1015_REG_CONFIG_CMODE_TRAD   | // Traditional comparator (default val)
                    ADS1015_REG_CONFIG_DR_1600SPS   | // 1600 samples per second (default)
                    ADS1015_REG_CONFIG_MODE_CONTIN;   // Continuous mode (default)

  // Set PGA/voltage range
  config |= m_gain;

  // Set single-ended input channel
  switch (channel)
  {
    case (0):
      config |= ADS1015_REG_CONFIG_MUX_SINGLE_0;
      break;
    case (1):
      config |= ADS1015_REG_CONFIG_MUX_SINGLE_1;
      break;
    case (2):
      config |= ADS1015_REG_CONFIG_MUX_SINGLE_2;
      break;
    case (3):
      config |= ADS1015_REG_CONFIG_MUX_SINGLE_3;
      break;
  }

  // Set 'start single-conversion' bit
  config |= ADS1015_REG_CONFIG_OS_SINGLE;

  // Write config register to the ADC
  i2c_write16(address, ADS1015_REG_POINTER_CONFIG, config);

  // Wait for the conversion to complete
  wiced_rtos_delay_milliseconds(m_conversionDelay, KEEP_THREAD_ACTIVE);

  
}

UINT16 ads_readADC_SingleEnded(UINT8 address) {
  // Read the conversion results
  // Shift 12-bit results right 4 bits for the ADS1015
  return i2c_read16(address, ADS1015_REG_POINTER_CONVERT) >> m_bitShift;
}

