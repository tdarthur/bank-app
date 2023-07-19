import classNames from "classnames";

import styles from "./dashboard.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
import sessionContext from "../../../contexts/sessionContext";
import IconX from "../../../components/IconX";
import { Link } from "react-router-dom";

const welcomeMessages: string[] = [
	"Welcome back _name_! Here's a look at your accounts.",
	"Good evening _name_! Here are your accounts.",
	"Fancy to see you here _name_. I've got your accounts ready for you.",
];

type TransactionContainerProps = {
	transactions: Transaction[];
};

const TransactionContainer = ({ transactions }: TransactionContainerProps) => (
	<div className={styles.transactionContainer}>
		{transactions.map((transaction) => (
			<div>{transaction.amount}</div>
		))}
	</div>
);

type AccountCardProps = {
	type: "checking" | "savings" | "credit";
	accountBalance: React.ReactNode;
	accountName: string;
	isOpen: boolean;
	isAnimating: boolean;
	openCard: () => void;
	closeCard: () => void;
	pushAnimation: () => void;
	popAnimation: () => void;
};

const AccountCard = ({
	type,
	accountBalance,
	accountName,
	isOpen,
	isAnimating,
	openCard,
	closeCard,
	pushAnimation,
	popAnimation,
}: AccountCardProps) => (
	<div className={styles.accountContainer}>
		<button
			className={classNames(
				"card",
				styles.accountCard,
				styles.accountCardChecking,
				type === "checking" && styles.accountCardChecking,
				type === "savings" && styles.accountCardSavings,
				type === "credit" && styles.accountCardCredit,
			)}
			onClick={() => {
				if (!isAnimating) openCard();
			}}
			onAnimationStart={() => {
				console.log("starting animation");
				pushAnimation();
			}}
			onAnimationEnd={() => {
				console.log("ending animation");
				popAnimation();
			}}
			disabled={isOpen || isAnimating}
			data-open={isOpen}
		>
			<div className={styles.accountCardBackdrop} />
			<h3 className={styles.accountCardHeader}>Account Balance</h3>
			{accountBalance}
			<p className={styles.accountCardAccountType}>{accountName}</p>
			<button className={styles.accountCardCloseButton} tabIndex={isOpen ? 0 : -1} onClick={closeCard}>
				<IconX />
			</button>
		</button>
		<div className={classNames("card", styles.accountDetailsSection)} data-open={isOpen}>
			<div>
				<Link to="#"></Link>
			</div>
			{/* <TransactionContainer transactions={accountInfo.transactions} /> */}
		</div>
	</div>
);

type SpecificAccountProps = Omit<AccountCardProps, "type" | "accountBalance" | "accountName">;

type Transaction = {
	amount: number;
};

type CheckingAccountInfo = {
	balance: number;
	cardNumberLast4Digits: string;
	transactions: Transaction[];
	accountId: string;
};

type CheckingAccountCardProps = {
	accountInfo: CheckingAccountInfo;
} & SpecificAccountProps;

const CheckingAccountCard = ({ accountInfo, ...accountCardProps }: CheckingAccountCardProps) => (
	<AccountCard
		type="checking"
		accountBalance={<p className={classNames(styles.accountCardBalance, styles.currency)}>{accountInfo.balance}</p>}
		accountName="Gamer Checking"
		{...accountCardProps}
	/>
);

type SavingsAccountInfo = {
	balance: number;
	transactions: Transaction[];
	accountId: string;
};

type SavingsAccountCardProps = {
	accountInfo: SavingsAccountInfo;
} & SpecificAccountProps;

const SavingsAccountCard = ({ accountInfo, ...accountCardProps }: SavingsAccountCardProps) => (
	<AccountCard
		type="savings"
		accountBalance={<p className={classNames(styles.accountCardBalance, styles.currency)}>{accountInfo.balance}</p>}
		accountName="Savings"
		{...accountCardProps}
	/>
);

type CreditCardAccountInfo = {
	balance: number;
	creditLimit: number;
	cardNumberLast4Digits: string;
	transactions: Transaction[];
	accountId: string;
};

type CreditCardAccountCardProps = {
	accountInfo: CreditCardAccountInfo;
} & SpecificAccountProps;

const CreditCardAccountCard = ({ accountInfo, ...accountCardProps }: CreditCardAccountCardProps) => (
	<AccountCard
		type="credit"
		accountBalance={
			<p className={styles.accountCardBalance}>
				<span className={styles.currency}>{accountInfo.balance}</span> /{" "}
				<span className={styles.currency}>{accountInfo.creditLimit}</span> limit
			</p>
		}
		accountName="Sapien Rewards Credit Card"
		{...accountCardProps}
	/>
);

const animationReducer = (animationCount: number, increment: -1 | 1) => animationCount + increment;

const Dashboard = () => {
	const [welcomeMessage, setWelcomeMessage] = useState<string>();
	const [openAccount, setOpenAccount] = useState<string>();
	const [animationCount, dispatchAnimationUpdate] = useReducer(animationReducer, 0);

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
	const savingsAccount: SavingsAccountInfo = { balance: 6543, transactions: [], accountId: "2" };
	const creditCardAccounts: CreditCardAccountInfo[] = [
		{ balance: 21, creditLimit: 10000, cardNumberLast4Digits: "5678", transactions: [], accountId: "3" },
	];

	const pushAnimation = () => dispatchAnimationUpdate(1);
	const popAnimation = () => dispatchAnimationUpdate(-1);

	console.log(animationCount);

	return (
		<>
			<div className={styles.mainContent}>
				<section className={styles.accountSection}>
					<h3 className={styles.welcomeMessage}>{welcomeMessage}</h3>
					<CheckingAccountCard
						isOpen={openAccount === checkingAccount.accountId}
						isAnimating={animationCount > 0}
						openCard={() => {
							if (openAccount !== checkingAccount.accountId) {
								setOpenAccount(checkingAccount.accountId);
							}
						}}
						closeCard={() => setOpenAccount("")}
						accountInfo={checkingAccount}
						pushAnimation={pushAnimation}
						popAnimation={popAnimation}
					/>

					<SavingsAccountCard
						isOpen={openAccount === savingsAccount.accountId}
						isAnimating={animationCount > 0}
						openCard={() => {
							if (openAccount !== savingsAccount.accountId) {
								setOpenAccount(savingsAccount.accountId);
							}
						}}
						closeCard={() => setOpenAccount(undefined)}
						accountInfo={savingsAccount}
						pushAnimation={pushAnimation}
						popAnimation={popAnimation}
					/>

					{creditCardAccounts.map((creditCardAccount) => (
						<CreditCardAccountCard
							isOpen={openAccount === creditCardAccount.accountId}
							isAnimating={animationCount > 0}
							openCard={() => {
								if (openAccount !== creditCardAccount.accountId) {
									setOpenAccount(creditCardAccount.accountId);
								}
							}}
							closeCard={() => setOpenAccount(undefined)}
							accountInfo={creditCardAccount}
							key={creditCardAccount.accountId}
							pushAnimation={pushAnimation}
							popAnimation={popAnimation}
						/>
					))}
				</section>
			</div>
		</>
	);
};

export default Dashboard;
