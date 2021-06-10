import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
// import { hot } from 'react-hot-loader/root'
import routes from '@router/index.js'
import store from '@store'
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  </Provider>
  );
}

export default App;
