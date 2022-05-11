import React,{Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthLoadingScreen from './src/screen/authloading';
import Login from './src/screen/Auth/login';
import Home from './src/screen/app/home';
import Signup from './src/screen/Auth/signup';
import Timeline from './src/screen/app/timeline';
import Addproperty from './src/screen/app/addproperty';
import Favorite from './src/screen/app/favorite';
import PropertyDetail from './src/screen/app/propertydetail';
const Stack = createStackNavigator();
const StackHome = createStackNavigator();
const StackApp = createStackNavigator();

export default class App extends Component{
  
  AuthStack = () => (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Signup'} component={Signup} />
    </Stack.Navigator>
  );

  AppStack = () => (
    <StackHome.Navigator initialRouteName={'Home'} screenOptions={{headerShown: false, headerShown: false}}>
      <StackHome.Screen name={'Home'} component={Home}/>
      <StackHome.Screen name={'Addproperty'} component={Addproperty}/>
      <StackHome.Screen name={'Timeline'} component={Timeline}/>
      <StackHome.Screen name={'Favorite'} component={Favorite}/>
      <StackHome.Screen name={'PropertyDetail'} component={PropertyDetail}/>
    </StackHome.Navigator>
);

render(){
  return(
    <NavigationContainer>
    <StackApp.Navigator
          initialRouteName="AuthLoading"
          screenOptions={{headerShown: false}}>        
      <StackApp.Screen name={'AuthLoading'} component={AuthLoadingScreen} />
      <StackApp.Screen name={'AuthStack'} component={this.AuthStack} />
      <StackApp.Screen name={'App'} component={this.AppStack} />
      </StackApp.Navigator>
    </NavigationContainer>
  )
}
}