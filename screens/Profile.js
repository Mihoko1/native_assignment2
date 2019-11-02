import React from 'react';
import { View, Text, Button } from 'react-native';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile</Text>
                <Button
                    title='SIGN OUT'
                    onPress={() => this.props.navigation.navigate('SignedOut')}
                />
            </View>
        );
    }
}

export default Profile;