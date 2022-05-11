import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Timeline =()=>{

  const navigation=useNavigation()
const[properties,setProperties]=useState('')
const[store,setStore]=useState('')
useEffect(()=>{
async function getcity(){
  const city=await AsyncStorage.getItem('city')
  if(city!=null){
    setStore(city)
    getproperties(city)
  }
}
getcity()
},[])

const showproperty=()=>{

}

const getproperties=async(city)=>{
  console.log(city.toLowerCase());
  const url =`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/properties/${city.toLowerCase()}.json`
  await fetch(url).then((r)=> r.json()).then(
    (data)=> {
        if(data!==null){
        setProperties(data)
        }
    }
)
}
      return(
        <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}> 
<View>
    <Text style={{fontSize: 20,color: 'black',marginHorizontal: 36,marginTop: 36,marginBottom: 24,}}>Showing all property rentals available in {store}</Text>
  </View>
  {
    Object.keys(properties).length>0?
    Object.values(properties).map(({propertyname,id,location,url,detail})=>(
    <View>
    <TouchableOpacity onPress={()=>{navigation.navigate('PropertyDetail',{name:propertyname, id:id,location:location,url:url,detail:detail})  }} key={id} style={{backgroundColor: '#C7CBD7',width: '90%',marginHorizontal: '5%',padding: 10,marginTop: 10,alignItems: 'center',borderRadius: 7}}>
          <Text style={{alignItems: 'center'}}>{propertyname}</Text>
          <Text>{location}</Text>
          <Text>{detail}</Text>
          <View style={{width: '90%',marginHorizontal: '5%'}}>
        <Image source={{uri: url}} style={{height: 160, width: '100%',resizeMode: 'contain',marginTop: 8}}/></View>
        </TouchableOpacity>
    </View>
    ))
    : <Text>noHello</Text>
  }
      </ScrollView>   
      )
}
export default Timeline
