import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {globalStyles} from '../globalStyles';
import {colors} from '../variables/colors';

import { round } from '../utils/round';

const CryptoItem = ({
  name,
  symbol,
  price,
  percent_change_24h,
  percent_change_7d,
}) => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          {/* <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
            }}
            style={styles.img}
          /> */}
          <Text style={styles.text}>
            <Text style={styles.textBold}>{symbol}</Text> | {name}
          </Text>
        </View>
        <View>
          <Text style={[styles.text, styles.textBold]}>{round(price)} $</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text style={[styles.text, styles.textBold, styles.bottomText]}>
            24h:{' '}
            <Text style={
                percent_change_24h < 0
                  ? styles.interestRed
                  : styles.interestGreen
              }>
              {round(percent_change_24h)} %
            </Text>
          </Text>
        </View>
        <View>
          <Text style={[styles.text, styles.textBold, styles.bottomText]}>
            7d:{' '}
            <Text
              style={
                percent_change_7d < 0
                  ? styles.interestRed
                  : styles.interestGreen
              }>
              {round(percent_change_7d)} %
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 3,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 40,
    width: 40,
  },
  text: {
    fontSize: 17,
    color: colors.black,
    paddingLeft: 18,
  },
  textBold: {
    fontWeight: 800,
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 600,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  interestGreen: {
    color: colors.green,
  },
  interestRed: {
    color: colors.red,
  },
});

export default CryptoItem;
