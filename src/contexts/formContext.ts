import { createContext } from "react";
import type { FormSuppliedProps } from "../components/Form";

const formContext = createContext<FormSuppliedProps>({
	values: {},
	messages: [],
	valid: true,
	invalidFields: {},
	invalidSubmission: false,
	submitting: false,
	pushErrorMessage: () => undefined,
	pushWarningMessage: () => undefined,
	pushInfoMessage: () => undefined,
	clearMessages: () => undefined,
});

export default formContext;
