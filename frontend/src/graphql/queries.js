/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPortfolio = /* GraphQL */ `
  query GetPortfolio($id: ID!) {
    getPortfolio(id: $id) {
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
export const listPortfolios = /* GraphQL */ `
  query ListPortfolios(
    $filter: ModelPortfolioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPortfolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        securityIds
        capital
        profit
        goalIds
        watchlistIds
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWatchlist = /* GraphQL */ `
  query GetWatchlist($id: ID!) {
    getWatchlist(id: $id) {
      id
      name
      securityIds
      createdAt
      updatedAt
    }
  }
`;
export const listWatchlists = /* GraphQL */ `
  query ListWatchlists(
    $filter: ModelWatchlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        securityIds
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
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
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isOpen
        createdAt
        initialPortfolioValue
        growthGoal
        endDate
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSecurity = /* GraphQL */ `
  query GetSecurity($id: ID!) {
    getSecurity(id: $id) {
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
export const listSecurities = /* GraphQL */ `
  query ListSecurities(
    $filter: ModelSecurityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSecurities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        tradeIds
        portfolioAllocation
        profitAllocation
        currentPrice
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
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
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        securityId
        goalId
        isOpen
        shareIds
        moneyInvested
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShare = /* GraphQL */ `
  query GetShare($id: ID!) {
    getShare(id: $id) {
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
export const listShares = /* GraphQL */ `
  query ListShares(
    $filter: ModelShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        tradeId
        type
        entryPrice
        exitPrice
        updatedAt
      }
      nextToken
    }
  }
`;
