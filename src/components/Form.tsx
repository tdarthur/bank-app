import { Reducer, useEffect, useReducer, useRef, useState } from "react";
import formContext from "../contexts/formContext";

export type FormValues = {
	[_: string]: string;
};

type ValidationErrors = {
	[_: string]: string;
};

export type FormMessage = {
	text: string;
	level?: "info" | "warning" | "error";
};

type MessagesReducerAction = {
	type: "add" | "clear";
	payload?: {
		text: string;
		level: "info" | "warning" | "error";
	};
};

export type FormSuppliedProps = {
	values: FormValues;
	messages: FormMessage[];
	valid: boolean;
	invalidFields: ValidationErrors;
	invalidSubmission: boolean;
	submitting: boolean;
	pushErrorMessage: (text: string) => void;
	pushWarningMessage: (text: string) => void;
	pushInfoMessage: (text: string) => void;
	clearMessages: () => void;
};

type Props = {
	validators?: { [_: string]: (value: string) => string | null | undefined };
	render: (_: FormSuppliedProps) => React.ReactNode;
	onSubmit?: (_: FormSuppliedProps, event: React.FormEvent<HTMLFormElement>) => Promise<void>;
} & Omit<
	React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
	"children" | "ref" | "onSubmit"
>;

const messagesReducer = (messages: FormMessage[], action: MessagesReducerAction) => {
	switch (action.type) {
		case "add":
			return action.payload ? [...messages, { text: action.payload.text, level: action.payload.level }] : [];
		case "clear":
			return [];
		default:
			return messages;
	}
};

const Form = ({ validators, render, onSubmit, ...props }: Props) => {
	const [values, setValues] = useState<FormValues>({});
	const [messages, dispatchMessageUpdate] = useReducer<Reducer<FormMessage[], MessagesReducerAction>>(
		messagesReducer,
		[],
	);
	const [validatorsValid, setValidatorsValid] = useState(true);
	const [invalidFields, setInvalidFields] = useState<ValidationErrors>({});
	const [invalidSubmission, setInvalidSubmission] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	const requiredFieldsHaveValues = () => {
		if (formRef.current) {
			let allFieldsHaveValue = true;
			for (const field of formRef.current.querySelectorAll("input[required],select[required]")) {
				allFieldsHaveValue = allFieldsHaveValue && !!(field as HTMLInputElement).value;
			}
			return allFieldsHaveValue;
		}

		return true;
	};

	useEffect(() => {
		if (formRef.current) {
			const updateValues = () => {
				if (formRef.current) {
					const formData = new FormData(formRef.current);
					const newValues = {} as FormValues;
					let newValid = true;
					const newInvalidFields = {} as ValidationErrors;
					for (const entry of formData.entries()) {
						newValues[entry[0]] = entry[1].valueOf() as string;

						if (validators && entry[0] in validators) {
							const validationError = validators[entry[0]](entry[1].valueOf() as string);
							if (validationError) {
								newValid = false;
								newInvalidFields[entry[0] as string] = validationError;
							}
						}
					}
					setValues(newValues);
					setValidatorsValid(newValid);
					setInvalidFields(newInvalidFields);
				}
			};

			let newValid = true;
			const newInvalidFields = {} as ValidationErrors;
			for (const field of formRef.current.querySelectorAll("input,select")) {
				field.removeEventListener("input", updateValues);
				field.removeEventListener("change", updateValues);
				field.addEventListener("input", updateValues);
				field.addEventListener("change", updateValues);

				const fieldName = field.getAttribute("name") as string;
				if (validators && fieldName in validators) {
					const validationError = validators[fieldName]((field as HTMLInputElement).value);
					if (validationError) {
						newValid = false;
						newInvalidFields[fieldName] = validationError;
					}
				}
			}
			setValidatorsValid(newValid);
			setInvalidFields(newInvalidFields);

			const observer = new MutationObserver((mutationRecord) => {
				const checkForFieldAdded = (node: Node) => {
					if (node.nodeName === "INPUT" || node.nodeName === "SELECT") {
						node.addEventListener("input", updateValues);
						node.addEventListener("change", updateValues);
					}

					for (const child of node.childNodes) {
						checkForFieldAdded(child);
					}
				};

				for (const mutation of mutationRecord) {
					mutation.addedNodes.forEach(checkForFieldAdded);
				}
			});
			observer.observe(formRef.current, { subtree: true, childList: true, attributes: true });

			return () => {
				observer.disconnect();
			};
		}
	}, [formRef, validators]);

	const pushInfoMessage = (text: string) => {
		dispatchMessageUpdate({ type: "add", payload: { text, level: "info" } });
	};

	const pushWarningMessage = (text: string) => {
		dispatchMessageUpdate({ type: "add", payload: { text, level: "warning" } });
	};

	const pushErrorMessage = (text: string) => {
		dispatchMessageUpdate({ type: "add", payload: { text, level: "error" } });
	};

	const clearMessages = () => {
		dispatchMessageUpdate({ type: "clear" });
	};

	const valid = validatorsValid && requiredFieldsHaveValues();

	const suppliedProps = {
		values,
		messages,
		valid,
		invalidFields,
		invalidSubmission,
		submitting,
		pushErrorMessage,
		pushWarningMessage,
		pushInfoMessage,
		clearMessages,
	};

	return (
		<form
			ref={formRef}
			onSubmit={(event) => {
				event?.preventDefault();

				if (!valid) {
					setInvalidSubmission(true);
					return;
				}

				if (onSubmit) {
					setSubmitting(true);
					onSubmit(suppliedProps, event).finally(() => {
						setSubmitting(false);
					});
				}
			}}
			noValidate
			{...props}
		>
			<formContext.Provider value={suppliedProps}>{render(suppliedProps)}</formContext.Provider>
		</form>
	);
};

export default Form;
