import classNames from "classnames";

import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { id?: never };

const TextInput = ({ label, width, className, name, ...props }: Props) => (
	<div className={styles.inputWrapper}>
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

export default TextInput;
