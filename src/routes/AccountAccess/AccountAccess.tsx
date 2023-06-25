import { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./accountAccess.module.css";

const SignUpForm = () => (
	<>
		<button type="button" className={classNames("button-secondary", styles.formActionButton)}>
			Next
		</button>
	</>
);

const LoginForm = () => (
	<>
		<button type="button" className={classNames("button-primary", styles.formActionButton)}>
			Log In
		</button>
	</>
);

const AccountAccess = () => {
	const [returningMember, setReturningMember] = useState(false);

	return (
		<div className={styles.layoutWrapper}>
			<header className={styles.header}>
				<Link to="/">
					<span className="logo">H</span>
					<span className="logo-text">uman Bank</span>
				</Link>
			</header>
			<main>
				<div className={styles.formCard}>
					<h2>{returningMember ? "Existing Account" : "New Account"}</h2>
					<form>{returningMember ? <SignUpForm /> : <LoginForm />}</form>
					<button
						type="button"
						className={classNames("button-tertiary", styles.switchAccess)}
						onClick={() => {
							setReturningMember(!returningMember);
						}}
					>
						{returningMember ? "Need to sign up?" : "Already a member?"}
					</button>
				</div>
			</main>
			<footer className={styles.footer}>
				<p className="text-disclosure">This is disclosure text in the footer.</p>
			</footer>
		</div>
	);
};

export default AccountAccess;
