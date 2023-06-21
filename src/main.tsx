import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import Contact from './pages/Contact/Contact';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/login',
                element: <Login />,
                children: [
                    {
                        path: '/login/sign-up',
                        element: <SignUp />
                    }
                ]
            },
            {
                path: '/account',
                element: <Contact />
            },
            {
                path: '/contact',
                element: <Contact />
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
