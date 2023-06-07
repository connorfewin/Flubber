/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePortfolio = /* GraphQL */ `
  subscription OnCreatePortfolio(
    $filter: ModelSubscriptionPortfolioFilterInput
  ) {
    onCreatePortfolio(filter: $filter) {
      id
      securityIds
      capital
      profit
      goalIds
      watchlistIds
      createdAt
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
      securityIds
      capital
      profit
      goalIds
      watchlistIds
      createdAt
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
      securityIds
      capital
      profit
      goalIds
      watchlistIds
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
      isOpen
      createdAt
      initialPortfolioValue
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
      isOpen
      createdAt
      initialPortfolioValue
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
      isOpen
      createdAt
      initialPortfolioValue
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
      tradeIds
      portfolioAllocation
      profitAllocation
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
      tradeIds
      portfolioAllocation
      profitAllocation
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
      tradeIds
      portfolioAllocation
      profitAllocation
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
      goalId
      isOpen
      shareIds
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
      goalId
      isOpen
      shareIds
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
      goalId
      isOpen
      shareIds
      moneyInvested
      createdAt
      updatedAt
    }
  }
`;
export const onCreateShare = /* GraphQL */ `
  subscription OnCreateShare($filter: ModelSubscriptionShareFilterInput) {
    onCreateShare(filter: $filter) {
      id
      createdAt
      tradeId
      type
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
export const onUpdateShare = /* GraphQL */ `
  subscription OnUpdateShare($filter: ModelSubscriptionShareFilterInput) {
    onUpdateShare(filter: $filter) {
      id
      createdAt
      tradeId
      type
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
export const onDeleteShare = /* GraphQL */ `
  subscription OnDeleteShare($filter: ModelSubscriptionShareFilterInput) {
    onDeleteShare(filter: $filter) {
      id
      createdAt
      tradeId
      type
      entryPrice
      exitPrice
      updatedAt
    }
  }
`;
