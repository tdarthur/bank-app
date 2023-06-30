import React from "react";
import ReactDOM from "react-dom/client";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import Layout from "./routes/Root/Layout";
import Home from "./routes/Root/Home/Home";
import Banking from "./routes/Root/Banking/Banking";
import CreditCards from "./routes/Root/CreditCards/CreditCards";
import Benefits from "./routes/Root/Benefits/Benefits";
import Faq from "./routes/Root/FAQ/Faq";
import Legal from "./routes/Root/Legal/Legal";
import Error from "./routes/Root/Error/Error";

import AccountAccess from "./routes/AccountAccess/AccountAccess";

import CustomerLayout from "./routes/Customer/CustomerLayout";
import Dashboard from "./routes/Customer/Dashboard/Dashboard";
import AccountSettings from "./routes/Customer/AccountSettings/AccountSettings";

import "./index.css";

Amplify.configure(awsconfig);

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{ path: "banking", element: <Banking /> },
			{ path: "credit-cards", element: <CreditCards /> },
			{ path: "benefits", element: <Benefits /> },
			{ path: "faq", element: <Faq /> },
			{ path: "legal", element: <Legal /> },
		],
	},
	{
		path: "account-access",
		element: <AccountAccess />,
		errorElement: <Error />,
	},
	{
		path: "customer",
		element: <CustomerLayout />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "account-settings",
				element: <AccountSettings />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
