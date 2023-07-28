from StockData import getCurrentPrice
from Api import access_appsync_get_securities, access_appsync_update_security
import time

def liveStockData():
    while True:
        securities = access_appsync_get_securities()
        for security in securities:
            security['currentPrice'] = getCurrentPrice(security['symbol'])
            access_appsync_update_security(security)
        time.sleep(30)

if __name__ == "__main__":
    liveStockData()