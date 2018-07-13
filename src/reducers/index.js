import {combineReducers} from 'redux';
import ExchangePageReducer from './ExchangePageReducer';


export default combineReducers (
    {
        ExchangePage : ExchangePageReducer
    }
);