import React from 'react';
import { View, Text } from 'react-native';
import { onSignIn } from '../auth';
import { Card, Button, Input } from 'react-native-elements';

class SignUp extends React.Component {
    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card title="hoge">
                    <Input
                        label="Email"
                        autoCapitalize = 'none'
                    />
                    <Input
                        label="Password"
                        labelStyle={{ marginTop: 10 }}
                        secureTextEntry
                    />
                    <Input
                        label="ComfirmPassword"
                        labelStyle={{ marginTop: 10 }}
                        secureTextEntry
                    />
                    <Button
                        title='SIGN UP'
                        onPress={() => onSignIn().then(() => this.props.navigation.navigate('SignedIn'))}
                        buttonStyle={{ marginTop: 20, backgroundColor:'#03A9F4', borderRadius: 10 }}
                    />
                    <Button
                        title='LOG IN'
                        onPress={() => this.props.navigation.navigate('Login')}
                        buttonStyle={{ marginTop: 40, borderRadius: 10 }}
                    />
                </Card>
            </View>
        );
    }
}

export default SignUp;