import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CognitoUserSession } from "amazon-cognito-identity-js";

import Button from "../../components/Button";

import styles from "./customerLayout.module.css";
import sessionContext from "../../contexts/sessionContext";

const AccountNavigationMenu = () => {
	const [displayMenu, setDisplayMenu] = useState(false);

	const navigationListRef = useRef<HTMLUListElement>(null);

	const navigate = useNavigate();

	const signOut = () => {
		Auth.signOut()
			.then(() => {
				navigate("/account-access");
			})
			.catch(() => {
				console.log("an error occurred");
			});
	};

	return (
		<div className={styles.accountMenu}>
			<Button
				text={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.2}
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				}
				variant="tertiary"
				onClick={() => {
					setDisplayMenu(!displayMenu);
				}}
			/>
			<nav
				className={styles.accountNavigationMenu}
				style={{ height: `${((displayMenu && navigationListRef.current?.childElementCount) || 0) * 40}px` }}
			>
				<ul ref={navigationListRef}>
					<li>
						<Button text="Account Settings" tabIndex={displayMenu ? 0 : -1} />
					</li>
					<li>
						<Button text="Security" tabIndex={displayMenu ? 0 : -1} />
					</li>
					<li>
						<Button
							text="Sign Out"
							onClick={() => {
								signOut();
							}}
							tabIndex={displayMenu ? 0 : -1}
						/>
					</li>
				</ul>
			</nav>
		</div>
	);
};

/**
 * Layout component for the 'Customer portal' in the application.
 */
const Layout = () => {
	const [authenticating, setAuthenticating] = useState(false);
	const [currentSession, setCurrentSession] = useState<CognitoUserSession | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		Auth.currentSession()
			.then((session) => setCurrentSession(session))
			.catch(() => {
				navigate("/account-access");
			})
			.finally(() => {
				setAuthenticating(false);
			});
	}, [navigate]);

	if (authenticating) return <></>;

	return (
		<sessionContext.Provider value={currentSession}>
			<div className={styles.layoutWrapper}>
				<header className={styles.header}>
					<Link to="/">
						<span className="logo">H</span>
						<span className="logo-text">uman Bank</span>
					</Link>
					<AccountNavigationMenu />
				</header>
				<main className={styles.main}>
					<Outlet />
				</main>
				<footer className={styles.footer}>
					<p className="text-disclosure">This is footer text.</p>
				</footer>
			</div>
		</sessionContext.Provider>
	);
};

export default Layout;
