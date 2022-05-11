import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity,Image,TextInput,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home =()=>{

  const[city,setCity]=useState('')
  const[store,setStorecity]=useState('')
  useEffect(()=>{
    
    getcity()
  },[])

  const getcity=async()=>{
    const city= await AsyncStorage.getItem('city')
    console.log("asdf ",city);
    if(city!==null){
      setStorecity(city)
    }
  }

  const storecity=async()=>{
    await AsyncStorage.setItem('city',city)
    getcity()
  }

  const logout=async()=>{
    Alert.alert(
      "Logout?",
      `do you want to logout?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style:"cancel"
          },
        {
          text: "Okay",
          onPress: () => {confirm()},
          style: "destructive"
        },
      ]
    );
  }

  const confirm=async()=>{
    console.log("confirm");
    await AsyncStorage.clear()
    navigation.replace("AuthStack")
  }

  const navigation=useNavigation()
      return(
        <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}> 
<View style={{flex: 0.3}}>
  <View>
    <Image source={require('../../../src/male.jpg')} style={{height: 120, width: '100%',resizeMode: 'contain'}}/>
    </View>  
    <Text style={{fontSize: 20,color: 'black',marginLeft: 36}}>Musa Nayem</Text>
    <Text style={{fontSize: 14,color: 'black',marginLeft: 36,marginBottom:8}}>{store}</Text>
</View>
<View style={{flex: 0.7,backgroundColor: '#C7CBD7',paddingBottom: 164}}>
  <View style={{flexDirection: 'row'}}>
  <TextInput style={{width: '60%',marginLeft: '10%',backgroundColor: 'white',marginTop: 16,borderRadius: 8,height: 40,paddingLeft: 8}} placeholder="Enter Location" value={city} onChangeText={(city)=>setCity(city)}/>
  <TouchableOpacity onPress={()=>{storecity()}} style={{backgroundColor: '#0075FF',height: 40,width: 70,alignItems:'center',justifyContent:'center',marginLeft:10,marginTop:16,borderRadius:8}}><Text style={{color:'white'}}>Enter</Text></TouchableOpacity>
  </View>
  <TouchableOpacity onPress={()=>{navigation.navigate('Addproperty')}} style={{backgroundColor: '#0075FF',height: 60,width: 180,alignItems:'center',justifyContent:'center',marginLeft:10,borderRadius:8,marginTop:24,marginLeft:'10%'}}><Text style={{color:'white'}}>Add Property</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>{navigation.navigate('Timeline')}} style={{backgroundColor: '#0075FF',height: 60,width: 180,alignItems:'center',justifyContent:'center',marginLeft:10,borderRadius:8,marginTop:24,marginLeft:'10%'}}><Text style={{color:'white'}}>Timeline</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>{navigation.navigate('Favorite')}} style={{backgroundColor: '#0075FF',height: 60,width: 180,alignItems:'center',justifyContent:'center',marginLeft:10,borderRadius:8,marginTop:24,marginLeft:'10%'}}><Text style={{color:'white'}}>My Favourite</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>{logout()}} style={{backgroundColor: '#0075FF',height: 60,width: 180,alignItems:'center',justifyContent:'center',marginLeft:10,borderRadius:8,marginTop:24,marginLeft:'10%'}}><Text style={{color:'white'}}>Logout</Text></TouchableOpacity>
</View>
      </ScrollView>
      
      )
}
export default Home
