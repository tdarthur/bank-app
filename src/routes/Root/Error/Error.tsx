import classNames from "classnames";
import { useRouteError } from "react-router-dom";
import { Footer, Header } from "../Layout";
import Button from "../../../components/Button";

import layoutStyles from "../layout.module.css";
import styles from "./error.module.css";

type ErrorResponse = {
	data: string;
	error: Error;
	internal: boolean;
	status: number;
	statusText: string;
};

const errorMessages: { [key: number]: React.ReactNode } = {
	404: "Oops. The page you're looking for isn't here!",
};

const Error = () => {
	const routeError = useRouteError() as ErrorResponse;

	return (
		<>
			<Header />
			<main className={layoutStyles.main}>
				<div className={classNames(layoutStyles.pageContent, styles.errorDetails)}>
					<h2 className={styles.errorMessage}>
						{errorMessages[routeError?.status] || routeError?.error?.message || "An error occurred"}
					</h2>
					<Button text="Back to Homepage" width="L" linkTo="/" />

					<p className="text-soft">
						{(routeError.status && routeError.statusText && (
							<>
								{routeError.status} Error: {routeError.statusText}
							</>
						)) ||
							String(routeError) || <>Unknown error</>}
					</p>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Error;
