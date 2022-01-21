import { config } from 'dotenv';
config();

export const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET_KEY,
  EMAIL_VERIFICATION,
} = process.env;

export const DB_PORT = Number(process.env.DB_PORT);

export const USER_ROLES = {
  user: 'user',
  admin: 'admin',
};

export const CONTRACTS_PLANS_PERIOD = {
  year: 'year',
};

export const CONTRACTS_STATUSES = {
  processing: 'processing',
  active: 'active',
  paused: 'paused',
  rejected: 'rejected',
};

export const PAYMENT_TYPES = {
  bitcoin: 'bitcoin',
  creditCard: 'card',
};

export const WITHDRAWAL_REQUESTS_STATUSES = {
  processing: 'processing',
  rejected: 'rejected',
  resolved: 'resolved',
};

export const PARTNERSHIPS_REQUESTS_STATUSES = {
  opened: 'opened',
  closed: 'closed',
};

export const SEC_IN_DAY = 86400;

export const THS_TO_BTC = 0.000001079;

export const CRYPTOCOMPARE_API_KEY =
  'f72c4aba8b6d45efb72ca079b43478c9ce539c39dae711752f8c51e81e56b622';
