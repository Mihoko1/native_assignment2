import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile</Text>
                {/* <Button
                    style={{color: '#d81b60'}}
                    title='SIGN OUT'
                    onPress={() => this.props.navigation.navigate('SignedOut')}
                /> */}
                <TouchableOpacity
                    
                    onPress={() => this.props.navigation.navigate('SignedOut')}
                    underlayColor='#fff'>
                    <Text style={{color: '#d81b60', fontSize: 20, fontWeight:'bold'}}>SIGN OUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Profile;