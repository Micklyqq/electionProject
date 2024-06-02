//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WelcomePage from './routes/WelcomePage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import AuthPage from './routes/AuthPage';
import RegPage from './routes/RegPage';
import MainPage from './routes/MainPage';
import ELectionPage from './routes/ElectionPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DataLoader from './components/DataLoader';
const router = createBrowserRouter([
  {
    path:"/",
    element:<WelcomePage/>
  },

  {
    path:"/auth",
    element:<AuthPage/>
  },

  {
    path:"/reg",
    element:<RegPage/>
  },
  {
    path:"/main",
    element:<MainPage/>
  },
  {
    path:"/election",
    element:<ELectionPage/>
  },
  
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
  <Provider store={store}>
      <DataLoader/>
      <RouterProvider router={router}/>
  </Provider>

  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
