import {Dimensions, Platform} from 'react-native'
const {height, width} = Dimensions.get('window')

export const screenHeight = height
export const screenWidth = width
export const isIphoneX = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812 || (height === 896 ||width === 896))
export const BOTTOM_SAFEAREA_HEIGHT = Platform.OS === 'ios' ? (isIphoneX ? 34 : 0) : 0
