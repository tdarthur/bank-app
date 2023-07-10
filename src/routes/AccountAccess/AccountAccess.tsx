import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";
import Form from "../../components/Form";
import MessageContainer from "../../components/MessageContainer";

type SignUpInfo = {
	firstName: string;
	lastName: string;
	email: string;
};

const fieldNames = {
	firstName: "first-name",
	lastName: "last-name",
	email: "email",
	password: "password",
	passwordConfirmation: "password-confirmation",
	confirmationCode: "confirmation-code",
};

const emailValidationRegex =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const SignUpForm = () => {
	const [formPage, setFormPage] = useState(1);
	const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({ firstName: "", lastName: "", email: "" });
	const [passwordLongEnough, setPasswordLongEnough] = useState(false);
	const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
	const [passwordContainsSpecialCharacter, setPasswordContainsSpecialCharacter] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const clearHubListener = Hub.listen("auth", ({ payload }) => {
			const { event } = payload;

			if (event === "autoSignIn") {
				navigate("/customer/dashboard");
			} else if (event === "autoSignIn_failure") {
				console.log("failed to sign in");
			}
		});

		return () => {
			clearHubListener();
		};
	}, [navigate]);

	return (
		<>
			{formPage === 1 && (
				<Form
					validators={{
						[fieldNames.firstName]: (value) => value.length > 0,
					}}
					onSubmit={async ({ values, pushErrorMessage, clearMessages }) => {
						clearMessages();

						const { [fieldNames.firstName]: firstName, [fieldNames.lastName]: lastName, email } = values;

						if (firstName && lastName && emailValidationRegex.test(email)) {
							setSignUpInfo({ firstName, lastName, email });
							setFormPage(2);
						} else {
							pushErrorMessage("Please fill out all required fields");
						}
					}}
					render={({ messages }) => (
						<>
							<MessageContainer messages={messages} className={styles.messageContainer} />

							<fieldset>
								<div className="form-line">
									<TextInput name={fieldNames.firstName} label="First Name" autoFocus />
									<TextInput name={fieldNames.lastName} label="Last Name" />
								</div>
								<TextInput name={fieldNames.email} label="Email" width="L" />
							</fieldset>

							<Button
								type="submit"
								text="Next"
								variant="secondary"
								width="L"
								//  disabled={false}
							/>
						</>
					)}
				/>
			)}

			{formPage === 2 && (
				<Form
					onSubmit={async ({ values }) => {
						const { password } = values;

						return Auth.signUp({
							username: signUpInfo.email,
							password,
							attributes: {
								email: signUpInfo.email,
							},
							autoSignIn: {
								enabled: true,
							},
						})
							.then(() => {
								setFormPage(3);
							})
							.catch((error) => {
								console.error("error signing up", error);
							});
					}}
					render={({ values, messages }) => {
						const validatePassword = () => {
							const { password, [fieldNames.passwordConfirmation]: passwordConfirmation } = values;

							const newPasswordLongEnough = password.length >= 8 && password.length < 32;
							const newPasswordContainsNumber = /\d/.test(password);
							const newPasswordContainsSpecialCharacter = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+= ]/.test(
								password,
							);
							const newPasswordsMatch =
								password === passwordConfirmation ||
								!(
									newPasswordContainsNumber &&
									newPasswordContainsNumber &&
									newPasswordContainsSpecialCharacter
								);

							setPasswordLongEnough(newPasswordLongEnough);
							setPasswordContainsNumber(newPasswordContainsNumber);
							setPasswordContainsSpecialCharacter(newPasswordContainsSpecialCharacter);
							setPasswordsMatch(newPasswordsMatch);

							return (
								newPasswordLongEnough &&
								newPasswordContainsNumber &&
								newPasswordContainsSpecialCharacter &&
								newPasswordsMatch
							);
						};

						return (
							<>
								<MessageContainer messages={messages} className={styles.messageContainer} />

								<fieldset>
									<TextInput
										name={fieldNames.password}
										type="password"
										label="Password"
										width="L"
										maxLength={32}
										autoComplete="new-password"
										onChange={() => {
											validatePassword();
										}}
									/>
									<TextInput
										name={fieldNames.passwordConfirmation}
										type="password"
										label="Confirm Password"
										width="L"
										maxLength={32}
										autoComplete="new-password"
										onChange={() => {
											validatePassword();
										}}
									/>
									{(!passwordLongEnough ||
										!passwordContainsNumber ||
										!passwordContainsSpecialCharacter ||
										!passwordsMatch) && (
										<ul className={styles.passwordRequirements}>
											<li
												className={
													passwordLongEnough &&
													passwordContainsNumber &&
													passwordContainsSpecialCharacter
														? styles.valid
														: undefined
												}
											>
												Password must contain:
											</li>
											<ul>
												<li className={passwordLongEnough ? styles.valid : undefined}>
													Between 8 and 32 characters
												</li>
												<li className={passwordContainsNumber ? styles.valid : undefined}>
													At least one number
												</li>
												<li
													className={
														passwordContainsSpecialCharacter ? styles.valid : undefined
													}
												>
													At least one special character
												</li>
											</ul>
											<li className={passwordsMatch ? styles.valid : undefined}>
												Passwords must match
											</li>
										</ul>
									)}
								</fieldset>

								<Button
									type="submit"
									text="Create Account"
									variant="primary"
									width="L"
									className="display-block"
									// disabled={true}
								/>
							</>
						);
					}}
				/>
			)}

			{formPage === 3 && (
				<Form
					onSubmit={async ({ values, pushErrorMessage }) =>
						Auth.confirmSignUp(signUpInfo.email, values.confirmationCode).catch(() => {
							pushErrorMessage("Incorrect code");
						})
					}
					render={({ messages }) => (
						<>
							<MessageContainer messages={messages} className={styles.messageContainer} />

							<TextInput
								name="confirmation-code"
								label="Confirmation Code"
								width="M"
								maxLength={6}
								autoComplete="off"
							/>

							<Button
								type="submit"
								text="Submit Code"
								variant="primary"
								width="L"
								className="display-block"
								// disabled={false}
							/>
						</>
					)}
				/>
			)}
		</>
	);
};

const LoginForm = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const clearHubListener = Hub.listen("auth", ({ payload }) => {
			const { event } = payload;

			if (event === "signIn") {
				navigate("/customer/dashboard");
			}
		});

		return () => {
			clearHubListener();
		};
	}, [navigate]);

	return (
		<Form
			onSubmit={async ({ values, pushErrorMessage, clearMessages }) => {
				clearMessages();

				const { email, password } = values;
				try {
					await Auth.signIn(email, password);
				} catch (error) {
					if ((error as Error).message) {
						pushErrorMessage((error as Error).message);
					}
				}
			}}
			render={({ messages, submitted }) => (
				<>
					<MessageContainer messages={messages} className={styles.messageContainer} />

					<TextInput name="email" label="Email" width="L" autoFocus required />
					<TextInput
						type="password"
						name="password"
						label="Password"
						width="L"
						maxLength={32}
						autoComplete="current-password"
						required
					/>

					<Button type="submit" text="Sign In" width="L" loadingIndicator={submitted} disabled={submitted} />
				</>
			)}
		/>
	);
};

const AccountAccess = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const returningMember = !searchParams.has("sign-up");

	const navigate = useNavigate();

	useEffect(() => {
		Auth.currentSession()
			.then((user) => {
				console.log("signed in!", user);
				navigate("/customer/dashboard");
			})
			.catch(() => {
				console.log("Not signed in!");
			});
	}, [navigate]);

	return (
		<div className={styles.layoutWrapper}>
			<header className={styles.header}>
				<Link to="/">
					<span className="logo">H</span>
					<span className="logo-text">uman Bank</span>
				</Link>
			</header>
			<main>
				<div className={classNames("card", styles.formCard)}>
					<h2>{returningMember ? "Sign In" : "Sign Up"}</h2>
					{returningMember ? <LoginForm /> : <SignUpForm />}
					<div
						className={styles.switchAccessContainer}
						style={{ justifyContent: returningMember ? "left" : "right" }}
					>
						<Button
							text={returningMember ? "Need to sign up?" : "Already a member?"}
							variant="tertiary"
							onClick={() => {
								setSearchParams(returningMember ? { "sign-up": "true" } : {});
							}}
						/>
					</div>
				</div>
			</main>
			<footer className={styles.footer}>
				<p className="text-disclosure">This is disclosure text in the footer.</p>
			</footer>
		</div>
	);
};

export default AccountAccess;
