import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import formContext from "../contexts/formContext";

import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id">;

const TextInput = ({ label, width, className, name, ...props }: Props) => {
	const [invalid, setInvalid] = useState(false);
	const formProps = useContext(formContext);

	useEffect(() => {
		if (formProps && name) {
			setInvalid(formProps.invalidFields.includes(name));
		}
	}, [formProps, name]);

	return (
		<div className={classNames(styles.inputWrapper, invalid && styles.invalid)}>
			<label className={styles.inputLabel} htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type="text"
				className={classNames(width && `width-${width}`, className)}
				{...props}
			/>
		</div>
	);
};

export default TextInput;
