import { createContext } from "react";
import type { FormSuppliedProps } from "../components/Form";

const formContext = createContext<FormSuppliedProps>({
	values: {},
	messages: [],
	submitted: false,
	pushErrorMessage: () => undefined,
	pushWarningMessage: () => undefined,
	pushInfoMessage: () => undefined,
	clearMessages: () => undefined,
});

export default formContext;
