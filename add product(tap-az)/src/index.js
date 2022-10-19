import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import Home from "./components/home";
import AuthContextProvider from "./context/authContext";
import AddProducts from "./components/addProducts/addProducts";
import ListProducts from "./components/listProducts/listProducts";
import {QueryClient, QueryClientProvider} from 'react-query'
import Error from "./components/error";
import Edit from "./components/listProducts/edit";
import './style.css'

const queryClient = new QueryClient();

const Index = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AuthContextProvider>
                        <Navbar/>
                        <div className='container'>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/signIn' element={<SignIn/>}/>
                                <Route path='/signUp' element={<SignUp/>}/>
                                <Route path='/addProducts' element={<AddProducts/>}/>
                                <Route path='/listProducts' element={<ListProducts/>}/>
                                <Route path='*' element={<Error/>}/>
                                <Route path='edit/:id' element={<Edit/>}/>
                            </Routes>
                        </div>
                    </AuthContextProvider>
                </Router>
            </QueryClientProvider>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index/>)