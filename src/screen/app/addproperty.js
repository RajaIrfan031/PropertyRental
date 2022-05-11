import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text, TouchableOpacity,Image,TextInput,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const Addproperty =()=>{

  const[city,setCity]=useState('')
  const[store,setStorecity]=useState('')
  const[propertyName,setPropertyname]=useState('')
  const[propertyLocation,setPropertyLocation]=useState('')
  const[propertyDetail,setPropertyDetail]=useState('')
  const[selectedimage,setSelected]=useState('')

  const submitdata=()=>{
    const photo = {
        uri: selectedimage,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      
      const form = new FormData();
      form.append("ProfilePicture", photo);
      
      fetch(
        'https://api.cloudinary.com/v1_1/demo/image/upload',
        {
          body: form,
          method: "PUT",
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ).then((response) => response.json())
      .catch((error) => {
        //   console.log(error);
        // alert("ERROR " + error)
      })
      .then((responseData) => {
        //   console.log(responseData);
        // alert("Succes "+ responseData)
      }).done();
      postproperty()
  }


  useEffect(()=>{
    async function getcity() {
      const city= await AsyncStorage.getItem('city')
      if(city!==null){
        setStorecity(city)
      }
    }
    getcity()
  },[])

  const selectphoto=()=>{
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
          setSelected(image.path)
      });
  }
  const navigation=useNavigation()

const postproperty=async()=>{
  const cityid=store+Math.floor(Math.random() * 90 + 10)
  if(propertyName.length>0 &&  propertyDetail.length>0){
    await fetch(`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/properties/${store.toLowerCase()}/${cityid}.json`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: cityid,
            propertyname: propertyName,
            location: propertyLocation,
            detail: propertyDetail,
            url: 'https://www.greenbacktaxservices.com/wp-content/uploads/2020/07/Impact-rental-income-american-expat-taxes.jpg'
        })
    });
    Alert.alert(
        "Property Added",
        `your property is successfully added`,
        [
          {
            text: "Okay",
            onPress: () => {navigation.navigate('Home')},
            style: "cancel"
          },
        ]
      );
}else{
  Alert.alert(
    "Something went wrong",
    `your property could not be added`,
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
<Text style={{fontSize: 24,color: 'black',marginLeft: 36,marginTop: 16}}>Enter New Property</Text>
<TextInput style={{width: '80%',marginLeft: '10%',backgroundColor: 'white',marginTop: 16,borderRadius: 8,height: 40,paddingLeft: 8}} placeholder="Enter Property Name"onChangeText={(name)=>setPropertyname(name)} value={propertyName}/>
<TextInput style={{width: '80%',marginLeft: '10%',backgroundColor: 'white',marginTop: 16,borderRadius: 8,height: 40,paddingLeft: 8}} placeholder="Enter Property Location" value={store} onChangeText={(location)=>setPropertyLocation(location)}/>
<TextInput style={{width: '80%',marginLeft: '10%',backgroundColor: 'white',marginTop: 16,borderRadius: 8,height: 40,paddingLeft: 8}} placeholder="Enter Property Details" value={propertyDetail} onChangeText={(detail)=>setPropertyDetail(detail)}/>
<View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
<TouchableOpacity onPress={()=>{selectphoto()}} style={{backgroundColor: '#0075FF',height: 40,width: 120,alignItems:'center',justifyContent:'center',marginTop:16,borderRadius:8,}}><Text style={{color:'white'}}>Select Photo</Text></TouchableOpacity>
</View>
{
    selectedimage.length>0?
    <View style={{alignItems:'center',marginTop:18, width:'80%',marginHorizontal:'10%'}}><Image style={{width: '100%', height: 200,resizeMode:'contain'}} source={{uri: selectedimage}}/>
    </View>
    : null
}
<View style={{alignItems:'center'}}>
<TouchableOpacity onPress={()=>{submitdata()}} style={{backgroundColor: '#0075FF',height: 40,width: 100,alignItems:'center',justifyContent:'center',marginLeft:10,borderRadius:8,marginTop:24,marginLeft:'10%'}}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity>
</View>
</View>
      </ScrollView>
      
      )
}
export default Addproperty