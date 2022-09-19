import React from 'react';
import {StyleSheet} from 'react-native';

import {CustomText} from '../../lib';

import {GenericStyles} from '../../styles/GenericStyles';

const TimerText = props => {
  const {text, time} = props;

  return (
    <CustomText
      style={[
        GenericStyles.centerAlignedText,
        styles.resendOtpTimerText,
        GenericStyles.mt24,
        styles.center
      ]}>
      {text}
      <CustomText style={GenericStyles.bold}>{' ' + time}s</CustomText>
    </CustomText>
  );
};

const styles = StyleSheet.create({
  resendOtpTimerText: {
    fontSize: 12,
  },
  center:{
    alignSelf:'center'
  }
});

export default TimerText;
