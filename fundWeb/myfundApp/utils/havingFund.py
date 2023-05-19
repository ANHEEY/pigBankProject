import requests 
import json 
import matplotlib.pyplot as plt 
import datetime 

def having_fund(isinCds): 
    # 최신 1건의 데이터 조회  
    fund_info_list = [] 
    for isinCd in isinCds: 
        url = "http://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo" 
        params = { 
        "serviceKey": "zC0NCRtOkyKmmp/lYj1jwn9fMTkMWlT9b+8LMz9QqRlpfZssfsDbZuSRs5w0f/ZBqTQiH4Q/jreSevtU057hrg==", 
        "numOfRows" : 1, 
        "resultType" : "json", 
        "isinCd" : isinCd, 
        } 
        response = requests.get(url, params=params) 
        contents = response.text 
        print(contents) 

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
            fund_info_list.append({ 
                "isinCd" : isinCd, 
                "clpr" : clpr, 
                "hipr" : hipr , 
                "lopr" : lopr, 
                "basDt" : basDt, 
                }) 

    return fund_info_list 

 
 