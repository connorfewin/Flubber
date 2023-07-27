import { API, graphqlOperation } from 'aws-amplify';
import { getSecurity, listOrders, listPortfolios, listSecurities, listShares, listTrades, listWatchlists } from './graphql/queries';
import { createGoal, createOrder, createPortfolio, createWatchlist, createSecurity, updateSecurity, createTrade, createShare, updateShare, updateTrade, updatePortfolio } from './graphql/mutations';

const fetchPortfolioAPI = async () => {
    try {
      const portfolioResponse = await API.graphql(graphqlOperation(listPortfolios));
      const portfolio = portfolioResponse["data"]["listPortfolios"]["items"][0];
      console.log("Successfully fetched portfolio: ", portfolio);
      return portfolio;
    } catch (error) {console.log("error in fetchPortfolio: " + error)}
}

const fetchOrdersAPI = async () => {
  try {
    const ordersResponse = await API.graphql(graphqlOperation(listOrders));
    const orders = ordersResponse["data"]["listOrders"]["items"];
    console.log("Successfully fetched orders: ", orders);
    return orders;
  } catch (error) {console.log("error in fetchOrdersAPI: " + error)}
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

const fetchAllSecuritiesAPI = async (portfolioId) => {
  try {
    const securitiesResponse = await API.graphql(
      graphqlOperation(listSecurities, {
        filter: {
          portfolioId: { eq: portfolioId },
        },
      })
    );
    const securities = securitiesResponse["data"]["listSecurities"]["items"];
    console.log("Successfully fetched securities: ", securities);
    return securities;
  } catch (error) {console.log("error in fetchAllSecuritiesAPI: ", error)}
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

const fetchClosedSecurityTradesAPI = async (securityId) => {
  try {
    const tradesResponse = await API.graphql(
      graphqlOperation(listTrades, {
        filter: {
          securityId: { eq: securityId },
          isOpen: { eq: false },
        },
      })
    );
    const trades = tradesResponse.data.listTrades.items;
    console.log("Successfully fetched security's trade: ", trades);
    return trades;
  } catch (error) {console.log("error in fetchAllSecurityTradesAPI: ", error)}
}

const fetchSharesByTradeIdAPI = async (tradeId) => {
  try {
    const sharesResponse = await API.graphql(
      graphqlOperation(listShares, {
        filter: {
          tradeId: { eq: tradeId },
        },
      })
    );
    const shares = sharesResponse.data.listShares.items;
    return shares;
  } catch (error) {
    console.log("Error in fetchSharesByTradeIdAPI", error)
  }
};

const fetchClosedSharesByTradeIdAPI = async (tradeId) => {
  try {
    const sharesResponse = await API.graphql(
      graphqlOperation(listShares, {
        filter: {
          tradeId: { eq: tradeId },
          isOpen: { eq: false },
        },
      })
    );
    const shares = sharesResponse.data.listShares.items;
    return shares;
  } catch (error) {
    console.log("Error in fetchSharesByTradeIdAPI", error)
  }
};

const fetchClosedSharesByPortfolioIdAPI = async (portfolioId) => {
  try {
    const sharesResponse = await API.graphql(
      graphqlOperation(listShares, {
        filter: {
          portfolioId: { eq: portfolioId },
          isOpen: { eq: false },
        },
      })
    );
    const shares = sharesResponse.data.listShares.items;
    console.log("Successfully fetched shares by portfolioId");
    return shares;
  } catch (error) {
    console.log("Error in fetchSharesByTradeIdAPI", error)
  }
};

const createPortfolioAPI = async (initialValue, createdAt) => {
    try {
        const newPortfolio = {
            createdAt: createdAt,
            initialValue: initialValue,
            currentValue: initialValue,
            recognizedProfit: 0.0,
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
  

const updatePortfolioCurrentValueAPI = async (id, newCurrentValue) => {
  console.log("portfolio: ", id);
  console.log("curent Value: ", newCurrentValue);
  try{
    await API.graphql(
      graphqlOperation(updatePortfolio, {
        input: { id: id, currentValue: newCurrentValue },
      })
    );
    console.log("Successfully updated portfolios current value");
  } catch (error) {console.log("error in updatePortfolioCurrentValueAPI: ", error)}
}

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

const createNewTrade = async (security, selectedTradeType) => {
  const newTrade = {
    securityId: security.id,
    type: selectedTradeType,
    isOpen: true,
  };

  const tradeResponse = await API.graphql(graphqlOperation(createTrade, { input: newTrade }));
  const trade = tradeResponse.data.createTrade;
  console.log("Successfully created a new trade:", trade);

  return trade;
};

const createNewOrder = async (security, newTrade, date, tradeType, shares, price) => {
  const newOrder = {
    securityId: security.id,
    symbol: security.symbol,
    tradeId: newTrade.id,
    createdAt: date,
    type: tradeType,
    numShares: shares,
    price: price
  };

  const orderResponse = await API.graphql(graphqlOperation(createOrder, { input: newOrder }));
  const order = orderResponse.data.createOrder;
  console.log("Successfully created a new order:", order);

  return order;
};

const createShares = async (security, trade, order, date, price, shares) => {
  const newShares = Array.from({ length: shares }, (_, index) => ({
    portfolioId: security.portfolioId,
    createdAt: date,
    securityId: security.id,
    tradeId: trade.id,
    orderId: order.id,
    entryPrice: price,
    isOpen: true,
  }));

  await Promise.all(
    newShares.map(async (newShare, index) => {
      console.log(`Processing trade for share ${index + 1}`);
      await API.graphql(graphqlOperation(createShare, { input: newShare }));
    })
  );

  console.log("Successfully created shares");
};

// Function to close the specified number of open shares
const closeShares = (openShares, numSharesToClose, exitPrice, date) => {
  // Sort the open shares by createdAt (assuming most recent ones sold first)
  const sortedOpenShares = openShares.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  // Close the specified number of shares
  for (let i = 0; i < numSharesToClose; i++) {
    sortedOpenShares[i].exitPrice = parseFloat(exitPrice);
    sortedOpenShares[i].isOpen = false;
    sortedOpenShares[i].closedAt = date;
  }

  console.log("Updated shares: ", sortedOpenShares);
  return sortedOpenShares;
};

// Function to update the closed shares in the database
const updateClosedShares = async (closedShares) => {
  try {
    for (const share of closedShares) {
      await API.graphql(
        graphqlOperation(updateShare, {
          input: { id: share.id, isOpen: share.isOpen, closedAt: share.closedAt, exitPrice: parseFloat(share.exitPrice) },
        })
      );
    }
  } catch (error) {
    console.log("Error updating share:", error);
  }
};

// Function to update the trade status
const updateTradeStatus = async (trade) => {
  try {
    await API.graphql(
      graphqlOperation(updateTrade, {
        input: { id: trade.id, isOpen: trade.isOpen },
      })
    );
  } catch (error) {
    console.log("Error closing trade:", error);
  }
};

const updateTradeRecognizedProfitAPI = async (trade, recognizedProfit) => {
  try {
    await API.graphql(
      graphqlOperation(updateTrade, {
        input: { id: trade.id, recognizedProfit: recognizedProfit },
      })
    );
    console.log("Successfully updated trade ", trade.id, " with a recognized profit of $", recognizedProfit);
  } catch (error) {
    console.log("Error in updateTradeRecognizedProfitAPI:", error);
  }
};

const updateShareRecognizedProfitAPI = async (share, recognizedProfit) => {
  try {
    await API.graphql(
      graphqlOperation(updateShare, {
        input: { id: share.id, recognizedProfit: recognizedProfit },
      })
    );
    console.log("Successfully updated share ", share.id, " with a recognized profit of $", recognizedProfit);
  } catch (error) {
    console.log("Error in updateShareRecognizedProfitAPI:", error);
  }
};

const executeTrade = async (security, openTrade, date, price, shares, selectedTradeType) => {

  if (!price || !shares || !selectedTradeType || !date) {
    console.log("Empty Value");
    return;
  }

  console.log("Date:", date);
  console.log("Price:", price);
  console.log("Shares:", shares);
  console.log("Trade Type:", selectedTradeType);

  try {
    if (!security.isOpen) {
      // Create a new trade
      console.log("Creating a new trade");

      const newTrade = await createNewTrade(security, selectedTradeType, shares);
      const newOrder = await createNewOrder(security, newTrade, date, selectedTradeType, shares, price);
  
      await createShares(security, newTrade, newOrder, date, price, shares);

      return newTrade;
    } else {
      // List all shares with openTrade.id
      const openTradeShares = await fetchSharesByTradeIdAPI(openTrade.id);
      console.log("Listing shares with openTrade.id:", openTrade.securityId);

      const openShares = openTradeShares.filter(item => item.isOpen);
      const numOpenShares = openShares.length;

      if (openTrade.type === selectedTradeType) {
        const newOrder = await createNewOrder(security, openTrade, date, selectedTradeType, shares, price);
        await createShares(security, openTrade, newOrder, date, price, shares);
        console.log("Increased position. Trade is still open.")
        return openTrade;
      } else {
        // reducing the position
        if (shares > numOpenShares) {
          console.log("Invalid number of shares");
          return openTrade;
        }
        // Close the specified number of open shares
        // HERE IS THE ISSUE< THIS OR UPDATE CLOSED SHARES
        const updatedShares = closeShares(openShares, shares, price, date);
        const recentlyClosedShares = updatedShares.filter(item => !item.isOpen);
        // Update the closed shares in the database
        await updateClosedShares(recentlyClosedShares); //
        // Submit Order
        await createNewOrder(security, openTrade, date, selectedTradeType, shares, price);
        // Check if there are remaining open shares
        const stillOpenShares = updatedShares.filter(item => item.isOpen);
        // If there are no more open shares, close the trade
        if (stillOpenShares.length === 0) {
          openTrade.isOpen = false;
          await updateTradeStatus(openTrade);
          console.log("Trade is closed");
          return null;
        }
        console.log("Reduced Position. Trade is still open");
        return openTrade;
      }
    }
  } catch (error) {
    console.log("Error in executeTrade:", error);
  }
};

const calculateRecognizedProfitAPI = async (securityId) => {
  try {
    // fetch closed shares
    const tradesResponse = await fetchAllSecurityTradesAPI(securityId);
    let recognizedProfit = 0;
    for (const trade of tradesResponse) {
      let tradeReognizedProfit = 0;
      const shares = await fetchClosedSharesByTradeIdAPI(trade.id);
      for (const share of shares) {
        let shareRecognizedProfit = 0;
        if (trade.type === 'Buy') {
          shareRecognizedProfit = share.exitPrice - share.entryPrice;
        } else {
          shareRecognizedProfit = share.entryPrice - share.exitPrice;
        }
        //update share recognized profit
        tradeReognizedProfit += shareRecognizedProfit;
        if(share.recognizedProfit !== shareRecognizedProfit){
          console.log("Share Recognized Profit Did not match, updating to new value, check out: ", share.id);
          await updateShareRecognizedProfitAPI(share, shareRecognizedProfit)
        }
      }
      recognizedProfit += tradeReognizedProfit;
      // Update Trades Recognized 
      if(trade.recognizedProfit !== tradeReognizedProfit){
        console.log("Trade Recognized Profit Did not match, updating to new value, check out: ", trade.id);
        await updateTradeRecognizedProfitAPI(trade, tradeReognizedProfit)
      }
    }
    // Update Securities Recognized Profit
    return recognizedProfit.toFixed(2);
  } catch (error) {
    console.log("error in calculateRecognizedProfit: ", error);
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

const calculateChartDataAPI = async (portfolioId, createdAt, initialValue) => {
  try {
    const data = [];
      const shares = await fetchClosedSharesByPortfolioIdAPI(portfolioId);
      console.log("Shares: ", shares);
      const today = new Date();
      const datesBetween = getDatesBetween(createdAt, today);
      for (const date of datesBetween) {
        const dateMatchingClosedShares = shares.filter((share) => share.closedAt === date);
        let tradeProfit = 0;
        let bankTransfer = 0
        if(data.length !== 0){
          tradeProfit = data[data.length - 1].tradeProfit;
          bankTransfer = data[data.length - 1].bankTransfer;
        }
        for(const item of dateMatchingClosedShares) {
          console.log(item.recognizedProfit)
          tradeProfit += item.recognizedProfit;
          if (tradeProfit !== 0) console.log("MATCHING DATE: ", date);
        }
        const newDataEntry = {
          date: date.toString(),
          initialValue: initialValue,
          tradeProfit: tradeProfit,
          bankTransfer: bankTransfer,
        }
        data.push(newDataEntry);
      }
      console.log("DATA: ", data);
      return data;
    }
  catch (error) {
    console.log("error in calculateChartDataAPI: ", error);
  }
};

export {
    fetchPortfolioAPI,
    fetchOrdersAPI,
    fetchWatchlistsAPI,
    fetchManySecuritiesAPI,
    fetchAllSecuritiesAPI,
    fetchAllSecurityTradesAPI,
    fetchClosedSecurityTradesAPI,
    fetchSharesByTradeIdAPI,
    fetchClosedSharesByTradeIdAPI,
    createPortfolioAPI,
    createGoalAPI,  
    createWatchlistAPI,
    updatePortfolioCurrentValueAPI,
    updateSecurityIsOpenAPI,  
    executeTrade,
    calculateRecognizedProfitAPI,
    calculateChartDataAPI,
}