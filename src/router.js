import {Scene, Router,Stack,Actions} from 'react-native-router-flux';
import ExchangePage from './components/ExchangePage';
import React from 'react';


const RouterComponent = () => {

    return (
      <Router>

        <Stack key = 'root' hideNavBar = {true}
          >
              <Scene 
              key  = 'ExchangePage'
              component = {ExchangePage}
              initial
              />  
            </ Stack>
          </Router>

    );
};


export default RouterComponent;