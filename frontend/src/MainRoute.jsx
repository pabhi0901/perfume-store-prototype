import React from 'react'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import ProductDescriptionPage from './pages/ProductDescriptionPage';

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<HomePage />} />
        <Route path='/products' element={ <Product />}/>
        <Route path='/product-description' element={<ProductDescriptionPage />} />
      </Routes>
    </div>
  )
}

export default MainRoute
