import { API, graphqlOperation } from 'aws-amplify';
import { listPortfolios } from './graphql/queries';
import { createGoal, createPortfolio } from './graphql/mutations';

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

export {
    fetchPortfolio,
    createPortfolioAPI,
    createGoalAPI,    
}