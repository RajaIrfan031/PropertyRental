import React, {Component} from 'react';
import {View,SafeAreaView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
      }
      componentDidMount = async () => {
        const token=await AsyncStorage.getItem('token')
        if (token !== null) {
          setTimeout(() => {
            this.props.navigation.replace('App');
          }, 2000);
        } else if (token === null) {
          setTimeout(() => {
            this.props.navigation.replace('AuthStack');
          }, 2000);
        }
      }
render(){
      return(
        <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}> 

        <View style={{paddingBottom: 100}}> 
          <ActivityIndicator  style={{width: 250, height: 250,}} />
        </View>
      </SafeAreaView>
      )
    }
}
export default AuthLoadingScreen