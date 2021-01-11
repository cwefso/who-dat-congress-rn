import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen'
import CongressScreen from './app/screens/CongressScreen'
import SenateScreen from './app/screens/SenateScreen'

export default function App() {

  const Stack = createStackNavigator();

	return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Congress" component={CongressScreen} />
        <Stack.Screen name="Senate" component={SenateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightblue",
		alignItems: "center",
		justifyContent: "center",
	},
});
