import React from 'react';
import { View, Text, Button } from 'react-native';

class Login extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>SignIn</Text>
                <Button
                    title='SIGN IN'
                    onPress={() => this.props.navigation.navigate('SignedIn')}
                />
            </View>
        );
    }
}

export default Login;