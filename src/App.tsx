import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormCreation from './components/FormCreation';
import FormRenderer from './components/FormRenderer';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={FormCreation} />
            <Route path="/:formId" Component={FormRenderer} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;


