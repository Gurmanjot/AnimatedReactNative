import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { Snackbar, BottomClick, Button } from '../components/animation';

import { food, travel, fun } from '../configs/images'


const Home = () => {

  const [visible, changeVisibility] = useState(false)
  
  onButtonPress=()=>{
    changeVisibility(!visible)
  }
  
  return (  
      <View style={{flex:1, backgroundColor:'#fd7792', justifyContent:'center', alignItems:'center'}} >
         {
            visible && (<Snackbar>
                <Text style={{color:'white', fontSize:16, fontWeight:'500'}} numberOfLines={2} >Animation Challenge</Text>
              </Snackbar>
              )
         } 
         <Button  onButtonPress={this.onButtonPress}  title={'Press Me'} style={{backgroundColor:'#55ae95'}} />
        <BottomClick length={140} firstIcon={fun} secondIcon={food} thirdIcon={travel} onFirstIconPress={()=>alert('1')}  onSecondIconPress={()=>alert('2')} onThirdIconPress={()=>alert('3')} backgroundColor={'#fb5b5a'} iconColor={'white'} />
      </View>
  )
}

export default Home

