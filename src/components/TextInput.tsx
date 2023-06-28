import classNames from "classnames";

import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = ({ label, width, className, ...props }: Props) => (
	<div className={styles.inputWrapper}>
		<label className={styles.inputLabel}>{label}</label>
		<input type="text" className={classNames(width && `width-${width}`, className)} {...props} />
	</div>
);

export default TextInput;
