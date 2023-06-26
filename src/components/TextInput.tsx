import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = ({ label, width = "M", ...props }: Props) => (
	<div className={styles.inputWrapper}>
		<label className={styles.inputLabel}>{label}</label>
		<input type="text" className={`width-${width}`} {...props} />
	</div>
);

export default TextInput;
