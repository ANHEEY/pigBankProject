# rest
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from jangoweb.utils.about import get_utils_about
from jangoweb.utils.fundList import get_json_fund

def get_views_about(request):
    return JsonResponse(data=get_utils_about())

def fund_list(request):
    if request.method == 'GET':
        try:
            fund_data = get_json_fund()  
            return JsonResponse(fund_data, safe=False)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)