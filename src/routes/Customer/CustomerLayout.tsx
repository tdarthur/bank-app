import { useEffect } from "react";
import { Outlet, useMatches, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

import styles from "./customerLayout.module.css";

/**
 * Layout component for the 'Customer portal' in the application.
 */
const Layout = () => {
	const matches = useMatches();
	const navigate = useNavigate();

	useEffect(() => {
		if (matches.length === 1) {
			// TODO: check if logged in, then navigate accordingly
			// navigate("/account-access");
		}
	}, [matches, navigate]);

	return (
		<>
			<header className={styles.header}>
				<Button text="Sign Out" variant="secondary" width="S" linkTo="/" />
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>
				<p>Footer</p>
			</footer>
		</>
	);
};

export default Layout;
