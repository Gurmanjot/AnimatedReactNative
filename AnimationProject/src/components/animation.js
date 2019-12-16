import React from 'react'
import {View, Text, Animated, TouchableWithoutFeedback, Platform, Dimensions, Image, TouchableOpacity, Easing} from 'react-native'
import {get} from 'lodash'
import { dots, food, travel, fun } from '../configs/images'
 
const {height, width} = Dimensions.get('window')

 const isIphoneX = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812 || (height === 896 ||width === 896))
 const BOTTOM_SAFEAREA_HEIGHT = Platform.OS === 'ios' ? (isIphoneX ? 34 : 0) : 0


/**
 * duration:    time for which u want the snackbar to show
 * positionTop: margin from Top 
 * height:      height of snackbar
 * width:       width of snackbar
 * animEndCallback: called when animation ends
 * backgroundColor: change bgColor
 */

 export class Snackbar extends React.Component{
 
    animatedValue = new Animated.Value(0)

    runAnimation=()=>{
      Animated.timing(this.animatedValue,{
        toValue:2,
        duration:get(this.props,'duration',9000)
      }).start((finished)=>{
        if(this.props.animEndCallback && finished)
          this.props.animEndCallback();
      })
    }
    componentDidMount(){
      this.runAnimation()
    }

  render(){
    const animatedTranslate = this.animatedValue.interpolate({
      inputRange:[0,0.3,1.9,2],
      outputRange:[-get(this.props,'positionTop',60),get(this.props,'positionTop',60),get(this.props,'positionTop',60),-get(this.props,'positionTop',60)]
    })
    const animatedWidth = this.animatedValue.interpolate({
      inputRange:[0,0.5,0.7,1.7,1.8,2],
      outputRange:[10,10,get(this.props,'width',200),get(this.props,'width',200),10,10]
    })
    const animatedHeight = this.animatedValue.interpolate({
      inputRange:[0,0.3,0.5,1.8,1.9,2],
      outputRange:[10,10,get(this.props,'height',80),get(this.props,'height',80),10,10]
    })
    const animatedOpacity = this.animatedValue.interpolate({
      inputRange:[0,0.7,1,1.69,1.7,2],
      outputRange:[0,0,1,1,0,0]
    })

    return(
      <Animated.View style={{height:animatedHeight,width:animatedWidth, backgroundColor:get(this.props,'backgroundColor','#ffa259'), transform:[{translateY:animatedTranslate}], borderRadius:4, position:'absolute', top:0, zIndex:10, alignSelf:'center', justifyContent:'center', alignItems:'center'}} >
        <Animated.View style={{opacity:animatedOpacity,padding:10}}>
         {this.props.children}
        </Animated.View>
      </Animated.View>
    )  
  }
}

/**
 * length: height and width of component
 * backgroundColor: bgColor of the component
 * iconColor:    color of the dot icon
 * firstIcon:    source of first Icon 
 * secondIcon:    source of second Icon 
 * thirdIcon:    source of third Icon 
 * onFirstIconPress: action on first Icon press
 * onSecondIconPress: action on second Icon press
 * onThirdIconPress: action on Third Icon press
 */
export class BottomClick extends React.Component{

state={
  touch:true
}

 animatedValue = new Animated.Value(0)

  onTouch=()=>{
    this.setState({
      touch:!this.state.touch
    })
    Animated.timing(this.animatedValue,{
      toValue:this.animatedValue._value==1?0:1,
      duration:500
    }).start()
  }

render(){
const maxHeight = get(this.props,'length',140);
const iconSize = maxHeight * 0.24;
const dotSize = iconSize *0.8;
  const animatedHeight = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[iconSize,maxHeight],
  })
  const animatedWidth = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[iconSize,maxHeight],
  }) 
  const animatedRadius = this.animatedValue.interpolate({
    inputRange:[0,0.3,1],
    outputRange:[4,maxHeight,maxHeight],
  })
  const animatedBackground = this.animatedValue.interpolate({
    inputRange:[0,0.3,1],
    outputRange:['rgba(0,0,0,0)', get(this.props,'backgroundColor','#6c567b'),get(this.props,'backgroundColor','#6c567b')],
    
  })
  const animatedRotate = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:['0deg','120deg']
  })
  const firstIconPositionX = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/1.6]
  })
  const firstIconPositionY = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/20]
  })
  const secondIconPositionX = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/2.4]
  })
  const secondIconPositionY = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/2.4]
  })
  const thirdIconPositionX = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/12]
  })
  const thirdIconPositionY = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-maxHeight/1.6]
  })
  const iconOpacity = this.animatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,1]
  })

  const iconShow = this.animatedValue.interpolate({
     inputRange:[0,0.1,1], 
     outputRange:[0,3,3]
  })

  return(
    <View style={{position:'absolute', bottom:BOTTOM_SAFEAREA_HEIGHT+15, right:15, zIndex:2}} >
   
        <View>
        <TouchableWithoutFeedback onPress={this.onTouch}>
        <Animated.View style={{backgroundColor:animatedBackground, height:animatedHeight, width:animatedWidth, borderRadius:4,borderTopLeftRadius:animatedRadius,  }}>
          <Animated.View style={{position:'absolute', bottom:6, right:6, transform:[{rotate:animatedRotate}],}}>
            <Image source={dots}   style={{tintColor:get(this.props,'iconColor','white'), height:dotSize, width:dotSize}}/>
          </Animated.View>
        </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={{position:'absolute', bottom:0, right:0, backgroundColor:'transparent', height:animatedHeight, width:animatedWidth, zIndex:iconShow,}}>
           {
             get(this.props,'firstIcon',false) && get(this.props,'onFirstIconPress',false) &&  (
              <Animated.View  style={{position:'absolute',bottom:0, right:0, transform:[{translateX:firstIconPositionX},{translateY:firstIconPositionY}], opacity:iconOpacity}}> 
              <TouchableOpacity onPress={this.props.onFirstIconPress}  disabled={this.state.touch} >
                <Image source={this.props.firstIcon}  style={{borderRadius:iconSize/2, height:iconSize, width:iconSize}}  />
              </TouchableOpacity>
            </Animated.View>  
             )
           }
          {
             get(this.props,'secondIcon',false) && get(this.props,'onSecondIconPress',false) &&  (
              <Animated.View style={{position:'absolute',bottom:0, right:0, transform:[{translateX:secondIconPositionX},{translateY:secondIconPositionY}], opacity:iconOpacity}}>
              <TouchableOpacity onPress={this.props.onSecondIconPress} disabled={this.state.touch} >
                <Image source={this.props.secondIcon}  style={{borderRadius:iconSize/2, height:iconSize, width:iconSize}}  />
                </TouchableOpacity>
              </Animated.View>
             )
          }
          {
               get(this.props,'thirdIcon',false) && get(this.props,'onThirdIconPress',false) &&  (
                  <Animated.View  style={{position:'absolute',bottom:0, right:0, transform:[{translateY:thirdIconPositionY},{translateX:thirdIconPositionX}], opacity:iconOpacity}}>
                    <TouchableOpacity onPress={this.props.onThirdIconPress} disabled={this.state.touch} >
                    <Image source={this.props.thirdIcon}  style={{borderRadius:iconSize/2, height:iconSize, width:iconSize}}  />
                    </TouchableOpacity>
                </Animated.View> 
               )
          }
           <TouchableWithoutFeedback onPress={this.onTouch}>
            <Animated.View style={{position:'absolute', bottom:6, right:6, transform:[{rotate:animatedRotate}],}}>
              <Image source={dots} style={{tintColor:get(this.props,'iconColor','white'), height:dotSize, width:dotSize}}/>
            </Animated.View>
            </TouchableWithoutFeedback>
        </Animated.View>
        </View>
    </View>

 )
}
}

/**
 * onButtonPress: action after button si pressed
 * title:   title of the button
 */
export class Button extends React.Component{
  
  animatedValue = new Animated.Value(0)

  pressIn=()=>{
    Animated.timing(this.animatedValue,{
      toValue:1,
      duration:600,
      ease:Easing.spring
    }).start((finished)=>{
        if(finished){
          this.animatedValue.setValue(0)
        }
    })
  }

render(){
  const buttonTransform = this.animatedValue.interpolate({
    inputRange:[0,0.5,1],
    outputRange:[1,0.5,1]
  })
  return(
    <TouchableWithoutFeedback onPress={get(this.props,'onButtonPress',null)} onPressIn={this.pressIn} >
      <Animated.View style={[{paddingHorizontal:40, paddingVertical:20,borderRadius:4, backgroundColor:'red'},get(this.props,'style',null),{transform:[{ scale :buttonTransform}]}]}  maxHeight={100} maxWidth={300} >
          <Text numberOfLines={1} style={{color:'white', fontSize:16, fontWeight:'500'}} > {get(this.props,'title','Press')}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
 }
}