import { useEffect, useState } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
import classNames from "classnames";

import IconHamburger from "../../components/icons/Hamburger";
import IconX from "../../components/icons/IconX";
import Button from "../../components/Button";

import styles from "./layout.module.css";

/**
 * Header to use in the layout.
 */
export const Header = () => {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<button
					className={styles.hamburgerOpenButton}
					onClick={() => {
						setHamburgerOpen(true);
					}}
				>
					<IconHamburger />
				</button>
				<Link to="" className={classNames(styles.headerLogo, "logo")}>
					H
				</Link>
				<nav className={styles.navigation}>
					<ul className={styles.navigationLinks} data-hamburger-open={hamburgerOpen || undefined}>
						<button
							className={styles.hamburgerCloseButton}
							onClick={() => {
								setHamburgerOpen(false);
							}}
						>
							<IconX />
						</button>
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
