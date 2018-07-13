import React, { Component } from 'react'
import { 
  TextInput,
  TouchableOpacity,
  Text,
  Textinput,
  Dimensions,
  View,
  Image
 } from 'react-native';
 import {colors} from '../themes/style1';
import LinearGradient from 'react-native-linear-gradient';
import TextInputwithIcon from './common/TextInputwithIcon';
import ModalSelector from 'react-native-modal-selector';
import  {UpdateExchangeForm,fetchRates} from '../actions'; 
import {connect} from 'react-redux';
import {quantityOptions,transactionTypeOptions,sizeOptions} from '../data/AppData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from './common/Spinner';


class ExchangePage extends Component {

   constructor() {
         super();
         this.state = {
         isReady: true
         };
   }
   
   componentWillMount(){
        this.props.fetchRates();
 };


    
    swap()
    {
        temp = this.props.currencyA ;
        this.props.UpdateExchangeForm({prop : 'currencyA' , value : this.props.currencyB })
        this.props.UpdateExchangeForm({prop : 'currencyB' , value : temp })
        this.props.UpdateExchangeForm({prop : 'Amount' , value : this.getConvetedAmount(this.props.Rate,this.props.currencyA, this.props.currencyB)  })

    }

    getConversionRate(currencyA = "EUR",currencyB= "USD")
    {
      //if(this.props.currencyA)
         rateA = this.props.Rates.filter(curr => {
          return curr.currency === currencyA
        })[0].rate;

        rateB = this.props.Rates.filter(curr => {
          return curr.currency === currencyB
        })[0].rate;


        console.log('rate a = ' + rateA+ 'rate b = '+rateB)
        return rateB/rateA ; 
      
    }

    getConvetedAmount(amount,currencyA = "EUR",currencyB= "USD")
    {
      console.log('amount ' + amount+'  currencyA = ' + currencyA+'  currencyB' +currencyB );
      console.log('converted ' + amount * this.getConversionRate(currencyA,currencyB).toFixed(2).toString());
       return (amount * this.getConversionRate(currencyA ,currencyB)).toFixed(2).toString();
    }

    render(){
    return (
        <LinearGradient colors={colors.secondGradient} style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
        
        <Image
          source = {require('../../images/taxfix.png')}
          style = {{height:200,width:200}}
        />
        {(this.props.loading == true)?<Spinner/>:
        <View style = {{flex:1}}>
        <View style = {styles.container}>
         <ModalSelector
            data={this.props.Rates.map((a)=> {
              return {key: a.currency,label: a.currency};
            })}

            style = {{marginLeft:10}}
            initValue="USD"    
            accessible={true}     
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel'}
            onChange={(option)=>{ 
              this.props.UpdateExchangeForm({prop : 'currencyA' , value : option.label })
              this.props.UpdateExchangeForm({prop : 'Amount' , value : this.getConvetedAmount(this.props.Rate,option.label, this.props.currencyB)  })

              }}>
            <View style = {styles.DropdownView} >
           
            <Text style = {styles.currencyTextStyle} >{this.props.currencyA}</Text>   
            <Icon style = {styles.DropdownIconStyle} name = 'chevron-circle-down'/> 

            </View>

         </ModalSelector>

        <TextInput
           maxLength = {10}
           placeholder =  {'0'}
           style = {styles.inputStyle}
           value = {this.props.Rate}
           placeholderTextColor = 'white'
           keyboardType='numeric'
           onChangeText =  {(text)=>{
             this.props.UpdateExchangeForm({prop : 'Rate' , value: text })
             this.props.UpdateExchangeForm({prop : 'Amount' , value : this.getConvetedAmount(text,this.props.currencyA,this.props.currencyB) })
            }}
           underlineColorAndroid={'transparent'}
          />

          </View>

          <View style = {{...styles.container,justifyContent:'center'}}>
               
               <View style = {{borderBottomColor:'white',borderBottomWidth:1, width:Dimensions.get('window').width-100}}/>
                   <TouchableOpacity style = {{borderColor:'black',padding:15,backgroundColor:'white',borderRadius:30,marginLeft:10}}
                   onPress = {()=>this.swap()}>
                      <Icon name = 'exchange' style = {{...styles.DropdownIconStyle,transform: [{ rotate: '90deg'}],color:'#32CCBC'}} />
                   </TouchableOpacity>
               </View>
          
          <View style = {styles.container}>
          <ModalSelector
            data={this.props.Rates.map((a)=> {
              return {key: a.currency,label: a.currency};
            })}

            style = {{marginLeft:10}}
            initValue="USD"    
            accessible={true}     
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel'}
            onChange={(option)=>{ 
              this.props.UpdateExchangeForm({prop : 'currencyB' , value : option.label })
              this.props.UpdateExchangeForm({prop : 'Amount' , value : this.getConvetedAmount(this.props.Rate,this.props.currencyA,option.label)  })
              }}>
            <View style = {styles.DropdownView} >
           
            <Text style = {styles.currencyTextStyle}  >
             {this.props.currencyB}    
            </Text>   
            <Icon style = {styles.DropdownIconStyle} name = 'chevron-circle-down'/> 

            </View>

         </ModalSelector>

         <TextInput
           maxLength = {10}
           editable = {false}
           placeholder =  {'0'}
           autoCorrect = {false}
           style = {styles.inputStyle}
           placeholderTextColor = 'white'
           value = {this.props.Amount}
           underlineColorAndroid={'transparent'}
                           
          />


          </View>
        </View>}
        </LinearGradient>


    )

    };
}

const styles = {
  inputStyle: {
    marginRight:5,
    marginTop:5,
    fontSize: 30,
    lineHeight: 23,
    width:Dimensions.get('window').width*2/5,
    //height : 40,
    borderRadius : 2,
    //borderWidth:1,
    //borderColor:'#9CC8E1',
    color:'white',
   // backgroundColor:'white'
     textAlign:'center'
},
 DropdownInnerView : {
   borderWidth:1,
   borderRadius:5,
   width:120, 
   borderColor:colors.inputBlueBorder, 
   padding:10, 
   height:40,
   alignItems:'center',
   backgroundColor:'white',
   justifyContent:'space-around',   
   flexDirection:'row'
 }, DropdownView:{
   width:Dimensions.get('window').width*1/4, 
   height:40,
   alignItems:'center',
   justifyContent:'space-around',   
   flexDirection:'row'
 },
 DropdownIconStyle : {
  fontSize:20,color:colors.white
 } ,
 currencyTextStyle:{
   fontSize:20,
   color:colors.white
 },
 container:{
   marginTop:20,
   alignItems:'center',
   flexDirection:'row',
   justifyContent:'space-around',
   width:Dimensions.get('window').width
  }

}

const mapStateToProps = (state)=>{
  const { currencyA ,currencyB , Rate, Amount,Rates,loading} = state.default.ExchangePage ;

  return ( { currencyA ,currencyB , Rate, Amount,Rates,loading} );
}
export default connect (mapStateToProps,{UpdateExchangeForm,fetchRates})(ExchangePage);
