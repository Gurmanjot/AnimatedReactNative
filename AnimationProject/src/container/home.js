import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { Snackbar, BottomClick, Button } from '../components/animation';

import { food, travel, fun, fb, gmail, instagram, whatsapp, snapchat } from '../configs/images'


class Home extends React.Component {
 
 state={
   visibility:false
 }
  onButtonPress=()=>{
   this.setState({
     visibility:true
   })
  }

  animEndCallback = () => {
    this.setState({visibility: false});
  }
  
  render(){
    return (  
      <View style={{flex:1, backgroundColor:'#315b96', justifyContent:'center', alignItems:'center'}} >
           {
             this.state.visibility  && (
              <Snackbar animEndCallback={this.animEndCallback} duration={10000} >
              <Text style={{color:'white', fontSize:16, fontWeight:'500'}} numberOfLines={2}>Animation Challenge</Text>
            </Snackbar>
             )
           } 
         <Button  onButtonPress={this.onButtonPress}  title={'Press Me'} style={{backgroundColor:'#fd7792'}} />
        <BottomClick length={140} firstIcon={fb} secondIcon={snapchat} thirdIcon={instagram} onFirstIconPress={()=>alert('1')}  onSecondIconPress={()=>alert('2')} onThirdIconPress={()=>alert('3')} backgroundColor={'#fcb2bf'} iconColor={'white'} />
      </View>
  )}
}

export default Home

