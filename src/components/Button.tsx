import { To, useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./components.module.css";

type Props = {
	text: React.ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
	width?: "XS" | "S" | "M" | "L" | "XL";
	linkTo?: To;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { children?: never };

const Button = ({ width, variant = "primary", text, linkTo, className, onClick, ...props }: Props) => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className={classNames(
				styles.button,
				variant === "tertiary"
					? styles.buttonTertiary
					: variant === "secondary"
					? styles.buttonSecondary
					: styles.buttonPrimary,
				`width-${width}`,
				className,
			)}
			onClick={(event) => {
				if (linkTo) navigate(linkTo);
				onClick?.(event);
			}}
			{...props}
		>
			{text}
		</button>
	);
};

export default Button;
