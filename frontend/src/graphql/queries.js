/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPortfolio = /* GraphQL */ `
  query GetPortfolio($id: ID!) {
    getPortfolio(id: $id) {
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
export const listPortfolios = /* GraphQL */ `
  query ListPortfolios(
    $filter: ModelPortfolioFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPortfolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        securityIds
        startingCapital
        capital
        profit
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBankTransfer = /* GraphQL */ `
  query GetBankTransfer($id: ID!) {
    getBankTransfer(id: $id) {
      id
      portfolioId
      type
      amount
      createdAt
      updatedAt
    }
  }
`;
export const listBankTransfers = /* GraphQL */ `
  query ListBankTransfers(
    $filter: ModelBankTransferFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankTransfers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        portfolioId
        type
        amount
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
      portfolioId
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
        portfolioId
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
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        portfolioId
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
        portfolioId
        portfolioAllocation
        profitAllocation
        recognizedProfit
        isOpen
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
      isOpen
      type
      goalId
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
        isOpen
        type
        goalId
        moneyInvested
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getShare = /* GraphQL */ `
  query GetShare($id: ID!) {
    getShare(id: $id) {
      id
      securityId
      tradeId
      orderId
      isOpen
      createdAt
      closedAt
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
        securityId
        tradeId
        orderId
        isOpen
        createdAt
        closedAt
        entryPrice
        exitPrice
        updatedAt
      }
      nextToken
    }
  }
`;
