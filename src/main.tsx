import React from "react";
import ReactDOM from "react-dom/client";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";

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
import AddAccount from "./routes/Customer/AddAccount/AddAccount";

import "./index.css";

Amplify.configure({
	aws_project_region: "us-east-2",
	aws_appsync_graphqlEndpoint: process.env.VITE_GRAPHQL_ENDPOINT,
	aws_appsync_region: "us-east-2",
	aws_appsync_authenticationType: "API_KEY",
	aws_appsync_apiKey: process.env.VITE_GRAPHQL_ENDPOINT,
	aws_cognito_identity_pool_id: process.env.VITE_COGNITO_IDENTITY_POOL_ID,
	aws_cognito_region: "us-east-2",
	aws_user_pools_id: process.env.VITE_USER_POOLS_ID,
	aws_user_pools_web_client_id: process.env.VITE_USER_POOLS_WEB_CLIENT_ID,
	oauth: {},
	aws_cognito_username_attributes: ["EMAIL"],
	aws_cognito_social_providers: [],
	aws_cognito_signup_attributes: ["EMAIL"],
	aws_cognito_mfa_configuration: "OFF",
	aws_cognito_mfa_types: ["SMS"],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: [],
	},
	aws_cognito_verification_mechanisms: ["EMAIL"],
	aws_dynamodb_all_tables_region: "us-east-2",
	aws_dynamodb_table_schemas: [
		{
			tableName: "user-dev",
			region: "us-east-2",
		},
	],
});

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
			{
				path: "add-account",
				element: <AddAccount />,
			},
		],
	},
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={createBrowserRouter(routes)} />
	</React.StrictMode>,
);
