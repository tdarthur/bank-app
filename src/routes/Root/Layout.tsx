import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import clsx from "clsx";

import IconHamburger from "../../components/icons/IconHamburger";
import IconX from "../../components/icons/IconX";
import Button from "../../components/Button";

import styles from "./layout.module.css";

/**
 * Header to use in the layout.
 */
export const Header = () => {
	const [hamburgerOpen, setHamburgerOpen] = useState(true);

	const location = useLocation();

	useEffect(() => {
		setHamburgerOpen(false);
	}, [location]);

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<span className="logo-text">
					<Link to="" className="logo-link">
						<span className={clsx(styles.headerLogo, "logo")}>H</span>
						<span className={styles.logoText}>uman Bank</span>
					</Link>
				</span>
				<button
					className={clsx("icon-button", styles.hamburgerToggleButton)}
					onClick={() => {
						setHamburgerOpen(!hamburgerOpen);
					}}
				>
					{hamburgerOpen ? <IconX /> : <IconHamburger />}
				</button>
				<nav className={styles.navigation} data-hamburger-open={hamburgerOpen || undefined}>
					<ul className={styles.navigationLinks}>
						<li>
							<Link to="" className={styles.homeLink}>
								Home
							</Link>
						</li>
						<li>
							<Link to="banking">Banking</Link>
						</li>
						<li>
							<Link to="credit-cards">Credit Cards</Link>
						</li>
						<li>
							<Link to="benefits">Benefits</Link>
						</li>
						<li>
							<Link to="faq">FAQ</Link>
						</li>
					</ul>

					<div className={styles.accountButtons}>
						<Button text="Sign In" variant="tertiary" width="S" linkTo="/account-access" />
						<Button className={styles.signUpButton} text="Sign Up" linkTo="/account-access?sign-up=true" />
					</div>
				</nav>
			</div>
		</header>
	);
};

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
const Layout = () => (
	<>
		{createPortal(<Header />, document.querySelector("#header") as HTMLDivElement)}
		<main className={styles.main}>
			<Outlet />
		</main>
		<Footer />
	</>
);

export default Layout;
