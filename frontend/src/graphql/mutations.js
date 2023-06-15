/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPortfolio = /* GraphQL */ `
  mutation CreatePortfolio(
    $input: CreatePortfolioInput!
    $condition: ModelPortfolioConditionInput
  ) {
    createPortfolio(input: $input, condition: $condition) {
      id
      createdAt
      securityIds
      startingCapital
      capital
      profit
      updatedAt
    }
  }
`;
export const updatePortfolio = /* GraphQL */ `
  mutation UpdatePortfolio(
    $input: UpdatePortfolioInput!
    $condition: ModelPortfolioConditionInput
  ) {
    updatePortfolio(input: $input, condition: $condition) {
      id
      createdAt
      securityIds
      startingCapital
      capital
      profit
      updatedAt
    }
  }
`;
export const deletePortfolio = /* GraphQL */ `
  mutation DeletePortfolio(
    $input: DeletePortfolioInput!
    $condition: ModelPortfolioConditionInput
  ) {
    deletePortfolio(input: $input, condition: $condition) {
      id
      createdAt
      securityIds
      startingCapital
      capital
      profit
      updatedAt
    }
  }
`;
export const createBankTransfer = /* GraphQL */ `
  mutation CreateBankTransfer(
    $input: CreateBankTransferInput!
    $condition: ModelBankTransferConditionInput
  ) {
    createBankTransfer(input: $input, condition: $condition) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const updateBankTransfer = /* GraphQL */ `
  mutation UpdateBankTransfer(
    $input: UpdateBankTransferInput!
    $condition: ModelBankTransferConditionInput
  ) {
    updateBankTransfer(input: $input, condition: $condition) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const deleteBankTransfer = /* GraphQL */ `
  mutation DeleteBankTransfer(
    $input: DeleteBankTransferInput!
    $condition: ModelBankTransferConditionInput
  ) {
    deleteBankTransfer(input: $input, condition: $condition) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const createWatchlist = /* GraphQL */ `
  mutation CreateWatchlist(
    $input: CreateWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    createWatchlist(input: $input, condition: $condition) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const updateWatchlist = /* GraphQL */ `
  mutation UpdateWatchlist(
    $input: UpdateWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    updateWatchlist(input: $input, condition: $condition) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const deleteWatchlist = /* GraphQL */ `
  mutation DeleteWatchlist(
    $input: DeleteWatchlistInput!
    $condition: ModelWatchlistConditionInput
  ) {
    deleteWatchlist(input: $input, condition: $condition) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const createSecurity = /* GraphQL */ `
  mutation CreateSecurity(
    $input: CreateSecurityInput!
    $condition: ModelSecurityConditionInput
  ) {
    createSecurity(input: $input, condition: $condition) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const updateSecurity = /* GraphQL */ `
  mutation UpdateSecurity(
    $input: UpdateSecurityInput!
    $condition: ModelSecurityConditionInput
  ) {
    updateSecurity(input: $input, condition: $condition) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const deleteSecurity = /* GraphQL */ `
  mutation DeleteSecurity(
    $input: DeleteSecurityInput!
    $condition: ModelSecurityConditionInput
  ) {
    deleteSecurity(input: $input, condition: $condition) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
      id
      securityId
      isOpen
      type
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const updateTrade = /* GraphQL */ `
  mutation UpdateTrade(
    $input: UpdateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    updateTrade(input: $input, condition: $condition) {
      id
      securityId
      isOpen
      type
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrade = /* GraphQL */ `
  mutation DeleteTrade(
    $input: DeleteTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    deleteTrade(input: $input, condition: $condition) {
      id
      securityId
      isOpen
      type
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const createShare = /* GraphQL */ `
  mutation CreateShare(
    $input: CreateShareInput!
    $condition: ModelShareConditionInput
  ) {
    createShare(input: $input, condition: $condition) {
      id
      createdAt
      tradeId
      isOpen
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
export const updateShare = /* GraphQL */ `
  mutation UpdateShare(
    $input: UpdateShareInput!
    $condition: ModelShareConditionInput
  ) {
    updateShare(input: $input, condition: $condition) {
      id
      createdAt
      tradeId
      isOpen
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
export const deleteShare = /* GraphQL */ `
  mutation DeleteShare(
    $input: DeleteShareInput!
    $condition: ModelShareConditionInput
  ) {
    deleteShare(input: $input, condition: $condition) {
      id
      createdAt
      tradeId
      isOpen
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
