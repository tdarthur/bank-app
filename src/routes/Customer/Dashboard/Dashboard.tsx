import classNames from "classnames";

import styles from "./dashboard.module.css";

type CheckingAccountInfo = {
	balance: number;
	cardNumberLast4Digits: string;
	transactions: unknown[];
};

const CheckingAccountCard = ({ balance, cardNumberLast4Digits }: CheckingAccountInfo) => (
	<div className={classNames("card", styles.accountCard)}>
		<h3>{`Checking Account ...${cardNumberLast4Digits}`}</h3>
		<p>${balance}</p>
	</div>
);

type SavingsAccountInfo = {
	balance: number;
	activity: unknown[];
};

const SavingsAccountCard = ({ balance }: SavingsAccountInfo) => (
	<div className={classNames("card", styles.accountCard)}>
		<h3>Savings Account</h3>
		<p>${balance}</p>
	</div>
);

type CreditCardAccountInfo = {
	balance: number;
	creditLimit: number;
	cardNumberLast4Digits: string;
	activity: unknown[];
};

const CreditCardAccountCard = ({ balance, creditLimit, cardNumberLast4Digits }: CreditCardAccountInfo) => (
	<div className={classNames("card", styles.accountCard)}>
		<h3>{`Credit Card ...${cardNumberLast4Digits}`}</h3>
		<p>{`$${balance} / $${creditLimit} limit`}</p>
	</div>
);

const Dashboard = () => {
	const checkingAccount: CheckingAccountInfo = { balance: 987, cardNumberLast4Digits: "1234", transactions: [] };
	const savingsAccount: SavingsAccountInfo = { balance: 6543, activity: [] };
	const creditCardAccounts: CreditCardAccountInfo[] = [
		{ balance: 21, creditLimit: 10000, cardNumberLast4Digits: "5678", activity: [] },
	];

	return (
		<>
			<section className={styles.accountSection}>
				<CheckingAccountCard {...checkingAccount} />
				<SavingsAccountCard {...savingsAccount} />
				{creditCardAccounts.map((creditCardAccount) => (
					<CreditCardAccountCard {...creditCardAccount} />
				))}
			</section>
		</>
	);
};

export default Dashboard;
