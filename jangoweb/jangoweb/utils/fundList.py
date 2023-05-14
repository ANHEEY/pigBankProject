import requests
import json

# 공공데이터 포털 : 금융위원회_증권상품시세정보 open api활용하여 정보 수집
# 한국 거래소에서 제공하는 증권상품(ETF)의 시세정보 

# End Point = https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService
# 일반 인증키(Encoding)	= zC0NCRtOkyKmmp%2FlYj1jwn9fMTkMWlT9b%2B8LMz9QqRlpfZssfsDbZuSRs5w0f%2FZBqTQiH4Q%2FjreSevtU057hrg%3D%3D
# 일반 인증키(Decoding)	= zC0NCRtOkyKmmp/lYj1jwn9fMTkMWlT9b+8LMz9QqRlpfZssfsDbZuSRs5w0f/ZBqTQiH4Q/jreSevtU057hrg==
# EndPoint+Encoding+Type=Json:  "https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo?serviceKey=zC0NCRtOkyKmmp%2FlYj1jwn9fMTkMWlT9b%2B8LMz9QqRlpfZssfsDbZuSRs5w0f%2FZBqTQiH4Q%2FjreSevtU057hrg%3D%3D&resultType=json"

# 한 페이지 결과수 30, 페이지번호 1 , 구분 json , 시가총액 50000000 이상 
# https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo?serviceKey=zC0NCRtOkyKmmp%2FlYj1jwn9fMTkMWlT9b%2B8LMz9QqRlpfZssfsDbZuSRs5w0f%2FZBqTQiH4Q%2FjreSevtU057hrg%3D%3D&#pageNo=1&resultType=json&beginMrktTotAmt=50000000 

# url + serviceKey + 한 페이지 결과수 30개
def get_json_fund():
    requestURL = "https://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo?serviceKey=zC0NCRtOkyKmmp%2FlYj1jwn9fMTkMWlT9b%2B8LMz9QqRlpfZssfsDbZuSRs5w0f%2FZBqTQiH4Q%2FjreSevtU057hrg%3D%3D&numOfRows=30&pageNo=1&resultType=json"
    
    response = requests.get(requestURL,verify=True)
    contents = response.text
    data = json.loads(contents)
    items = data['response']['body']['items']['item']

    json_fund =  []

    for item in items:
        isinCd = item['isinCd']             # 고유번호
        itmsNm = item['itmsNm']             # 종목명
        clpr = item['clpr']                 # 현재가
        vs = item['vs']                     # 전일비
        fltRt = item['fltRt']               # 등락율
        trqu = item['trqu']                 # 거래대금
        trPrc = item['trPrc']               # 거래량
        nPptTotAmt  =item['nPptTotAmt']     # 순자산

        data = {
            'isinCd' : isinCd,
            'itmsNm': itmsNm,
            'clpr': clpr,
            'vs': vs,
            'fltRt': fltRt,
            'trPrc': trPrc,
            'trqu': trqu,
            'nPptTotAmt': nPptTotAmt
        }
        json_fund.append(data)
    return json.dumps(json_fund)

