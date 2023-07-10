import { ChangeEvent, Reducer, useEffect, useReducer, useRef, useState } from "react";
import formContext from "../contexts/formContext";

export type FormValues = {
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
	invalidFields: string[];
	submitted: boolean;
	pushErrorMessage: (text: string) => void;
	pushWarningMessage: (text: string) => void;
	pushInfoMessage: (text: string) => void;
	clearMessages: () => void;
};

type Props = {
	validators?: { [_: string]: (value: string) => boolean };
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
	const [invalidFields, setInvalidFields] = useState<string[]>([]);
	const [submitted, setSubmitted] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (formRef.current) {
			const updateValues = () => {
				if (formRef.current) {
					const formData = new FormData(formRef.current);
					const newValues: FormValues = {};
					const newInvalidFields = [];
					for (const entry of formData.entries()) {
						newValues[entry[0]] = entry[1].valueOf() as string;

						if (
							validators &&
							entry[0] in validators &&
							!validators[entry[0]](entry[1].valueOf() as string)
						) {
							newInvalidFields.push(entry[0]);
						}
					}
					setInvalidFields(newInvalidFields);
					setValues(newValues);
				}
			};

			const newInvalidFields = [];
			for (const field of formRef.current.querySelectorAll("input,select")) {
				field.removeEventListener("input", updateValues);
				field.removeEventListener("change", updateValues);
				field.addEventListener("input", updateValues);
				field.addEventListener("change", updateValues);

				const fieldName = field.getAttribute("name") as string;
				if (
					validators &&
					fieldName in validators &&
					!validators[fieldName]((field as HTMLInputElement).value)
				) {
					newInvalidFields.push(fieldName);
				}
			}
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
			observer.observe(formRef.current, { subtree: true, childList: true });

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

	const suppliedProps = {
		values,
		messages,
		invalidFields,
		submitted,
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
				if (onSubmit) {
					setSubmitted(true);
					onSubmit(suppliedProps, event).finally(() => {
						setSubmitted(false);
					});
				}
			}}
			{...props}
		>
			<formContext.Provider value={suppliedProps}>{render(suppliedProps)}</formContext.Provider>
		</form>
	);
};

export default Form;
