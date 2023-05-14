import requests
import json

requestURL = "https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo?serviceKey=zC0NCRtOkyKmmp%2FlYj1jwn9fMTkMWlT9b%2B8LMz9QqRlpfZssfsDbZuSRs5w0f%2FZBqTQiH4Q%2FjreSevtU057hrg%3D%3D&numOfRows=30&pageNo=1&resultType=json"
response = requests.get(requestURL,verify=True)
contents = response.text
print(contents)
data = json.loads(contents)
items = data['response']['body']['items']['item']

json_fund =  []

for item in items:
    itmsNm = item['itmsNm']             # 종목명
    clpr = item['clpr']                 # 현재가
    vs = item['vs']                     # 전일비
    fltRt = item['fltRt']               # 등락율
    trPrc = item['trPrc']               # 거래량
    mrktTotAmt = item['mrktTotAmt']     # 거래대금
    nPptTotAmt = item['nPptTotAmt']     # 시가총액
    stLstgCnt  =item['stLstgCnt']       # 순자산

    data = {
        'itmsNm': itmsNm,
        'clpr': clpr,
        'vs': vs,
        'fltRt': fltRt,
        'trPrc': trPrc,
        'mrktTotAmt': mrktTotAmt,
        'nPptTotAmt': nPptTotAmt,
        'stLstgCnt': stLstgCnt
    }
    json_fund.append(data)
json.dumps(json_fund)