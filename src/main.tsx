import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Dashboard from './pages/Customer/Dashboard/Dashboard';
import Login from './pages/Customer/Login/Login';
import SignUp from './pages/Customer/Login/SignUp';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import CustomerLayout from './pages/Customer/CustomerLayout';

import './index.css';
import Account from './pages/Customer/Account/Account';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            }
        ]
    },
    {
        path: '/customer',
        element: <CustomerLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'login',
                element: <Login />,
                children: [
                    {
                        path: 'sign-up',
                        element: <SignUp />
                    }
                ]
            },
            {
                path: 'account',
                element: <Account />
            }
        ]
    }
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
