
from django.urls import path, include
from myfundApp.views import fund_list,fund_chart,having_update


# 사이트의 URL과 뷰의 연결을 지정
urlpatterns = [
    path('fund/', fund_list ),
    # <str:key> ~> url패턴에서 추출된 문자열의 매개변수 
    path('fund/detail/<str:key>', fund_chart, name='fund_chart'),
    path('fund/having',having_update , name = "having_update"), 
]
