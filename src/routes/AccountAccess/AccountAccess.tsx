import { Link, useSearchParams } from "react-router-dom";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";

const SignUpForm = () => (
	<>
		<div className="form-line">
			<TextInput label="First Name" autoFocus />
			<TextInput label="Last Name" />
		</div>
		<TextInput label="Email" width="L" />
		<Button text="Next" variant="secondary" width="L" className={styles.formActionButton} />
	</>
);

const LoginForm = () => (
	<>
		<TextInput label="Email" width="L" autoFocus />
		<TextInput type="password" label="Password" width="L" style={{ letterSpacing: "1px" }} />
		<Button text="Log In" width="L" className={styles.formActionButton} linkTo="/customer/dashboard" />
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
					<Button
						text={returningMember ? "Need to sign up?" : "Already a member?"}
						variant="tertiary"
						onClick={() => {
							setSearchParams(returningMember ? { "sign-up": "true" } : {});
						}}
						className={styles.switchAccess}
					/>
				</div>
			</main>
			<footer className={styles.footer}>
				<p className="text-disclosure">This is disclosure text in the footer.</p>
			</footer>
		</div>
	);
};

export default AccountAccess;
