import classNames from "classnames";

import styles from "./dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import sessionContext from "../../../contexts/sessionContext";
import IconX from "../../../components/IconX";

const welcomeMessages: string[] = [
	"Welcome back _name_! Here's a look at your accounts.",
	"Good evening _name_! Here are your accounts.",
	"Fancy to see you here _name_. I've got your accounts here for you.",
];

type CardProps = {
	isOpen: boolean;
	openCard: () => void;
	closeCard: () => void;
};

type CheckingAccountInfo = {
	balance: number;
	cardNumberLast4Digits: string;
	transactions: unknown[];
	accountId: string;
};

type CheckingAccountCardProps = CardProps & {
	accountInfo: CheckingAccountInfo;
};

const CheckingAccountCard = ({ isOpen, openCard, closeCard, accountInfo }: CheckingAccountCardProps) => (
	<div>
		<button
			className={classNames("card", styles.accountCard, styles.accountCardChecking)}
			onClick={openCard}
			data-open={isOpen}
			disabled={isOpen}
		>
			<div className={styles.accountCardBackdrop} />
			<h3 className={styles.accountCardHeader}>Account Balance</h3>
			<p className={classNames(styles.accountCardBalance, styles.currency)}>{accountInfo.balance}</p>
			<p className={styles.accountCardAccountType}>Gamer Checking</p>
			<button className={styles.accountCardCloseButton} tabIndex={isOpen ? 0 : -1} onClick={closeCard}>
				<IconX />
			</button>
		</button>
		<div className={classNames("card", styles.accountDetailsSection)} data-open={isOpen}>
			<p>Hey</p>
		</div>
	</div>
);

type SavingsAccountInfo = {
	balance: number;
	activity: unknown[];
	accountId: string;
};

type SavingsAccountCardProps = CardProps & {
	accountInfo: SavingsAccountInfo;
};

const SavingsAccountCard = ({ isOpen, openCard, closeCard, accountInfo }: SavingsAccountCardProps) => (
	<div>
		<button
			className={classNames("card", styles.accountCard, styles.accountCardSavings)}
			onClick={openCard}
			data-open={isOpen}
			disabled={isOpen}
		>
			<div className={styles.accountCardBackdrop} />
			<h3 className={styles.accountCardHeader}>Account Balance</h3>
			<p className={classNames(styles.accountCardBalance, styles.currency)}>{accountInfo.balance}</p>
			<p className={styles.accountCardAccountType}>Personal Savings</p>
			<button className={styles.accountCardCloseButton} tabIndex={isOpen ? 0 : -1} onClick={closeCard}>
				<IconX />
			</button>
		</button>
	</div>
);

type CreditCardAccountInfo = {
	balance: number;
	creditLimit: number;
	cardNumberLast4Digits: string;
	activity: unknown[];
	accountId: string;
};

type CreditCardAccountCardProps = CardProps & {
	accountInfo: CreditCardAccountInfo;
};

const CreditCardAccountCard = ({ isOpen, openCard, closeCard, accountInfo }: CreditCardAccountCardProps) => (
	<div>
		<button
			className={classNames("card", styles.accountCard, styles.accountCardCredit)}
			onClick={openCard}
			data-open={isOpen}
			disabled={isOpen}
		>
			<div className={styles.accountCardBackdrop} />
			<h3 className={styles.accountCardHeader}>Account Balance</h3>
			<p className={classNames(styles.accountCardBalance, styles.currency)}>
				{accountInfo.balance} / {accountInfo.creditLimit} limit
			</p>
			<p className={styles.accountCardAccountType}>Sapien Rewards Credit Card</p>

			{/* <h3>{`ending in ${accountInfo.cardNumberLast4Digits}`}</h3> */}
			<button className={styles.accountCardCloseButton} tabIndex={isOpen ? 0 : -1} onClick={closeCard}>
				<IconX />
			</button>
		</button>
	</div>
);

const Dashboard = () => {
	const [welcomeMessage, setWelcomeMessage] = useState<string>();
	const [openAccount, setOpenAccount] = useState<string>();

	const session = useContext(sessionContext);
	useEffect(() => {
		let randomKey = 0;
		const jwtToken = session?.getAccessToken().getJwtToken();
		if (jwtToken) {
			for (let i = 0; i < jwtToken.length; i++) {
				randomKey += jwtToken.charCodeAt(i);
			}

			// TODO: use the customer name here instead of "Guy"
			setWelcomeMessage(welcomeMessages[randomKey % welcomeMessages.length].replace("_name_", "Guy"));
		}
	}, [session]);

	const checkingAccount: CheckingAccountInfo = {
		balance: 987,
		cardNumberLast4Digits: "1234",
		transactions: [],
		accountId: "1",
	};
	const savingsAccount: SavingsAccountInfo = { balance: 6543, activity: [], accountId: "2" };
	const creditCardAccounts: CreditCardAccountInfo[] = [
		{ balance: 21, creditLimit: 10000, cardNumberLast4Digits: "5678", activity: [], accountId: "3" },
	];

	return (
		<>
			<div className={styles.mainContent}>
				<section className={styles.accountSection}>
					<h3>{welcomeMessage}</h3>
					<CheckingAccountCard
						isOpen={openAccount === checkingAccount.accountId}
						openCard={() => {
							if (openAccount !== checkingAccount.accountId) {
								setOpenAccount(checkingAccount.accountId);
							}
						}}
						closeCard={() => setOpenAccount("")}
						accountInfo={checkingAccount}
					/>
					<SavingsAccountCard
						isOpen={openAccount === savingsAccount.accountId}
						openCard={() => {
							if (openAccount !== savingsAccount.accountId) {
								setOpenAccount(savingsAccount.accountId);
							}
						}}
						closeCard={() => setOpenAccount(undefined)}
						accountInfo={savingsAccount}
					/>
					{creditCardAccounts.map((creditCardAccount) => (
						<CreditCardAccountCard
							isOpen={openAccount === creditCardAccount.accountId}
							openCard={() => {
								if (openAccount !== creditCardAccount.accountId) {
									setOpenAccount(creditCardAccount.accountId);
								}
							}}
							closeCard={() => setOpenAccount(undefined)}
							accountInfo={creditCardAccount}
							key={creditCardAccount.accountId}
						/>
					))}
				</section>
			</div>
		</>
	);
};

export default Dashboard;
