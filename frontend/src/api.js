import { API, graphqlOperation } from 'aws-amplify';
import { getSecurity, listPortfolios, listSecurities, listTrades, listWatchlists } from './graphql/queries';
import { createGoal, createPortfolio, createWatchlist, createSecurity, updateSecurity, createTrade, createShare } from './graphql/mutations';

const fetchPortfolio = async () => {
    try {
      const portfolioResponse = await API.graphql(graphqlOperation(listPortfolios));
      const portfolio = portfolioResponse["data"]["listPortfolios"]["items"][0];
      console.log("Successfully fetched portfolio: ", portfolio);
      return portfolio;
    } catch (error) {console.log("error in fetchAllUsers: " + error)}
}

const fetchWatchlistsAPI = async (portfolioId) => {
  try {
    const watchlistsResponse = await API.graphql(
      graphqlOperation(listWatchlists, {
        filter: {
          portfolioId: { eq: portfolioId },
        },
      })
    );
    const watchlist = watchlistsResponse["data"]["listWatchlists"]["items"];
    console.log("Successfully fetched watchlists: ", watchlist);
    return watchlist;
  } catch (error) {console.log("error in fetchWatchlistsAPI: ", error)}
}

const fetchManySecuritiesAPI = async (securityIds) => {
  try {
    const securities = []
    for(const id of securityIds) {
      const security = await API.graphql(graphqlOperation(getSecurity, { id: id }));
      securities.push(security.data.getSecurity);
    } 
    console.log("Successfully fetched watchlist's securities: ", securities);
    return securities;
  } catch (error) {console.log("error in fetchManySecuritiesAPI: ", error)}
}

const fetchAllSecurityTradesAPI = async (securityId) => {
  try {
    const tradesResponse = await API.graphql(
      graphqlOperation(listTrades, {
        filter: {
          securityId: { eq: securityId },
        },
      })
    );
    const trades = tradesResponse.data.listTrades.items;
    console.log("Successfully fetched security's trade: ", trades);
    return trades;
  } catch (error) {console.log("error in fetchAllSecurityTradesAPI: ", error)}
}

const createPortfolioAPI = async (startingCapital, createdAt) => {
    try {
        const newPortfolio = {
            createdAt: createdAt,
            securityIds: [],
            startingCapital: startingCapital,
            capital: startingCapital,
            profit: 0.0,
            goalIds: [],
            watchlistIds: [],
            bankTransferIds: [],
        }
        const portfolioResponse = await API.graphql(graphqlOperation(createPortfolio, {input : newPortfolio}));
        const portfolio = portfolioResponse.data.createPortfolio
        console.log("successfully created portfolio: ", portfolio);
    } catch (error) {
        console.log("error in createPortfolioAPI: " + error);
    }
}

const createGoalAPI = async (portfolioId, portfolioValue, createdAt, growthGoal) => {
    try {
        console.log(portfolioId);
        const newGoal = {
            portfolioId: portfolioId,
            createdAt: createdAt,
            isOpen: true,
            initialPortfolioValue: portfolioValue,
            growthGoal: growthGoal,
        }
        const goalResponse = await API.graphql(graphqlOperation(createGoal, {input : newGoal}));
        const goal = goalResponse.data.createGoal
        console.log("successfully created goal: ", goal);
    } catch (error) {
        console.log("error in createGoalAPI: ", error);
    }
}

const createWatchlistAPI = async (portfolioId, watchlistName, securities) => {
    try {
      const existingSecurities = await API.graphql(
        graphqlOperation(listSecurities, {
          filter: {
            portfolioId: { eq: portfolioId },
          },
        })
      );
      const existingSymbols = existingSecurities.data.listSecurities.items.map(
        (item) => item.symbol
      );
  
      const securityIds = [];
  
      for (const symbol of securities) {
        if (existingSymbols.includes(symbol)) {
          const existingSecurity = existingSecurities.data.listSecurities.items.find(
            (item) => item.symbol === symbol
          );
          securityIds.push(existingSecurity.id);
        } else {
          const newSecurity = {
            symbol: symbol,
            portfolioId: portfolioId,
            portfolioAllocation: 0,
            profitAllocation: 0,
            isOpen: false,
            currentPrice: 0,
          };
  
          const securityResponse = await API.graphql(
            graphqlOperation(createSecurity, { input: newSecurity })
          );
          console.log("Successfully created security: ", newSecurity.symbol);
          const securityId = securityResponse.data.createSecurity.id;
          securityIds.push(securityId);
        }
      }
  
      const newWatchlist = {
        portfolioId: portfolioId,
        name: watchlistName,
        securityIds: securityIds,
      };
  
      const watchlistResponse = await API.graphql(
        graphqlOperation(createWatchlist, { input: newWatchlist })
      );
  
      const watchlist = watchlistResponse.data.createWatchlist;
      console.log("Successfully created watchlist:", watchlist);
    } catch (error) {
      console.log("Error in createWatchlistAPI:", error);
    }
  };
  
const updateSecurityIsOpenAPI = async (id, isOpen) => {
  console.log("user: ", id);
  console.log("IsOpen: ", isOpen);
  try{
    await API.graphql(
      graphqlOperation(updateSecurity, {
        input: { id: id, isOpen: isOpen },
      })
    );
    console.log("Successfully updated security isOpen field");
  } catch (error) {console.log("error in updateSecurityIsOpen: ", error)}
}

const executeTrade = async (security, openTrade, date, price, shares, selectedTradeType) => {
  console.log(security);
  console.log(openTrade);

  try {
    if (!security.isOpen) {
      // Create a new trade
      console.log("Creating a new trade");
      if (!price || !shares || !selectedTradeType || !date) {
        console.log("Empty Value");
        return;
      }

      console.log("Date:", date);
      console.log("Price:", price);
      console.log("Shares:", shares);
      console.log("Trade Type:", selectedTradeType);
      const newTrade = {
        securityId: security.id,
        type: selectedTradeType,
        isOpen: true,
      }
      const tradeResponse = await API.graphql(graphqlOperation(createTrade, {input: newTrade}));
      const trade = tradeResponse.data.createTrade;
      console.log("Successfully created a new trade: ", trade);

      for (let i = 0; i < shares; i++) {
        // Perform trade operation for each share
        console.log(`Processing trade for share ${i + 1}`);
        const newShare = {
          createdAt: date,
          tradeId: trade.id,
          entryPrice: price,
        }
        const shareResponse = await API.graphql(graphqlOperation(createShare, {input: newShare}));
        const share = shareResponse.data.createShare;
      }
      console.log("Successfully created shares");
    } else {
      // List all shares with openTrade.id
      console.log("Listing shares with openTrade.id:", openTrade.id);
    }
  } catch (error) {
    console.log("Error in executeTrade:", error);
  }
};


export {
    fetchPortfolio,
    fetchWatchlistsAPI,
    fetchManySecuritiesAPI,
    fetchAllSecurityTradesAPI,
    createPortfolioAPI,
    createGoalAPI,  
    createWatchlistAPI,
    updateSecurityIsOpenAPI,  
    executeTrade,
}