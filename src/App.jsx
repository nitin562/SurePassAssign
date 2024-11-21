import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Component/Home'
import {Provider} from "react-redux"
import { store } from './redux/store'


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <Home/>
    </BrowserRouter>
    </Provider>
  )
}

export default App
