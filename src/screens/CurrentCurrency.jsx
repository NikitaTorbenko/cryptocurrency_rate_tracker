import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

import {VictoryChart, VictoryLine} from 'victory-native';

import allData from '../data/data.json';
import {globalStyles} from '../globalStyles';
import {colors} from '../variables/colors';
import {round} from '../utils/round';

const dates = ['1d', '1w', '1m', '1y'];

const CurrentCurrency = ({route}) => {
  const {quotes, data} = allData;

  const [isActive, setIsActive] = useState(0);

  const myDate = index => quotes[index].map(el => el.timestamp);
  const date = (quotesIndex, dateIndexInCurrentQuotes) =>
    new Date(myDate(quotesIndex)[dateIndexInCurrentQuotes]);

  const percentFunc = date => {
    switch (date) {
      case 0:
        return data[0].quote.USD.percent_change_24h;

      case 1:
        return data[0].quote.USD.percent_change_7d;

      case 2:
        return data[0].quote.USD.percent_change_30d;

      case 3:
        return data[0].quote.USD.percent_change_90d;

      default:
        return data[0].quote.USD.percent_change_24h;
    }
  };

  if (route.params.name !== 'Bitcoin')
    return (
      <View>
        <Text>А вот надо в биткоин переходить</Text>
      </View>
    );

  return (
    <SafeAreaView style={[globalStyles.safeAreaView, {paddingHorizontal: 10}]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      <View style={styles.top}>
        <Text style={styles.symbol}>{route.params.symbol}</Text>
        <Text style={styles.name}>{route.params.name}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.price}>
          {route.params.price} {'  '}{' '}
          <Text style={styles.green}>
            {percentFunc(isActive) > 0 && '+'}
            {round(percentFunc(isActive))}%
          </Text>
        </Text>
        <Text style={styles.rate}>{route.params.symbol} | USD</Text>
      </View>
      <View style={styles.date}>
        {dates.map((el, index) => (
          <TouchableOpacity onPress={() => setIsActive(index)} key={index}>
            <View style={styles.dateItemBlock}>
              <Text
                style={[styles.dateItem, isActive === index && styles.active]}>
                {el}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.graph}>
        <VictoryChart
          width={Dimensions.get('window').width}
          height={300}
          // scale={{x: 'time', y: 'linear'}}
        >
          <VictoryLine
            style={{
              data: {stroke: 'tomato'},
            }}
            data={quotes[isActive].map((el, index) => {
              return {
                x: new Date(
                  date(isActive, index).getFullYear(),
                  date(isActive, index).getMonth() + 1,
                  date(isActive, index).getDate(),
                  date(isActive, index).getHours(),
                ),
                y: round(el.quote.USD.price),
              };
            })}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  green: {
    color: '#18b818',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  symbol: {
    fontSize: 28,
    fontWeight: 800,
    marginRight: 20,
    color: '#222',
  },
  name: {
    color: '#666',
    fontWeight: 600,
    marginBottom: 3,
    fontSize: 16,
  },
  info: {
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  price: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 800,
  },
  rate: {
    color: colors.grey,
    marginBottom: 5,
  },
  date: {
    flexDirection: 'row',
  },
  dateItem: {
    minWidth: 34,
    textAlign: 'center',
    padding: 7,
    backgroundColor: 'transparent',
    margin: 5,
    borderRadius: 5,
  },
  active: {
    backgroundColor: '#999',
    color: '#fff',
  },
});

export default CurrentCurrency;
