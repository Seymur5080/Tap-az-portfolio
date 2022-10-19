import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignIn from "./components/signIn/signIn";
import ListProducts from "./components/listProducts";
import ContextElement from "./context/context";
import {QueryClient, QueryClientProvider} from 'react-query';
import AddCategory from "./components/category/addCategory";
import './style.css'

const queryClient = new QueryClient()

const Index = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ContextElement>
                        <Navbar/>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/signIn' element={<SignIn/>}/>
                            <Route path='/listProducts' element={<ListProducts/>}/>
                            <Route path='/addCategory' element={<AddCategory/>}/>
                        </Routes>
                    </ContextElement>
                </Router>
            </QueryClientProvider>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index/>);