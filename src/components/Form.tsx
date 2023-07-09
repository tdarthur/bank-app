import { useEffect, useRef, useState } from "react";

type Message = {
	text: string;
	level?: "info" | "warning" | "error";
	fieldName?: string;
};

type FormValues = {
	[value: string]: string;
};

type Props = {
	render: (_: {
		values: FormValues;
		messages: Message[];
		clearMessages: () => void;
		pushMessage: (text: string, level: "info" | "warning" | "error") => void;
	}) => React.ReactNode;
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
		children?: never;
		ref?: never;
	};

const Form = ({ render, ...props }: Props) => {
	const [values, setValues] = useState<FormValues>({});
	const [messages, setMessages] = useState<Message[]>([]);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (formRef.current) {
			const updateValues = () => {
				if (formRef.current) {
					const formData = new FormData(formRef.current);
					const newValues: FormValues = {};

					for (const entry of formData.entries()) {
						newValues[entry[0]] = entry[1].valueOf() as string;
					}

					setValues(newValues);
				}
			};

			for (const field of formRef.current.querySelectorAll("input,select")) {
				field.addEventListener("change", updateValues);
			}

			new MutationObserver((mutationRecord) => {
				const checkForFieldAdded = (node: Node) => {
					if (node.nodeName === "INPUT" || node.nodeName === "SELECT") {
						node.addEventListener("change", updateValues);
					}

					for (const child of node.childNodes) {
						checkForFieldAdded(child);
					}
				};

				for (const mutation of mutationRecord) {
					mutation.addedNodes.forEach(checkForFieldAdded);
				}
			}).observe(formRef.current, { subtree: true, childList: true });
		}
	}, [formRef]);

	const clearMessages = () => {
		setMessages([]);
	};

	const pushMessage = (text: string, level: "info" | "warning" | "error" = "error") => {
		setMessages([...messages, { text, level }]);
	};

	return (
		<form ref={formRef} {...props}>
			{render({ values, messages, clearMessages, pushMessage })}
		</form>
	);
};

export default Form;
