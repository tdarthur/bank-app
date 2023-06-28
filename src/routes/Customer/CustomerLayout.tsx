import { useEffect } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
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
				<Link to="/">
					<span className="logo">H</span>
					<span className="logo-text">uman Bank</span>
				</Link>
				<Button
					text={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					}
					variant="tertiary"
					className={styles.accountMenu}
					linkTo="/"
				/>
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>
				<p className="text-disclosure">This is footer text.</p>
			</footer>
		</>
	);
};

export default Layout;
