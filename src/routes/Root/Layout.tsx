import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

import IconHamburger from "../../components/icons/IconHamburger";
import IconX from "../../components/icons/IconX";
import Button from "../../components/Button";

import styles from "./layout.module.css";
import clsx from "clsx";

/**
 * Header to use in the layout.
 */
export const Header = () => {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	const location = useLocation();

	useEffect(() => {
		setHamburgerOpen(false);
	}, [location]);

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to="" className={classNames(styles.headerLogo, "logo")}>
					H
				</Link>
				<button
					className={clsx("icon-button", styles.hamburgerOpenButton)}
					onClick={() => {
						setHamburgerOpen(true);
					}}
				>
					<IconHamburger />
				</button>
				<nav className={styles.navigation} data-hamburger-open={hamburgerOpen || undefined}>
					<div className={styles.hamburgerHeader}>
						<button
							className={clsx("icon-button", styles.hamburgerCloseButton)}
							onClick={() => {
								setHamburgerOpen(false);
							}}
						>
							<IconX />
						</button>
					</div>
					<ul className={styles.navigationLinks}>
						<Link to="" className={styles.homeLink}>
							<li>Home</li>
						</Link>
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
		<Header />
		<main className={styles.main}>
			<Outlet />
		</main>
		<Footer />
	</>
);

export default Layout;
