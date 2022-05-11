import React, {useEffect,useState} from 'react';
import {View,SafeAreaView, Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login =()=>{


const navigation=useNavigation()
const [phone,setPhone]=useState('')
const [pass,setPass]=useState('')

  const signin=async()=>{
    const url =`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/users/${phone}.json`
    await fetch(url).then((r)=> r.json()).then(
      (data)=> {
          if(data!==null){
            if(data.pass===pass){
              AsyncStorage.setItem('token',phone)
              navigation.replace('App')
            }
          }
          else{
            Alert.alert(
              "Invalid details",
              `no such account was found`,
              [
                {
                  text: "Okay",
                  onPress: () => {},
                  style: "cancel"
                },
              ]
            );
          }
      }
  )
  
    // AsyncStorage.setItem('token','asjdkflals;kjfd')
    // navigation.replace('App')
  }
      return(
        <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#C7CBD7',
        }}> 

<View style={{backgroundColor:'#687089',height: 60,alignItems:'center',justifyContent:'center'}}>
    <Text style={{color:'white',fontWeight:'600',fontSize:24}}>Login</Text>
</View>
        <View style={{paddingBottom: 100,flex: 0.2,justifyContent: 'flex-end',alignItems: 'center'}}> 
      <Text style={{fontSize: 24,fontWeight: '600',}}>Property Rental System</Text>
        </View>
        <View style={{flex: 0.8}}>
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Phone" value={phone} onChangeText={(phone)=>{setPhone(phone)}}/>
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Confirm password" value={pass} onChangeText={(pass)=>{setPass(pass)}}/>
        <View style={{alignItems:'center'}}>
        < TouchableOpacity onPress={()=>{signin()}} style={{marginTop: 24,alignItems:'center',width: 100,backgroundColor: '#687089',padding: 16,borderRadius: 16}}><Text style={{color: 'white',fontWeight: '600'}}>Sign in</Text></TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop: 8}}>
          <Text style={{marginTop: 7,fontSize: 16}}>Don't have an account?   </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}><Text style={{fontSize: 20,fontWeight:'bold',color:'black',textDecorationLine:'underline'}}>Signup</Text></TouchableOpacity>
        </View>
    </View>
      </SafeAreaView>
      )

}
export default Login
