// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CreditAccountType = {
  "SAPIEN_CASHBACK": "SAPIEN_CASHBACK",
  "AMETHYST_POINTS": "AMETHYST_POINTS"
};

const TransactionType = {
  "DEPOSIT": "DEPOSIT",
  "WITHDRAWAL": "WITHDRAWAL",
  "TRANSFER": "TRANSFER"
};

const { User, CheckingAccount, SavingsAccount, CreditAccount, CreditTransaction, BankTransaction, UserCheckingAccount, UserSavingsAccount, UserCreditAccount } = initSchema(schema);

export {
  User,
  CheckingAccount,
  SavingsAccount,
  CreditAccount,
  CreditTransaction,
  BankTransaction,
  UserCheckingAccount,
  UserSavingsAccount,
  UserCreditAccount,
  CreditAccountType,
  TransactionType
};