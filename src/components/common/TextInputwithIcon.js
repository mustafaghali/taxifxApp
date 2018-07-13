import React, { Component } from 'react';
import {TextInput,View} from 'react-native';
//import {Icon} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


class TextInputwithIcon extends Component {
    
    render()
    {

        this.styles = {
            IconStyle  : {
                color:this.props.IconColor || 'gray',
                marginLeft:10
            },
                inputStyle: {
                flex:1,
                textAlign: 'center',
                marginLeft:10,
                paddingRight: 5,
                paddingLeft: 20,
                marginRight:5,
                marginLeft:5,
                fontSize: 16,
                lineHeight: 23,
                width:undefined,
                height : 50,
            },
            container : {
                backgroundColor:this.props.backgroundColor,
                width:this.props.width,
                height:this.props.height,
                flexDirection:'row', 
                alignItems:'center',
                justifyContent:'center',
                borderRadius : 5,
                borderWidth:0,
                borderColor:'black',
               
        
            }
        }


        return (
            <View style = {this.styles.container}>
               <Icon name = {this.props.IconName} style = {this.styles.IconStyle}/>
               <TextInput
                           maxLength = {40}
                           placeholder =  {this.props.placeholder}
                           autoCorrect = {false}
                           style = {this.styles.inputStyle}
                           value = {this.props.value}
                           secureTextEntry = {this.props.isPassword}
                           onChangeText =  {this.props.onChangeText}
                           underlineColorAndroid={'transparent'}
                           
               />
             </View>
        );
    }
}



export default TextInputwithIcon; 