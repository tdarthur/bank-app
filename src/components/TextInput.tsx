import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import formContext from "../contexts/formContext";

import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id">;

const TextInput = ({ label, width, className, name, required, ...props }: Props) => {
	const [validationError, setValidationError] = useState<string>();
	const formProps = useContext(formContext);

	useEffect(() => {
		if (formProps && name) {
			if (formProps.invalidSubmission) {
				if (required && !formProps.values[name]) {
					setValidationError("Required");
				} else {
					setValidationError(formProps.invalidFields[name]);
				}
			}
		}
	}, [formProps, name, required]);

	return (
		<div className={clsx(styles.inputWrapper, validationError && styles.invalid)}>
			<label className={styles.inputLabel} htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={props.type || "text"}
				className={clsx(width && `width-${width}`, className)}
				required={required}
				{...props}
			/>
			{validationError && <p className={styles.validationError}>{validationError}</p>}
		</div>
	);
};

export default TextInput;
