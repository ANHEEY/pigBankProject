from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from myfundApp.utils.fundList import get_json_fund
from myfundApp.utils.threeMonth_chart import threeM_chart


# VIEW : 서버와 데이터를 연결시켜주는 역할 => MVC의 CONTROLLER 
def fund_list(request):
    if request.method == 'GET':
        try:
            fund_data = get_json_fund()  
            return JsonResponse(fund_data, safe=False)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)

def fund_chart(request, key):
    if request.method == 'GET':
        try:
            threeMonth_data = threeM_chart(key)
            return JsonResponse(threeMonth_data, safe=False)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
