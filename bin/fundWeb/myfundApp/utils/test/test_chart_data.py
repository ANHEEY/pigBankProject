import requests
import json
import matplotlib.pyplot as plt
##### 실행 됨
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

dates = []
volumes = []
amounts = []

for item in items:
    basDt = item["basDt"]
    trqu = int(item["trqu"])
    trPrc = int(item["trPrc"])
    dates.append(basDt)
    volumes.append(trqu)
    amounts.append(trPrc)

# Reverse the lists to plot the data in chronological order
dates.reverse()
volumes.reverse()
amounts.reverse()

# Plot the data
plt.figure(figsize=(12, 6))
plt.plot(dates, volumes, label='Volume')
plt.plot(dates, amounts, label='Amount')
plt.xlabel('Date')
plt.ylabel('Value')
plt.title('Trading Volume and Amount')
plt.xticks(rotation=45)
plt.legend()

plt.tight_layout()
plt.show()
