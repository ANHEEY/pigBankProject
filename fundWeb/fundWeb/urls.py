
from django.urls import path, include
from myfundApp.views import fund_list

# 사이트의 URL과 뷰의 연결을 지정
urlpatterns = [
    path('fund/', fund_list , name='fund_list'),
]
