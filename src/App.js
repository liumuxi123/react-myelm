import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { hot } from 'react-hot-loader/root'
import routes from "@router/index.js";
import { store, persistor } from "@store";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>{renderRoutes(routes)}</HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
