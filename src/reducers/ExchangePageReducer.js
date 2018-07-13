import  {CONVERT_CURRENCY,
        FETCH_RATES,
        RATES_FETCH_SUCCESS,
        RATES_FETCH_FAILURE,
        EXCHANGE_FORM_UPDATE} from '../actions/types';

const INITIAL_STATE = { 
        currencyA : 'EUR',
        currencyB : 'USD',
        Rate: 0,
        Amount : 0,
        Rates:[],
        loading: false
   };


export default (state = INITIAL_STATE  ,action) => {
   switch(action.type){
   case FETCH_RATES : 
        return {...state,loading:true}
   case RATES_FETCH_SUCCESS:
        return {...state,loading:false,Rates:action.payload}
   case RATES_FETCH_FAILURE:
        return {...state,loading:false}
    case EXCHANGE_FORM_UPDATE:
        return {...state,[action.payload.prop] : action.payload.value};
   default: 
           return state;
   }
};