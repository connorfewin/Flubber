import yfinance as yf
from Watchlist import tradingWatchlist

def getCurrentPrice(symbol):
    ticker = yf.Ticker(symbol)
    current_price = ticker.history(period='1d')['Close'].iloc[-1]
    return current_price

def getTradingWatchlistCurrentPrices():
    for symbol in tradingWatchlist:
        print("Current price of", symbol, ":", getCurrentPrice(symbol))

getTradingWatchlistCurrentPrices()
