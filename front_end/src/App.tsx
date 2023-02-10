import { ROUTER } from 'constant';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout';
import { MainPage, VerifyPage } from './page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER.VERIFY} element={<Layout />}>
          <Route index element={<VerifyPage />} />
          <Route path={ROUTER.MAIN} element={<MainPage />} />
        </Route>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
