import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Homepage from "./Homepage";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from "./LoginPage";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Login'}>
                <Stack.Screen name="Home" component={Homepage}/>
                <Stack.Screen name="Login" component={LoginPage} options={{
                    title:'Sign in or Sign up'
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create({})
