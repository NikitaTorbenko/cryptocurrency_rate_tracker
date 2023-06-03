import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import CurrentCurrency from '../screens/CurrentCurrency';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CurrentCurrency"
          component={CurrentCurrency}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
