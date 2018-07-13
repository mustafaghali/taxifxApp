import {CONVERT_CURRENCY,
  FETCH_RATES,
  RATES_FETCH_SUCCESS,
  RATES_FETCH_FAILURE,
  EXCHANGE_FORM_UPDATE
} from './types';
import axios from 'axios';


export const getRate =  (payload) => {
    return {
             type : CONVERT_CURRENCY,
             payload: payload 
           };
} ;

export const UpdateExchangeForm = ({prop, value}) => {  
  return (
    {
        type : EXCHANGE_FORM_UPDATE,
        payload : {prop, value}
    }
 );
}


export const fetchRates = ()=>{
      
  return (dispatch)=>{
    dispatch({type: FETCH_RATES});    
        axios.get('https://txf-ecb.glitch.me/rates')
                .then(function (response) {
                  rates = response.data.rates
                  rates.push({"currency":"EUR","rate":"1"});
                  dispatch({type: RATES_FETCH_SUCCESS,payload:rates});
                  })
               .catch(function (error) {
                 console.log(error);
                 dispatch({type: RATES_FETCH_FAILURE});
                });
        }
}