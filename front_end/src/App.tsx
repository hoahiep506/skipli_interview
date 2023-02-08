import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MainPage, VerifyPage } from './page';
import Layout from './layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<VerifyPage />} />
          <Route path='/main' element={<MainPage />} />
        </Route>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
