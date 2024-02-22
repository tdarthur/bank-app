import { To, useNavigate } from "react-router-dom";
import clsx from "clsx";

import styles from "./components.module.css";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
	text: React.ReactNode;
	variant?: "primary" | "secondary" | "tertiary";
	width?: "XS" | "S" | "M" | "L" | "XL";
	linkTo?: To;
	loadingIndicator?: boolean;
} & Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children">;

const Button = ({
	width,
	variant = "primary",
	text,
	linkTo,
	loadingIndicator,
	className,
	onClick,
	...props
}: Props) => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			className={clsx(
				variant === "tertiary"
					? styles.buttonTertiary
					: variant === "secondary"
					? styles.buttonSecondary
					: styles.buttonPrimary,
				width && `width-${width}`,
				className,
			)}
			onClick={(event) => {
				if (linkTo) navigate(linkTo);
				onClick?.(event);
			}}
			{...props}
		>
			{text}
			{loadingIndicator !== undefined && <LoadingSpinner data-displayed={loadingIndicator || undefined} />}
		</button>
	);
};

export default Button;
