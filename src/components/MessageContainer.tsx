import type { FormMessage } from "./Form";

import styles from "./components.module.css";

type Props = {
	messages: FormMessage[];
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children">;

const MessageContainer = ({ messages, ...props }: Props) => {
	return (
		<div {...props}>
			{messages
				.filter(({ level }) => level === "info")
				.map((message) => (
					<p className={styles.infoMessage}>{message.text}</p>
				))}
			{messages
				.filter(({ level }) => level === "warning")
				.map((message) => (
					<p className={styles.warningMessage}>{message.text}</p>
				))}
			{messages
				.filter(({ level }) => level === "error")
				.map((message) => (
					<p className={styles.errorMessage}>{message.text}</p>
				))}
		</div>
	);
};

export default MessageContainer;
