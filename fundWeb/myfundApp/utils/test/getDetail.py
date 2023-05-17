import requests

url = "http://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo"
params = {
    "serviceKey": "zC0NCRtOkyKmmp/lYj1jwn9fMTkMWlT9b+8LMz9QqRlpfZssfsDbZuSRs5w0f/ZBqTQiH4Q/jreSevtU057hrg==",
    "numOfRows": 100,
    "resultType": "json",
    "beginBasDt": "20230316",
    "endBasDt": "20230516",
    "isinCd": "KR7069500007"
}

response = requests.get(url, params=params)
response.raise_for_status()
data = response.json()
items = data["response"]["body"]["items"]["item"]

for item in items:
    basDt = item["basDt"]
    srtnCd = item["srtnCd"]
    itmsNm = item["itmsNm"]
    clpr = item["clpr"]
    vs = item["vs"]
    fltRt = item["fltRt"]
    nav = item["nav"]
    mkp = item["mkp"]
    hipr = item["hipr"]
    lopr = item["lopr"]
    trqu = item["trqu"]
    trPrc = item["trPrc"]
    mrktTotAmt = item["mrktTotAmt"]
    stLstgCnt = item["stLstgCnt"]
    bssIdxIdxNm = item["bssIdxIdxNm"]
    bssIdxClpr = item["bssIdxClpr"]
    nPptTotAmt = item["nPptTotAmt"]

    print(f"기준일자: {basDt}")
    print(f"종목코드: {srtnCd}")
    print(f"종목명: {itmsNm}")
    print(f"종가: {clpr}")
    print(f"전일대비: {vs}")
    print(f"등락률: {fltRt}")
    print(f"NAV: {nav}")
    print(f"시가총액: {mkp}")
    print(f"최고가: {hipr}")
    print(f"최저가: {lopr}")
    print(f"거래량: {trqu}")
    print(f"거래대금: {trPrc}")
    print(f"시가총액: {mrktTotAmt}")
    print(f"상장주식수: {stLstgCnt}")
    print(f"기초지수명: {bssIdxIdxNm}")
    print(f"기초지수종가: {bssIdxClpr}")
    print(f"순자산총액: {nPptTotAmt}")
    print()
import matplotlib.pyplot as plt

dates = []
closing_prices = []

for item in items:
    basDt = item["basDt"]
    clpr = int(item["clpr"])
    dates.append(basDt)
    closing_prices.append(clpr)

# Reverse the lists to plot the data in chronological order
dates.reverse()
closing_prices.reverse()

# Plot the data
plt.figure(figsize=(12, 6))
plt.plot(dates, closing_prices)
plt.xlabel('Date')
plt.ylabel('Closing Price')
plt.title('KODEX 200 ETF - Closing Prices')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
