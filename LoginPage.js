import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native';

const LoginPage = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        if(username==='Kjaly' && password ==='123'){
            navigation.navigate('Home')
        }

    }
    return (
        <View>
            <Text>I am the login page</Text>
            <TextInput
                style={styles.input}
                value={username}
                placeholder='Enter a username'
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                value={password}
                keyboardType='numeric'
                placeholder='Enter your password'
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <Button title={'Go back'} onPress={login}/>
        </View>
    );
}

export default LoginPage;

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        padding: 5,
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius:10
    },
})
