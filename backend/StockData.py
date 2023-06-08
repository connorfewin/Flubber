import yfinance as yf

def getCurrentPrice(symbol):
    ticker = yf.Ticker(symbol)
    current_price = ticker.history(period='1d')['Close'].iloc[-1]
    return current_price


