export enum ContractsPlansPeriod {
  year = 'year',
}

export enum ContractsStatuses {
  processing = 'processing',
  active = 'active',
  paused = 'paused',
  rejected = 'rejected',
}
export enum WithdrawalRequestsStatuses {
  processing = 'processing',
  resolved = 'resolved',
  rejected = 'rejected',
}

export enum PaymentTypes {
  bitcoin = 'bitcoin',
  creditCard = 'creditCard',
}

export type QueryBuilderOrder = 'ASC' | 'DESC';

export enum PartnershipRequestsStatuses {
  opened = 'opened',
  closed = 'closed',
}
