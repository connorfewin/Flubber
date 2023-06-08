import { API, graphqlOperation } from 'aws-amplify';
import { listPortfolios, listSecurities } from './graphql/queries';
import { createGoal, createPortfolio, createWatchlist, createSecurity } from './graphql/mutations';

const fetchPortfolio = async () => {
    try {
      const portfolioResponse = await API.graphql(graphqlOperation(listPortfolios));
      const portfolio = portfolioResponse["data"]["listPortfolios"]["items"][0];
      console.log("Successfully fetched portfolio: ", portfolio);
      return portfolio;
    } catch (error) {console.log("error in fetchAllUsers: " + error)}
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
  

export {
    fetchPortfolio,
    createPortfolioAPI,
    createGoalAPI,  
    createWatchlistAPI  
}