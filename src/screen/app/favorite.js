import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite =()=>{

const[properties,setProperties]=useState('')
useEffect(()=>{
async function getfavorites(){
  const user=await AsyncStorage.getItem('token')
    const url =`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/favorites/${user}.json`
    await fetch(url).then((r)=> r.json()).then(
      (data)=> {
          if(data!==null){
          setProperties(data)
          }
      }
  )
}
getfavorites()
},[])


return(
        <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}> 
<View>
    <Text style={{fontSize: 20,color: 'black',marginHorizontal: 36,marginTop: 36,marginBottom: 24,}}>All property rentals in your searched area</Text>
  </View>
  {
    Object.keys(properties).length>0?
    Object.values(properties).map(({propertyname,id,location,url,detail})=>(
    <View>
    <TouchableOpacity key={id} style={{backgroundColor: '#C7CBD7',width: '90%',marginHorizontal: '5%',padding: 10,marginTop: 10,alignItems: 'center',borderRadius: 7}}>
          <Text style={{alignItems: 'center'}}>{propertyname}</Text>
          <Text>{location}</Text>
          <Text>{detail}</Text>
          <View style={{width: '90%',marginHorizontal: '5%'}}>
        <Image source={{uri: url}} style={{height: 160, width: '100%',resizeMode: 'contain',marginTop: 8}}/></View>
        </TouchableOpacity>
    </View>
    ))
    : <Text style={{fontSize: 20, alignSelf: 'center'}}> Nothing to show</Text>
  }
      </ScrollView>   
      )
}
export default Favorite
