import yfinance as yf

def getCurrentPrice(symbol):
    ticker = yf.Ticker(symbol)
    current_price = ticker.history(period='1d')['Close'].iloc[-1]
    rounded_price = round(current_price, 2)
    return rounded_price

