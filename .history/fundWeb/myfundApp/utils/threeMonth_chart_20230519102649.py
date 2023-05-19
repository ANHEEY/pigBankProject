import requests 
import json 
import matplotlib.pyplot as plt 
import datetime 

def threeM_chart(key): 

    # 오늘날짜 + 3개월 전 날짜 가져오기  
    today = datetime.date.today() 
    threeM_ago = today - datetime.timedelta(days=3*30) 

    # 문자열로 변환  
    beginBasDt = threeM_ago.strftime("%Y%m%d") 
    endBastDt = today.strftime("%Y%m%d") 

    print('key : ' ,key) 
    print('오늘 날짜 : ',endBastDt)  
    print('3개월 전 날짜 : ',beginBasDt)  

    url = "http://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo" 

    params = { 
        "serviceKey": "zC0NCRtOkyKmmp/lYj1jwn9fMTkMWlT9b+8LMz9QqRlpfZssfsDbZuSRs5w0f/ZBqTQiH4Q/jreSevtU057hrg==", 
        "numOfRows": 100, 
        "resultType": "json", 
        "beginBasDt": beginBasDt, 
        "endBasDt": endBastDt, 
        "isinCd": key 
        } 

    response = requests.get(url, params=params) 
    contents = response.text # 출력테스트 
    print(contents) 
 
    response.raise_for_status() 
    data = response.json() 
    items = data["response"]["body"]["items"]["item"] 

    chart_result = [] 

    for item in items: 
        basDt = item["basDt"] # 기준일자 
        trqu = item["trqu"] # 거래량 
        trPrc = item["trPrc"] # 거래대금 
        clpr = item["clpr"] # 종가 
        hipr = item["hipr"] # 최고가 
        lopr = item["lopr"] # 최저가 
        print(basDt) 
        chart_data = { 
            "basDt" :int(basDt), 
            "trqu" : int(trqu), 
            "trPrc" : int(trPrc), 
            "clpr" : int(clpr), 
            "hipr" : int(hipr), 
            "lopr" :int(lopr) 
            } 
        chart_result.append(chart_data) 

    return json.dumps(chart_result) 

 
 

 