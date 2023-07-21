// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransactionType = {
  "DEPOSIT": "DEPOSIT",
  "WITHDRAWAL": "WITHDRAWAL",
  "TRANSFER": "TRANSFER"
};

const CreditAccountType = {
  "SAPIEN_CASHBACK": "SAPIEN_CASHBACK",
  "AMETHYST_POINTS": "AMETHYST_POINTS"
};

const BankAccountType = {
  "CHECKING": "CHECKING",
  "SAVINGS": "SAVINGS"
};

const { User, BankAccount, CreditAccount, BankTransaction, CreditTransaction, UserBankAccount, UserCreditAccount } = initSchema(schema);

export {
  User,
  BankAccount,
  CreditAccount,
  BankTransaction,
  CreditTransaction,
  UserBankAccount,
  UserCreditAccount,
  TransactionType,
  CreditAccountType,
  BankAccountType
};