import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import ViewProducts from "./components/viewProducts";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import FavoritesProducts from "./components/favoritesProducts";
import './style.css';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

const Index = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/viewProducts/:id' element={<ViewProducts />} />
                    <Route path='/favoritesProducts' element={<FavoritesProducts />} />
                </Routes>
            </Router>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><Index /></Provider>);