import React, {Component} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'


export default class Head extends Component {

    constructor(props) {
        super(props);
        this.state = {
          //defauilt value of the date time
          date: '',
        };
      }

      static navigationOptions = {
        title: 'Hi Miho',
        //Sets Header text of Status Bar
        headerStyle: {
          backgroundColor: '#f4511e',
          //Sets Header color
        },
        headerTintColor: '#fff',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
      };
      componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth(); //Current Month
        var year = new Date().getFullYear(); //Current Year
        var day = new Date().getDay();
        
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"];
        // var hours = new Date().getHours(); //Current Hours
        // var min = new Date().getMinutes(); //Current Minutes
        // var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
          day: dayNames[day]
          ,
          date:
          monthNames[month] + ' ' +date+ ', ' + year + ' ' 
        });
      }
    
  render(){
    return (
 
        <View style={styles.HeadTop}>
            <Text
            style={styles.day}>
            {this.state.day}
          </Text>
          <Text
            style={styles.today}>
            {this.state.date}
          </Text>
        </View>
 

          




    );
  }
}

const styles = StyleSheet.create({
    HeadTop: {
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    today:{
        fontSize: 20,
        marginTop: 16,
        color: '#fff',
    },
    day:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'pink',
    }
  });

