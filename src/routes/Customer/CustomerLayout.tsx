import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { DataStore } from "@aws-amplify/datastore";

import { User } from "../../models";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import userSessionContext from "../../contexts/userSessionContext";

import styles from "./customerLayout.module.css";
import IconProfile from "../../components/icons/IconProfile";

const LoadingOverlay = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
	return (
		<div className={styles.loadingOverlay} {...props}>
			<LoadingSpinner width={64} height={64} />
			<h3>Getting your accounts ready</h3>
		</div>
	);
};

const AccountNavigationMenu = () => {
	const [displayMenu, setDisplayMenu] = useState(false);

	const navigationListRef = useRef<HTMLUListElement>(null);

	const navigate = useNavigate();

	const location = useLocation();
	useEffect(() => {
		setDisplayMenu(false);
	}, [location]);

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
				text={<IconProfile strokeWidth={1.2} width={32} height={32} />}
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
	const [fetchingData, setFetchingData] = useState(false);
	const [cognitoSession, setCognitoSession] = useState<CognitoUserSession | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		setFetchingData(true);

		let aborted = false;
		(async () => {
			let session = null;
			let email = "";
			try {
				session = await Auth.currentSession();

				const userInfo = await Auth.currentUserInfo();
				if (!("attributes" in userInfo) || !("email" in userInfo.attributes)) throw Error("Invalid user info");
				email = userInfo.attributes.email as string;
			} catch (error) {
				console.error(error);
			}
			if (aborted) return;

			let user = null;
			try {
				[user] = await DataStore.query(User, (user) => user.email.eq(email));
			} catch (error) {
				console.error(error);
			}
			if (aborted) return;

			setCognitoSession(session);
			setUser(user);
			setFetchingData(false);
		})();

		return () => {
			aborted = true;
		};
	}, [navigate]);

	return (
		<userSessionContext.Provider value={{ cognitoSession, user }}>
			<LoadingOverlay data-ready={!fetchingData || undefined} />

			{!fetchingData && (
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
			)}
		</userSessionContext.Provider>
	);
};

export default Layout;
