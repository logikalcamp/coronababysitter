import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState())
})



function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
