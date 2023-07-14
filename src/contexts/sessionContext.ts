import { createContext } from "react";
import { CognitoUserSession } from "amazon-cognito-identity-js";

const sessionContext = createContext<CognitoUserSession | null>(null);

export default sessionContext;
