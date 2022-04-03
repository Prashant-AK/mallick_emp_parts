import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import "./i18n";
import { FloatingButton, Item } from "react-floating-button";

import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'
ReactDOM.render(
  <Provider store={store}>
    <App />
    <div
        class="whatsapp_float"
      >
        <WhatsAppWidget className= "whatsapp_float" phoneNumber='+971588928877'
        textReplyTime="Typically replies within 30 minutes"
        message="Hello! I am Your Investment Manager from Mallick Empire. Type your query here" />
      </div>
    

    
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
