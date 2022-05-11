import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity,Image,Alert} from 'react-native';
import {
  shareOnTwitter,
} from 'react-native-social-share';

const PropertyDetail =({route})=>{

const[properties,setProperties]=useState('')
const[storedToken,setStoredToken]=useState('')
const id=route.params.id
const name=route.params.name
const location=route.params.location
const detail=route.params.detail
const url=route.params.url

useEffect(()=>{
    async function getToken(){
    const token = await AsyncStorage.getItem('token')
    setStoredToken(token)
    }
    getToken()
})

const addfavorite=async()=>{
    await fetch(`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/favorites/${storedToken}.json`, {
        method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(
             {
               "id": id,
               "name": name,
               "location": location,
               "detail": detail,
               "url": url
           }
           ),///
       }).then((response) => response.json())
       .then((responseJson) => {         
         console.log('response object:',responseJson)
       })
       .catch((error) => {
         console.error(error);
       });
       Alert.alert(
       "Favorite Added",
       `this property is successfully added in your favorite`,
       [
         {
           text: "Okay",
           onPress: () => {},
           style: "cancel"
         },
       ]
     );
}

const shareproperty=()=>{
  shareOnTwitter({
    'text': "Name of property is: "+ name +"\n and it is located at: "+ location+" \n"+detail,
    'imagelink':url,
  },
  (results) => {
    console.log(results);
  }
);
}

return(
<ScrollView
style={{
    flex: 1,
    backgroundColor: '#fff',
        }}> 
<View>
    <Text style={{fontSize: 20,color: 'black',marginHorizontal: 36,marginTop: 36,marginBottom: 24,justifyContent: 'center',alignItems: 'center'}}>{name}</Text>
  </View>
    <View>
    <View onPress={()=>{}} key={id} style={{backgroundColor: '#C7CBD7',width: '90%',marginHorizontal: '5%',padding: 10,marginTop: 10,alignItems: 'center',borderRadius: 7}}>
          <Text style={{alignItems: 'center',fontSize: 20}}>{name}</Text>
          <Text style={{fontSize: 24}}>{location}</Text>
          <Text>{detail}</Text>
          <View style={{width: '90%',marginHorizontal: '5%'}}>
        <Image source={{uri: url}} style={{height: 160, width: '100%',resizeMode: 'contain',marginTop: 8}}/></View>
        <TouchableOpacity onPress={()=>{addfavorite()}} style={{backgroundColor: '#0075FF',padding: 12,marginTop: 16,borderRadius: 4,}}><Text style={{color: 'white',fontWeight: '600'}}>Add to Favorite</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{shareproperty()}} style={{backgroundColor: '#0075FF',padding: 12,marginTop: 16,borderRadius: 4,}}><Text style={{color: 'white',fontWeight: '600'}}>Share with Others</Text></TouchableOpacity>
        </View>
    </View>
      </ScrollView>   
      )
}
export default PropertyDetail
