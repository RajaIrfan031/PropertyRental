import React, {useEffect,useState} from 'react';
import {View,ScrollView, Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup =()=>{

  const navigation=useNavigation()

    const[first,setFirst]=useState('')
    const[last,setLast]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmpassword,setConfirm]=useState('')
    const[phone,setPhone]=useState('')


    const submit=async()=>{
      //navigation.navigate('Login')
      if(first.length>0 && last.length>0 &&password.length>0 && confirmpassword.length>0 && phone.length>0){
        await fetch(`https://property-340cc-default-rtdb.firebaseio.com/propertyrental/users/${phone}.json`, {
         method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                "id": email,
                "phone": phone,
                "first": first,
                "last": last,
                "pass": password
            }
            ),///
        }).then((response) => response.json())
        .then((responseJson) => {
          AsyncStorage.setItem('token',phone)
          navigation.replace('App')
          console.log('response object:',responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
        Alert.alert(
        "Account created",
        `your account was created successfully`,
        [
          {
            text: "Okay",
            onPress: () => {},
            style: "cancel"
          },
        ]
      );
      // }
      // Alert.alert(
      //   "Check Password",
      //   `Password should be same and length should be graeter or equal to 6`,
      //   [
      //     {
      //       text: "Okay",
      //       onPress: () => {},
      //       style: "cancel"
      //     },
      //   ]
      // );
    }
    else{
      Alert.alert(
        "Enter all details",
        `No field should be left empty`,
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
          backgroundColor: '#C7CBD7',
        }}> 
<View style={{backgroundColor:'#687089',height: 60,alignItems:'center',justifyContent:'center'}}>
    <Text style={{color:'white',fontWeight:'600',fontSize:24}}>Sign up</Text>
</View>



        <View style={{paddingBottom: 60,flex: 0.2,justifyContent: 'flex-end',alignItems: 'center'}}> 
        {/* <TextInput
        style={{}}
        // onChangeText={onChangeNumber}
        value={number}
        placeholder="First name"
      /> */}
      <Text style={{fontSize: 24,fontWeight: '600',marginTop: 66}}>Property Rental System</Text>
        </View>
        <View style={{flex: 0.8}}>
        <View style={{flexDirection: 'row',}}>
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', width: 140,borderRadius: 4,marginLeft: '10%'}} placeholder="First name" value={first} onChangeText={(text)=>{setFirst(text)}} />
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', width: 130,borderRadius: 4,marginLeft: 20}} placeholder="Last name" value={last} onChangeText={(text)=>{setLast(text)}} />
        </View>
        {/* <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Email" value={email} onChangeText={(text)=>{setEmail(text)}}/> */}
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Password" value={password} onChangeText={(text)=>{setPassword(text)}}/>
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Confirm" value={confirmpassword} onChangeText={(text)=>{setConfirm(text)}}/>
        <TextInput style={{paddingLeft: 8,backgroundColor: 'white', borderRadius: 4,marginHorizontal: '10%',marginTop: 16}} placeholder="Phone number" value={phone} onChangeText={(text)=>{setPhone(text)}} />
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{submit()}} style={{marginTop: 24,alignItems:'center',width: 100,backgroundColor: '#007AFF',padding: 16,borderRadius: 16}}><Text style={{color: 'white',fontWeight: '600'}}>Submit</Text></TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop: 8}}>
          <Text style={{marginTop: 7,fontSize: 16}}>Already have an account?   </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}><Text style={{fontSize: 20,fontWeight:'bold',color:'black',textDecorationLine:'underline'}}>Login</Text></TouchableOpacity>
        </View>
    </View>
      </ScrollView>
      )

}
export default Signup
