import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import classNames from "classnames";

import { User } from "../../models";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";
import Form from "../../components/Form";
import MessageContainer from "../../components/MessageContainer";

type SignUpInfo = {
	fullName: string;
	email: string;
};

const fieldNames = {
	fullName: "full-name",
	email: "email",
	password: "password",
	passwordConfirmation: "password-confirmation",
	confirmationCode: "confirmation-code",
};

const emailValidationRegex =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordMinLength = 8;
const passwordMaxLength = 32;
const passwordSpecialCharacterRegex = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+= ]/;

const SignUpForm = () => {
	const [signUpStep, setSignUpStep] = useState<1 | 2 | 3>(1);
	const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({ fullName: "", email: "" });
	const [passwordLongEnough, setPasswordLongEnough] = useState(false);
	const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
	const [passwordContainsSpecialCharacter, setPasswordContainsSpecialCharacter] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [awaitingRedirect, setAwaitingRedirect] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const clearHubListener = Hub.listen("auth", ({ payload }) => {
			const { event } = payload;

			if (event === "autoSignIn") {
				DataStore.save(
					new User({
						email: signUpInfo.email,
						fullName: signUpInfo.fullName,
						bankAccounts: [],
						creditAccounts: [],
					}),
				)
					.then(() => {
						navigate("/customer/dashboard");
					})
					.catch((err) => {
						console.log(err);
					});
			} else if (event === "autoSignIn_failure") {
				console.log("failed to sign in");
			}
		});

		return () => {
			clearHubListener();
		};
	}, [navigate, signUpInfo]);

	return (
		<>
			{signUpStep === 1 && (
				<Form
					validators={{
						[fieldNames.email]: (value) => (emailValidationRegex.test(value) ? null : "Invalid email"),
					}}
					onSubmit={async ({ values }) => {
						const { [fieldNames.fullName]: fullName, email } = values;

						setSignUpInfo({ fullName, email });
						setSignUpStep(2);
					}}
					render={({ messages }) => (
						<>
							<MessageContainer messages={messages} className={styles.messageContainer} />

							<fieldset>
								<TextInput name={fieldNames.fullName} label="Full Name" width="L" autoFocus required />
								<TextInput name={fieldNames.email} label="Email" width="L" required />
							</fieldset>

							<Button type="submit" text="Next" variant="secondary" width="L" />
						</>
					)}
				/>
			)}

			{signUpStep === 2 && (
				<Form
					validators={{
						password: () =>
							passwordLongEnough && passwordContainsNumber && passwordContainsSpecialCharacter
								? null
								: "Invalid password",
						[fieldNames.passwordConfirmation]: () => (passwordsMatch ? null : "Passwords do not match"),
					}}
					onSubmit={async ({ values, pushErrorMessage, clearMessages }) =>
						Auth.signUp({
							username: signUpInfo.email,
							password: values.password,
							attributes: {
								email: signUpInfo.email,
							},
							autoSignIn: {
								enabled: true,
							},
						})
							.then(() => {
								setSignUpStep(3);
							})
							.catch((error) => {
								clearMessages();
								pushErrorMessage((error as Error).message);
							})
					}
					render={({ values, messages, submitting }) => {
						const handlePasswordChange = () => {
							const { password, [fieldNames.passwordConfirmation]: passwordConfirmation } = values;

							const newPasswordLongEnough =
								password.length >= passwordMinLength && password.length <= passwordMaxLength;
							const newPasswordContainsNumber = /\d/.test(password);
							const newPasswordContainsSpecialCharacter = passwordSpecialCharacterRegex.test(password);
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
										onChange={() => {
											handlePasswordChange();
										}}
										autoComplete="new-password"
										minLength={passwordMinLength}
										maxLength={passwordMaxLength}
										required
										autoFocus
									/>
									<TextInput
										name={fieldNames.passwordConfirmation}
										type="password"
										label="Confirm Password"
										width="L"
										onChange={() => {
											handlePasswordChange();
										}}
										autoComplete="new-password"
										minLength={passwordMinLength}
										maxLength={passwordMaxLength}
										required
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
									loadingIndicator={submitting}
									disabled={submitting}
								/>
							</>
						);
					}}
				/>
			)}

			{signUpStep === 3 && (
				<Form
					validators={{
						[fieldNames.confirmationCode]: (value) =>
							value.length === 6 ? null : "Confirmation code should be 6 digits",
					}}
					onSubmit={async ({ values, pushErrorMessage }) =>
						Auth.confirmSignUp(signUpInfo.email, values[fieldNames.confirmationCode])
							.then(() => {
								setAwaitingRedirect(true);
							})
							.catch(() => {
								pushErrorMessage("Incorrect code");
							})
					}
					render={({ messages, submitting }) => (
						<>
							<MessageContainer messages={messages} className={styles.messageContainer} />

							<TextInput
								name="confirmation-code"
								label="Confirmation Code"
								width="M"
								autoComplete="off"
								minLength={6}
								maxLength={6}
							/>

							<Button
								type="submit"
								text="Submit Code"
								variant="primary"
								width="L"
								className="display-block"
								loadingIndicator={submitting || awaitingRedirect}
								disabled={submitting || awaitingRedirect}
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
			render={({ messages, submitting }) => (
				<>
					<MessageContainer messages={messages} className={styles.messageContainer} />

					<TextInput name="email" label="Email" width="L" autoFocus required />
					<TextInput
						type="password"
						name="password"
						label="Password"
						width="L"
						autoComplete="current-password"
						required
					/>

					<Button
						type="submit"
						text="Sign In"
						width="L"
						loadingIndicator={submitting}
						disabled={submitting}
					/>
				</>
			)}
		/>
	);
};

const AccountAccess = () => {
	const [authenticating, setAuthenticating] = useState(true);

	const [searchParams, setSearchParams] = useSearchParams();
	const returningMember = !searchParams.has("sign-up");

	const navigate = useNavigate();

	useEffect(() => {
		Auth.currentSession()
			.then(() => {
				navigate("/customer/dashboard");
			})
			.catch(() => {
				console.log("No active session");
			})
			.finally(() => {
				setAuthenticating(false);
			});
	}, [navigate]);

	if (authenticating) return <></>;

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
