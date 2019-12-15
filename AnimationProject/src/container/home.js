import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { Snackbar, BottomClick, Button } from '../components/animation';

import { food, travel, fun, fb, gmail, instagram, whatsapp, snapchat } from '../configs/images'


const Home = () => {
 
  const [visible, changeVisibility] = useState(false)
  
  onButtonPress=()=>{
    changeVisibility(!visible)
  }
  
  return (  
      <View style={{flex:1, backgroundColor:'#35477d', justifyContent:'center', alignItems:'center'}} >
         {
            visible && (<Snackbar>
                <Text style={{color:'white', fontSize:16, fontWeight:'500'}} numberOfLines={2} >Animation Challenge</Text>
              </Snackbar>
              )
         } 
         <Button  onButtonPress={this.onButtonPress}  title={'Press Me'} style={{backgroundColor:'#4d80e4'}} />
        <BottomClick length={140} firstIcon={fb} secondIcon={snapchat} thirdIcon={instagram} onFirstIconPress={()=>alert('1')}  onSecondIconPress={()=>alert('2')} onThirdIconPress={()=>alert('3')} backgroundColor={'#ffc6c7'} iconColor={'white'} />
      </View>
  )
}

export default Home

