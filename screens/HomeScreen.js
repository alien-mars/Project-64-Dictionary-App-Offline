import * as React from 'react';
import {Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Image} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dictionary from '../database';

export default class HomeScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            text : "",
            isSearchPressed : false,
            word : "",
            lexicalCategory : "",
            examples : [],
            definition : ""
        }
    }

    getWord = (text) => {
        var text = text.toLowerCase();
        try{
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var definition = dictionary[text]["definition"]
            this.setState({
                word : word,
                lexicalCategory : lexicalCategory,
                definition : definition
            })
        }
        catch(err){
            this.setState({
                word : text,
                text : '',
                lexicalCategory : "Not Found",
                definition : "Not Found"
            })
            alert("Sorry, this word is not available for now!"); 
        }
    }

  render() {
    return (
     
      <View style={styles.container}>

        <SafeAreaProvider>
        <Header
          backgroundColor={'#004A7F'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        </SafeAreaProvider>

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://store-images.s-microsoft.com/image/apps.49568.9007199266244944.b606ead2-e192-4b16-b2c5-b5d3bbf2cf91.b79176e6-44fd-4a8d-a5c1-dc57d071e238',
          }}
        />

        

      <TextInput
      style = {styles.inputBox}
      onChangeText={text => {
          this.setState({
              text : text,
              isSearchPressed : false,
              word : "Loading...",
              lexicalCategory : "",
              examples : [],
              definition : ""
          });
      }}
      value = {this.state.text}
      />

      <TouchableOpacity style={styles.searchButton}
      onPress = { ()=> {
          this.setState({ 
            isSearchPressed : true, 
            });
          this.getWord(this.state.text)
      }}>
      <Text style={{color:"#fff",fontWeight:"bold"}}>Seach</Text>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>
      Word : {""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.word}
      </Text>
      </View>

      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>
      Type : {""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.lexicalCategory}
      </Text>
      </View>

      <View style={{margin:10,flexDirection : 'row',flexWrap : 'wrap'}}>
      <Text style={styles.detailsTitle}>
      Definition : {""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.definition}
      </Text>
      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
 container: {
    backgroundColor : '#fff'
  },
  inputBox:{
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    outline: 'none',
  },
  searchButton:{
    width: '10%',
    height: 30,
    alignSelf: 'center',
    justifyContent : 'center',
    alignItems : 'center',
    margin: 10,
    borderWidth : 2,
    backgroundColor : '#004A7F'
  },
  detailsContainer:{
      margin : 10
  },
  detailsTitle:{
      fontSize : 20,
      color : "#004A7F"
  },
  imageIcon: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems : 'center',
    alignSelf: 'center',
    marginTop:20
  }
});
