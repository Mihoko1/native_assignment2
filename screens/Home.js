import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TextInput,TouchableOpacity, Alert, ScrollView} from 'react-native';
import firebase from '../firebase';
import Head from '../components/Head';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class Home extends Component{

  static navigationOptions = ()=>({
    title: 'Hi Miho!',
    headerStyle: {
      backgroundColor: '#3a2995',
      
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  

  todoDatabase = firebase.database().ref('todos');
  state = {todos: {}, selectedId: '', checked: false, done: false, colorVal:'black'}

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

    this.todoDatabase.on('value', todos=> {
      const todosJSON = todos.val();
      this.setState({ todos: todosJSON === null ? {} : todosJSON});
    })
    
  }

  create(payload){
    console.log(payload);
    if(payload == null){
      return;
    }

    this.todoDatabase.push({task: payload});

  }

  update(payload, state){
    console.log("payload:"+ payload.todoId);
    console.log("done"+ state);

    if(!this.state.done){
 
      this.todoDatabase.child(payload.todoId).update({done: true});
      this.setState({done: true})
      console.log("donefalse:"+ this.state.done);
    }else{
 
      this.todoDatabase.child(payload.todoId).update({done: false});
      this.setState({done: false})
      console.log("doneTrue:"+ this.state.done);
    }
      this.setState({selectedId: ''})
  }

  deleteList(payload){
    if(this.state.selectedId ===''){
        return;
    }
    this.todoDatabase.child(this.state.selectedId).remove();
    this.setState({selectedId : ''})
  }

  render(){
    return(
      <View style = {styles.container}>
          <Head />
          <ScrollView style={styles.scrollContainer}>

            {
              Object.keys(this.state.todos).map((todoId, index) =>

              <View key={index}  style={styles.listBox} >

                <View style={styles.checkList}>
                  {
                    (JSON.stringify(this.state.todos[todoId].done) !== 'false' ) ? (
                      <React.Fragment>
                        <Text style={styles.todoText, {color: 'black', width: width - 120}}>{
                              `${JSON.stringify(this.state.todos[todoId].task).slice(1, -1)}`
                        }</Text> 

                        <View style={styles.btnContainer}>
                        <TouchableOpacity
                          style={styles.doneBtn}
                          onPress={() => {
                            this.setState({
                                done:this.state.done
                              }),
                              this.update({todoId})} 
                          }
                          underlayColor='#fff'>
                          
                            <Image style={styles.imagestyle} source={require('../assets/check.png')} />
                          
                          {/* <Text style={styles.btnText}>Done</Text> */}
                        </TouchableOpacity>
    
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => {
                            this.setState({
                                isChecked:!this.state.isChecked,
                                selectedId: todoId
                              }),
                              this.showConfirmAlert()} 
                          }
                          underlayColor='#fff'>
                          <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      </React.Fragment>

                    ):(
                      <React.Fragment>
                          <Text style={styles.todoText, {color: '#bebebe', width: width - 120}}>{
                            `${JSON.stringify(this.state.todos[todoId].task).slice(1, -1)}`
                        }</Text> 

                        <View style={styles.btnContainer}>
                        <TouchableOpacity
                          style={styles.doneBtn}
                          onPress={() => {
                            this.setState({
                                done:this.state.done
                              }),
                              this.update({todoId})} 
                          }
                          underlayColor='#fff'>
                          
                            <Image style={styles.imagestyle} source={require('../assets/checked.png')} />
                          
                          {/* <Text style={styles.btnText}>Done</Text> */}
                        </TouchableOpacity>
    
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => {
                            this.setState({
                                isChecked:!this.state.isChecked,
                                selectedId: todoId
                              }),
                              this.showConfirmAlert()} 
                          }
                          underlayColor='#fff'>
                          <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </React.Fragment>
                    )
                  }
                    
                 
                </View>
              </View>
              )
            }
          </ScrollView>
        
          <View style={styles.bottomContainer}>
            <View style={styles.inputContainer}>
                <View>
                    <TextInput
                    placeholder="Create new list"
                    style={styles.createListInput}
                    onChangeText={(color) => this.setState({color})}
                  
                    />
                </View>
                <TouchableOpacity
                      style={styles.listInline}
                      onPress={() => this.create(this.state.color)}
                      underlayColor='#fff'>
                      <Text style={styles.btnText}>Create</Text>
                    </TouchableOpacity>
               
            </View>
          </View>
      </View>
    )
  }
 }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      
    },
    scrollContainer:{
        height: -100,
        width: '100%',
    },

    textInput: {
        backgroundColor: '#ddca6c',
        height: 30,
        width: '100%',
    },
    bottomContainer:{
      backgroundColor: '#93c8f2',
      borderStyle: "solid",
      height: 85,
      width: width,
      alignItems: 'center',
    },
    createListInput: {
        backgroundColor: '#fff',
        borderStyle: "solid",
        borderColor: '#3a2995',
        height: 50,
        width: width - 100,
        paddingLeft: 10,     
    },
    todoText: {
        textAlignVertical: 'center',
    },
    box: {
        width: '100%',
        height: 30,
        backgroundColor: '#ddca6c',
        top: 0
    },
    listBox: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 30,
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
      backgroundColor: '#3a2995',
      tintColor: '#fff',
      flex: 1, 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listInline:{
      color: '#fff',
    },
    btnContainer:{
      marginTop: 5,
      marginBottom: 5,
      alignItems: 'center',
    },

    deleteBtn:{
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#d81b60',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    doneBtn:{
      marginBottom: 5,
      paddingTop:10,
      paddingBottom:10,
      // backgroundColor:'#3a2995',
      // borderRadius:10,
      // borderWidth: 1,
      // borderColor: '#fff'
    },
    btnText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
    }
});



