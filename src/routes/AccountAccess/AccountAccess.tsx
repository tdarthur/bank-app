import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./accountAccess.module.css";
import TextInput from "../../components/TextInput";

const SignUpForm = () => (
	<>
		<div className="form-line">
			<TextInput label="First Name" />
			<TextInput label="Last Name" />
		</div>
		<TextInput label="Email" width="L" />
		<button type="button" className={classNames("button-secondary", "width-L", styles.formActionButton)}>
			Next
		</button>
	</>
);

const LoginForm = () => (
	<>
		<TextInput label="Email" width="L" />
		<TextInput label="Password" width="L" />
		<button type="button" className={classNames("button-primary", "width-L", styles.formActionButton)}>
			Log In
		</button>
	</>
);

const AccountAccess = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const returningMember = !searchParams.has("sign-up");

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
					<h2>{returningMember ? "Log In" : "Sign Up"}</h2>
					<form>{returningMember ? <LoginForm /> : <SignUpForm />}</form>
					<button
						type="button"
						className={classNames("button-tertiary", styles.switchAccess)}
						onClick={() => {
							setSearchParams(returningMember ? { "sign-up": "true" } : {});
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
