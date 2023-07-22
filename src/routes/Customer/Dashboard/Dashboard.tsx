import { useContext, useEffect, useReducer, useState } from "react";

import { AsyncCollection } from "@aws-amplify/datastore";
import { CheckingAccount, SavingsAccount, CreditAccount } from "../../../models";
import userSessionContext from "../../../contexts/userSessionContext";

import styles from "./dashboard.module.css";
import { CheckingAccountCard, CreditCardAccountCard, SavingsAccountCard } from "./AccountCard";

const welcomeMessages: string[] = [
	"Welcome back _name_! Here's a look at your accounts.",
	"Good evening _name_! Here are your accounts.",
	"Fancy to see you here _name_. I've got your accounts ready for you.",
];

const animationReducer = (animationCount: number, increment: -1 | 1) => animationCount + increment;

const Dashboard = () => {
	const [welcomeMessage, setWelcomeMessage] = useState<string>();
	const [openAccount, setOpenAccount] = useState<string>();
	const [animationCount, dispatchAnimationUpdate] = useReducer(animationReducer, 0);

	const { cognitoSession, user } = useContext(userSessionContext);

	useEffect(() => {
		if (cognitoSession && user) {
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

	const checkingAccounts: CheckingAccount[] = [
		{
			id: "1",
			accountNumber: "1",
			cardNumber: "0000-0009-8765-4321",
			balance: 987,
			creationDate: "",
			users: new AsyncCollection([]),
			transactions: new AsyncCollection([]),
		} as unknown as CheckingAccount,
	];
	const savingsAccounts: SavingsAccount[] = [
		{
			id: "2",
			accountNumber: "2",
			balance: 6543,
			creationDate: "",
			users: new AsyncCollection([]),
			transactions: new AsyncCollection([]),
		} as unknown as SavingsAccount,
	];
	const creditCardAccounts: CreditAccount[] = [
		{
			id: "3",
			accountNumber: "3",
			cardNumber: "0000-0001-2345-6789",
			creditAccountType: "SAPIEN_CASHBACK",
			balance: 21,
			creditLimit: 10_000,
			rewardsPoints: 14,
			creationDate: "",
			users: new AsyncCollection([]),
			transactions: new AsyncCollection([]),
		} as unknown as CreditAccount,
	];

	const pushAnimation = () => dispatchAnimationUpdate(1);
	const popAnimation = () => dispatchAnimationUpdate(-1);

	return (
		<>
			<div className={styles.mainContent}>
				<section className={styles.accountSection}>
					<h3 className={styles.welcomeMessage}>{welcomeMessage}</h3>
					{checkingAccounts.map((account) => (
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
							key={account.accountNumber}
						/>
					))}

					{savingsAccounts.map((account) => (
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
							key={account.accountNumber}
						/>
					))}

					{creditCardAccounts.map((account) => (
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
							key={account.accountNumber}
						/>
					))}
				</section>
			</div>
		</>
	);
};

export default Dashboard;
