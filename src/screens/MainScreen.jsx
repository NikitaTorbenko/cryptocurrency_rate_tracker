import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {globalStyles} from '../globalStyles';
import {colors} from '../variables/colors';
import CryptoItem from '../components/CryptoItem';

import allData from '../data/data.json';
import {useNavigation} from '@react-navigation/native';

import {round} from '../utils/round';

const MainScreen = () => {
  const navigation = useNavigation();

  const {data: myData} = allData;
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setData([]);
    setIsLoading(true);
    setTimeout(() => {
      setData(myData);
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      <View style={styles.container}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Cryptocurrency App</Text>
        </View>
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }
          keyExtractor={(_, index) => index}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CurrentCurrency', {
                  name: item.name,
                  symbol: item.symbol,
                  price: round(item.quote.USD.price),
                  percent_change_24h: round(item.quote.USD.percent_change_24h),
                  percent_change_7d: round(item.quote.USD.percent_change_7d),
                })
              }>
              <CryptoItem
                name={item.name}
                symbol={item.symbol}
                price={item.quote.USD.price}
                percent_change_24h={item.quote.USD.percent_change_24h}
                percent_change_7d={item.quote.USD.percent_change_7d}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 800,
    color: colors.black,
    paddingBottom: 50,
  },
});

export default MainScreen;
