from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PersonDetail, PersonList


urlpatterns = format_suffix_patterns(
    [
        path("person/", PersonList.as_view(), name="person-list"),
        path("person/<int:pk>/", PersonDetail.as_view(), name="person-detail"),
    ]
)
