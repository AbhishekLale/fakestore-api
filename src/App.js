import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import NavBar from './components/layout/NavBar';
import Home from './components/layout/Home';
import ProductDetails from './components/products/ProductDetails';
import EditProduct from './components/products/EditProduct';
import AddProduct from './components/products/AddProduct';
import CartsGrid from './components/carts/CartsGrid';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/product/edit/:id" component={EditProduct} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/cart" component={CartsGrid} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
