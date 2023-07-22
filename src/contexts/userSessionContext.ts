import { createContext } from "react";
import { CognitoUserSession } from "amazon-cognito-identity-js";

import { User } from "../models";

export type UserSession = {
	cognitoSession: CognitoUserSession | null;
	user: User | null;
};

const userSessionContext = createContext<UserSession>({ cognitoSession: null, user: null });

export default userSessionContext;
