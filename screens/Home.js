
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert, ScrollView, ListView} from 'react-native';
import CheckBox from 'react-native-check-box';
import firebase from '../firebase';
import Swipeout from 'react-native-swipeout';
import Head from '../components/Head';
import { AuthSession } from 'expo';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');



export default class Home extends Component{


  carDatabase = firebase.database().ref('cars');
  state = {cars: {}, selectedID: '', color: 'yellow', checked: false}

  handleOnChange(val) {
    this.setState({ checked: val })
  }
  

  componentDidMount(){


    swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          

              onPress: () => {
                Alert.alert(
                  "Delete？",
                  "",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    {
                      text: "Delete",
                      onPress: () => {this.deleteCar(this.state.selectedID)}
                  
                      
                    }
                  ],
                  { cancelable: false }
                );
              }
          
        }
      ]
    this.carDatabase.on('value', cars=> {
      const carsJSON = cars.val();
      this.setState({ cars: carsJSON === null ? {} : carsJSON});
    })
    
  }

  create(payload){
    console.log(payload);
    this.carDatabase.push({color: payload});
  }

  update(id, payload){
      this.carDatabase.child(this.state.selectedId).set({color: 'blue'});
      this.setState({selectedId: ''})

  }

  deleteCar(payload){
    if(this.state.selectedId ===''){
        return;
    }
    console.log("selectedID"+ this.state.selectedId);
    this.carDatabase.child(this.state.selectedId).remove();
    this.setState({selectedId : ''})
  
  }

render(){

    
  return(
    <View style = {styles.container}>
        <Head />
        <ScrollView style={styles.scrollContainer}>

                
                {/* <TextInput style={styles.textInput} value={this.state.selectedId}></TextInput>
             */}
                
                {
                Object.keys(this.state.cars).map((carsId, index) =>

                
                
                //   <TouchableOpacity key={index} onPress= {() => this.setState({ selectedId: carsId})}>

                //     <Text>{
                //        `${carsId}: ${JSON.stringify(this.state.cars[carsId])}`
                        
                //         }</Text>
                //   </TouchableOpacity>

                
                    <Swipeout key={index} right={swipeoutBtns} style={styles.swipeBox} >
                        <View selectedId= {this.state.carsId}
                        style={styles.checkList}>
                            <Text style={styles.text}>{
                                `${JSON.stringify(this.state.cars[carsId].color).slice(1, -1)}`
                            }</Text>
                            <CheckBox
                              style={{flex: 1, padding: 10}}
                              onClick={()=>{
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    selectedId: carsId
                                  })
                              }}
                              isChecked={this.state.isChecked}
                             
                              
                          />
                           <Button title="Delete" onPress={() => 
                           
                            this.deleteCar({carsId})}></Button>

                        </View>
                       
                    </Swipeout>
                )
            }

</ScrollView>
        
        <Button title="Update" onPress={() => this.update()}></Button>
        

      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
            <View style={styles.listInline}>
                <TextInput
                placeholder="Create new list"
                style={styles.createListInput}
                onChangeText={(color) => this.setState({color})}
               
                />
            </View>

            <Button style={styles.listInline} title="Create" onPress={() => this.create(this.state.color)}></Button>
        </View>
      </View>
     
      {/* <Text>{JSON.stringify(this.state.cars)}</Text> */}
    </View>
  )
}


 }

//  interface DeleteButtonProps {
//     onPress: () => void;
//   }
  
  // const DeleteButton = (props: DeleteButtonProps) => (
  //   <TouchableOpacity onPress={props.onPress}>
  //     <View
  //       style={{
         
  //         justifyContent: "center",
  //         alignItems: "center",
  
          
  //       }}
  //     >
        
  //     </View>
  //     <Text style={styles.deleteBtn, { color: "white", fontWeight: "bold" }}>Delete</Text>
  //   </TouchableOpacity>
  // );

const styles = StyleSheet.create({
    scrollContainer:{
        height: -100,
        width: '100%',
    },
    textInput: {
        backgroundColor: 'green',
        height: 30,
        width: '100%',
    },
    bottomContainer:{
      backgroundColor: 'black',
      borderStyle: "solid",
      height: 80,
      width: width,
      alignItems: 'center',
    },
    createListInput: {
        backgroundColor: 'white',
        borderStyle: "solid",
        borderColor: 'pink',
        height: 50,
        
        width: width - 100,
        
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
    },
    text: {
        fontSize: 18,
        textAlignVertical: 'center'

    },
    box: {
        width: '100%',
        height: 30,
        backgroundColor: 'green',
        top: 0
    },
    swipeBox: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
      paddingRight:10,

        
    },
    checkList:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    inputContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'pink',
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});



