import { useContext, useEffect, useReducer, useState } from "react";

import { CheckingAccount, SavingsAccount, CreditAccount } from "../../../models";
import userSessionContext from "../../../contexts/userSessionContext";
import { DataStore } from "@aws-amplify/datastore";

import styles from "./dashboard.module.css";
import { CheckingAccountCard, CreditCardAccountCard, SavingsAccountCard } from "./AccountCard";
import Button from "../../../components/Button";

const welcomeMessages: string[] = [
	"Welcome back _name_! Here's a look at your accounts.",
	"Good evening _name_! Here are your accounts.",
	"Fancy to see you here _name_. I've got your accounts ready for you.",
];

const animationReducer = (animationCount: number, increment: -1 | 1) => animationCount + increment;

type Accounts = {
	checkingAccounts: CheckingAccount[];
	savingsAccounts: SavingsAccount[];
	creditAccounts: CreditAccount[];
};

const Dashboard = () => {
	const [accounts, setAccounts] = useState<Accounts>({
		checkingAccounts: [],
		savingsAccounts: [],
		creditAccounts: [],
	});
	const [preloading, setPreloading] = useState(true);
	const [welcomeMessage, setWelcomeMessage] = useState<string>();
	const [openAccount, setOpenAccount] = useState<string>();
	const [animationCount, dispatchAnimationUpdate] = useReducer(animationReducer, 0);

	const { cognitoSession, user } = useContext(userSessionContext);

	useEffect(() => {
		const interval = setInterval(() => {
			setPreloading(false);
		}, 1000);

		return () => clearInterval(interval);
	});

	useEffect(() => {
		(async () => {
			setAccounts({
				checkingAccounts: await DataStore.query(CheckingAccount),
				savingsAccounts: await DataStore.query(SavingsAccount),
				creditAccounts: await DataStore.query(CreditAccount),
			});

			setPreloading(false);
		})();
	}, []);

	useEffect(() => {
		if (cognitoSession && user) {
			(async () => {
				setAccounts({
					checkingAccounts: await DataStore.query(CheckingAccount),
					savingsAccounts: await DataStore.query(SavingsAccount),
					creditAccounts: await DataStore.query(CreditAccount),
				});

				setPreloading(false);
			})();

			let randomKey = 0;
			const jwtToken = cognitoSession?.getAccessToken().getJwtToken();
			if (jwtToken) {
				for (let i = 0; i < jwtToken.length; i++) {
					randomKey += jwtToken.charCodeAt(i);
				}

				const firstName = user.fullName.split(" ")[0];
				setWelcomeMessage(welcomeMessages[randomKey % welcomeMessages.length].replace("_name_", firstName));
			}
		}
	}, [cognitoSession, user]);

	const pushAnimation = () => dispatchAnimationUpdate(1);
	const popAnimation = () => dispatchAnimationUpdate(-1);

	const deleteAccount = async (
		accountType: typeof CheckingAccount | typeof SavingsAccount | typeof CreditAccount,
		id: string,
	) => {
		if (accountType === CheckingAccount) {
			DataStore.delete(accountType, id);
		} else if (accountType === SavingsAccount) {
			DataStore.delete(accountType, id);
		} else if (accountType === CreditAccount) {
			DataStore.delete(accountType, id);
		}
		setAccounts({
			checkingAccounts: accounts.checkingAccounts.filter((account) => account.id !== id),
			savingsAccounts: accounts.savingsAccounts.filter((account) => account.id !== id),
			creditAccounts: accounts.creditAccounts.filter((account) => account.id !== id),
		});
	};

	return (
		<>
			<div className={styles.mainContent} data-preloading={preloading || undefined}>
				<section className={styles.accountSection}>
					<h3 className={styles.welcomeMessage}>{welcomeMessage}</h3>
					{accounts.checkingAccounts.map((account) => (
						<CheckingAccountCard
							isOpen={openAccount === account.id}
							isAnimating={animationCount > 0}
							openCard={() => {
								if (openAccount !== account.id) {
									setOpenAccount(account.id);
								}
							}}
							closeCard={() => setOpenAccount("")}
							account={account}
							pushAnimation={pushAnimation}
							popAnimation={popAnimation}
							deleteAccount={() => deleteAccount(CheckingAccount, account.id)}
							key={account.id}
						/>
					))}

					{accounts.savingsAccounts.map((account) => (
						<SavingsAccountCard
							isOpen={openAccount === account.id}
							isAnimating={animationCount > 0}
							openCard={() => {
								if (openAccount !== account.id) {
									setOpenAccount(account.id);
								}
							}}
							closeCard={() => setOpenAccount(undefined)}
							account={account}
							pushAnimation={pushAnimation}
							popAnimation={popAnimation}
							deleteAccount={() => deleteAccount(SavingsAccount, account.id)}
							key={account.id}
						/>
					))}

					{accounts.creditAccounts.map((account) => (
						<CreditCardAccountCard
							isOpen={openAccount === account.id}
							isAnimating={animationCount > 0}
							openCard={() => {
								if (openAccount !== account.id) {
									setOpenAccount(account.id);
								}
							}}
							closeCard={() => setOpenAccount(undefined)}
							account={account}
							pushAnimation={pushAnimation}
							popAnimation={popAnimation}
							deleteAccount={() => deleteAccount(CreditAccount, account.id)}
							key={account.id}
						/>
					))}
				</section>
				<section className={styles.newAccountPrompt}>
					<h4>Looking to do more with your finances?</h4>
					<Button text="Open a new account today" variant="secondary" width="XL" linkTo="../add-account" />
				</section>
			</div>
		</>
	);
};

export default Dashboard;
