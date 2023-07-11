import type { FormMessage } from "./Form";

import styles from "./components.module.css";

type Props = {
	messages: FormMessage[];
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children">;

const MessageContainer = ({ messages, ...props }: Props) => (
	<div {...props}>
		{messages
			.filter(({ level }) => level === "info")
			.map((message) => (
				<p className={styles.infoMessage} key={message.text}>
					{message.text}
				</p>
			))}
		{messages
			.filter(({ level }) => level === "warning")
			.map((message) => (
				<p className={styles.warningMessage} key={message.text}>
					{message.text}
				</p>
			))}
		{messages
			.filter(({ level }) => level === "error")
			.map((message) => (
				<p className={styles.errorMessage} key={message.text}>
					{message.text}
				</p>
			))}
	</div>
);

export default MessageContainer;
