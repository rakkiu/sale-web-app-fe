import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; // Chỉ import store, không import persistor
import AppRoutes from './Routes';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;