import classNames from "classnames";

import styles from "./components.module.css";

type Props = {
	label: string;
	width?: "XS" | "S" | "M" | "L" | "XL";
	options: { key: string; value: string }[];
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & { children?: never };

const Dropdown = ({ label, width, options, className, ...props }: Props) => (
	<div className={styles.inputWrapper}>
		<label className={styles.inputLabel}>{label}</label>
		<select className={classNames(width && `width-${width}`, className)} {...props}>
			{options.map(({ key, value }) => (
				<option key={key}>{value}</option>
			))}
		</select>
	</div>
);

export default Dropdown;
