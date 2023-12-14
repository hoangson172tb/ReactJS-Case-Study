import './App.css';
import { Routes, Route } from 'react-router-dom';
import GuzhengPage from './pages/GuzhengPage';
import CartPage from './pages/CartPage';
import OderManagementPage from './pages/dashboard/OrderManagementPage';
import ProductManagementPage from './pages/dashboard/ProductManagementPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GuzhengPage />} />
        <Route path='/guzheng' element={<GuzhengPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/dashboard/order-list' element={<OderManagementPage/>} />
        <Route path='/dashboard/product-list' element={<ProductManagementPage/>} />
      </Routes>
    </>
  );
}

export default App;
