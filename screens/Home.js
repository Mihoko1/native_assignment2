import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Button, Alert, ScrollView, ListView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import firebase from '../firebase';
import Swipeout from 'react-native-swipeout';
import Head from '../components/Head';
import { AuthSession } from 'expo';
import { Ionicons } from '@expo/vector-icons';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');



export default class Home extends Component{


  todoDatabase = firebase.database().ref('todos');
  state = {todos: {}, selectedId: '', checked: false, done: false, colorVal:'black'}

  handleOnChange(val) {
    this.setState({ checked: val })
  }

  showConfirmAlert() {
    Alert.alert(
      'Delete?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {this.deleteList()}},
      ],
      { cancelable: false }
    )
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
                      onPress: () => {this.deleteList(this.state.selectedId)}
                  
                      
                    }
                  ],
                  { cancelable: false }
                );
              }
          
        }
      ]
    this.todoDatabase.on('value', todos=> {
      const todosJSON = todos.val();
      this.setState({ todos: todosJSON === null ? {} : todosJSON});
    })
    
  }

  create(payload){
    console.log(payload);
    this.todoDatabase.push({task: payload});
  }

  update(payload, state){
    console.log("payload:"+ payload.todoId);
    console.log("done"+ this.state.done);

    if(!this.state.done){
      // this.setState({colorVal:'gray'})
      this.todoDatabase.child(payload.todoId).update({done: true});
      console.log("done"+ this.state.done);
    }else{
      // this.setState({colorVal:'black'})
      this.todoDatabase.child(payload.todoId).update({done: false});
    }
      // this.todoDatabase.child(payload.todoId).set({color: 'blue'});
      this.setState({selectedId: ''})
      console.log("done2"+ this.state.done);

  }

  deleteList(payload){
    if(this.state.selectedId ===''){
        return;
    }
    console.log("selectedId"+ payload);
    this.todoDatabase.child(this.state.selectedId).remove();
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
                Object.keys(this.state.todos).map((todoId, index) =>

                
                
                //   <TouchableOpacity key={index} onPress= {() => this.setState({ selectedId: todoId})}>

                //     <Text>{
                //        `${todoId}: ${JSON.stringify(this.state.todos[todoId])}`
                        
                //         }</Text>
                //   </TouchableOpacity>

                
                    <Swipeout key={index} right={swipeoutBtns} style={styles.swipeBox} >
                       
                        <View 
                        style={styles.checkList}>
                          <CheckBox
                            
                            textColor="#000"
                            fillColor="red"
                            value={index}
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked})}
                          />
                         
                         

                            <Text style={styles.text, {color: this.state.colorVal}}>{
                                `${JSON.stringify(this.state.todos[todoId].task).slice(1, -1)}`
                            }</Text> 

                          
                            {/* <Button title="AAA"
                              style={{flex: 1, padding: 10}}
                              onPress={()=>{
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    selectedId: todoId
                                  }),
                                  this.deleteList(todoId)} 
                            
                              }
                              isChecked={this.state.isChecked}
                              /> */}

                     
                            <Button
                              onPress={() => {
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    selectedId: todoId
                                  }),
                                  this.showConfirmAlert()} 
                            
                              }
                              title="Delete"
                              color="#841584"
                              accessibilityLabel="Delete?"
                            />
                            <Button
                              onPress={() => {
                                this.setState({

                                    done:this.state.done
                                  }),
                                  this.update({todoId})} 
                            
                              }
                              title="Update"
                              color="#841584"
                              
                            />

                              
                            <Ionicons name="md-checkmark-circle" size={32} color="green" onPress={() => this.update(todoId)} />
                           {/* <Button title="updateTest"  onPress={() => {
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    selectedId: this.state.selectedId
                                  }),
                                  this.update()} 
                            
                              }
                            /> */}

                        </View>
                       
                    </Swipeout>
                )
            }

</ScrollView>
        
        

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
     
      {/* <Text>{JSON.stringify(this.state.todos)}</Text> */}
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



