import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./comp/Home";
import Navbar from "./comp/Navbar";
import Show from "./comp/Show";
import Login from "./comp/Login";
import Buyer from "./comp/Buyer";
import Seller from "./comp/Seller";
import Cart from "./comp/Cart";
import Category from "./comp/Category";
import { store, persistor } from "./Store";
import { Provider } from "react-redux";
import Admin from "./comp/Admin";
import AllUsers from "./comp/AllUsers";
import { PersistGate } from "redux-persist/integration/react";
import AllProducts from "./comp/AllProducts";
import AllShops from "./comp/AllShops";
import FooterPage from "./comp/FooterPage";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <PersistGate persistor={persistor}>
              <Navbar />

              <Route exact path="/" component={Home} />
              <Route exact path="/show/:id/:type" component={Show} />
              <Route exact path="/login/:id" component={Login} />
              <Route exact path="/buyer_dashboard" component={Buyer} />
              <Route exact path="/seller_dashboard" component={Seller} />
              <Route exact path="/category/:id" component={Category} />

              <Route exact path="/admin/all-users" component={AllUsers} />
              <Route exact path="/admin/all-shops" component={AllShops} />
              <Route exact path="/admin/all-products" component={AllProducts} />

              <Route exact path="/cart" component={Cart} />

              <FooterPage />
            </PersistGate>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
