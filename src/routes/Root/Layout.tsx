import { useEffect } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";

import styles from "./layout.module.css";

/**
 * Header to use in the layout.
 */
export const Header = () => (
	<header className={styles.header}>
		<div className={styles.headerContent}>
			<Link to="">
				<span className="logo">H{/* <span className={styles.logoText}>uman Bank</span> */}</span>
			</Link>
			<nav className={styles.navigation}>
				<ul>
					<Link to="banking">
						<li>Banking</li>
					</Link>
					<Link to="credit-cards">
						<li>Credit Cards</li>
					</Link>
					<Link to="benefits">
						<li>Benefits</li>
					</Link>
					<Link to="faq">
						<li>FAQ</li>
					</Link>
				</ul>

				<div>
					<Link to="account-access">
						<button type="button" className="button-tertiary button-small">
							Sign Up
						</button>
					</Link>
					<Link to="account-access">
						<button type="button" className="button-primary button-large">
							Log In
						</button>
					</Link>
				</div>
			</nav>
		</div>
	</header>
);

/**
 * Footer to use in the layout.
 */
export const Footer = () => (
	<footer className={styles.footer}>
		<p>
			<Link to="legal">
				<span>
					<b>Privacy</b>
				</span>
			</Link>
			&nbsp;|&nbsp;
			<Link to="legal">
				<span>
					<b>Terms</b>
				</span>
			</Link>
		</p>
		<p>&#169;{new Date(Date.now()).getFullYear()} Human Bank</p>
	</footer>
);

/**
 * Layout component for the 'Root' application.
 */
const Layout = () => {
	const matches = useMatches();
	const navigate = useNavigate();

	useEffect(() => {
		if (matches.length === 1) {
			navigate("home");
		}
	}, [matches, navigate]);

	return (
		<>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
