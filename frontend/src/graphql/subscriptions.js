/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePortfolio = /* GraphQL */ `
  subscription OnCreatePortfolio(
    $filter: ModelSubscriptionPortfolioFilterInput
  ) {
    onCreatePortfolio(filter: $filter) {
      id
      createdAt
      initialValue
      currentValue
      recognizedProfit
      updatedAt
    }
  }
`;
export const onUpdatePortfolio = /* GraphQL */ `
  subscription OnUpdatePortfolio(
    $filter: ModelSubscriptionPortfolioFilterInput
  ) {
    onUpdatePortfolio(filter: $filter) {
      id
      createdAt
      initialValue
      currentValue
      recognizedProfit
      updatedAt
    }
  }
`;
export const onDeletePortfolio = /* GraphQL */ `
  subscription OnDeletePortfolio(
    $filter: ModelSubscriptionPortfolioFilterInput
  ) {
    onDeletePortfolio(filter: $filter) {
      id
      createdAt
      initialValue
      currentValue
      recognizedProfit
      updatedAt
    }
  }
`;
export const onCreateBankTransfer = /* GraphQL */ `
  subscription OnCreateBankTransfer(
    $filter: ModelSubscriptionBankTransferFilterInput
  ) {
    onCreateBankTransfer(filter: $filter) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBankTransfer = /* GraphQL */ `
  subscription OnUpdateBankTransfer(
    $filter: ModelSubscriptionBankTransferFilterInput
  ) {
    onUpdateBankTransfer(filter: $filter) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBankTransfer = /* GraphQL */ `
  subscription OnDeleteBankTransfer(
    $filter: ModelSubscriptionBankTransferFilterInput
  ) {
    onDeleteBankTransfer(filter: $filter) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWatchlist = /* GraphQL */ `
  subscription OnCreateWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onCreateWatchlist(filter: $filter) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWatchlist = /* GraphQL */ `
  subscription OnUpdateWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onUpdateWatchlist(filter: $filter) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWatchlist = /* GraphQL */ `
  subscription OnDeleteWatchlist(
    $filter: ModelSubscriptionWatchlistFilterInput
  ) {
    onDeleteWatchlist(filter: $filter) {
      id
      portfolioId
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal($filter: ModelSubscriptionGoalFilterInput) {
    onCreateGoal(filter: $filter) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      finalPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal($filter: ModelSubscriptionGoalFilterInput) {
    onUpdateGoal(filter: $filter) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      finalPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal($filter: ModelSubscriptionGoalFilterInput) {
    onDeleteGoal(filter: $filter) {
      id
      portfolioId
      isOpen
      createdAt
      initialPortfolioValue
      finalPortfolioValue
      growthGoal
      endDate
      updatedAt
    }
  }
`;
export const onCreateSecurity = /* GraphQL */ `
  subscription OnCreateSecurity($filter: ModelSubscriptionSecurityFilterInput) {
    onCreateSecurity(filter: $filter) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      recognizedProfit
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSecurity = /* GraphQL */ `
  subscription OnUpdateSecurity($filter: ModelSubscriptionSecurityFilterInput) {
    onUpdateSecurity(filter: $filter) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      recognizedProfit
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSecurity = /* GraphQL */ `
  subscription OnDeleteSecurity($filter: ModelSubscriptionSecurityFilterInput) {
    onDeleteSecurity(filter: $filter) {
      id
      symbol
      portfolioId
      portfolioAllocation
      profitAllocation
      recognizedProfit
      isOpen
      currentPrice
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade($filter: ModelSubscriptionTradeFilterInput) {
    onCreateTrade(filter: $filter) {
      id
      securityId
      isOpen
      type
      recognizedProfit
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade($filter: ModelSubscriptionTradeFilterInput) {
    onUpdateTrade(filter: $filter) {
      id
      securityId
      isOpen
      type
      recognizedProfit
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade($filter: ModelSubscriptionTradeFilterInput) {
    onDeleteTrade(filter: $filter) {
      id
      securityId
      isOpen
      type
      recognizedProfit
      goalId
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      securityId
      symbol
      tradeId
      createdAt
      type
      numShares
      price
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      securityId
      symbol
      tradeId
      createdAt
      type
      numShares
      price
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      securityId
      symbol
      tradeId
      createdAt
      type
      numShares
      price
      updatedAt
    }
  }
`;
export const onCreateShare = /* GraphQL */ `
  subscription OnCreateShare($filter: ModelSubscriptionShareFilterInput) {
    onCreateShare(filter: $filter) {
      id
      securityId
      tradeId
      orderId
      isOpen
      createdAt
      closedAt
      entryPrice
      exitPrice
      recognizedProfit
      updatedAt
    }
  }
`;
export const onUpdateShare = /* GraphQL */ `
  subscription OnUpdateShare($filter: ModelSubscriptionShareFilterInput) {
    onUpdateShare(filter: $filter) {
      id
      securityId
      tradeId
      orderId
      isOpen
      createdAt
      closedAt
      entryPrice
      exitPrice
      recognizedProfit
      updatedAt
    }
  }
`;
export const onDeleteShare = /* GraphQL */ `
  subscription OnDeleteShare($filter: ModelSubscriptionShareFilterInput) {
    onDeleteShare(filter: $filter) {
      id
      securityId
      tradeId
      orderId
      isOpen
      createdAt
      closedAt
      entryPrice
      exitPrice
      recognizedProfit
      updatedAt
    }
  }
`;
