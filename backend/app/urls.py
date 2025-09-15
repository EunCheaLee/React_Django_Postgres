from django.urls import path, include
from . import views
from .views import TotalRevenueAPIView, TotalProfitAPIView, TransactionCountAPIView, CustomerCountAPIView, \
    TargetAchievementAPIView, ChannelRevenueAPIView, PromotionRevenueAPIView, YearlyRevenueProfitAPIView, \
    RegionRevenueAPIView

urlpatterns = [
    path('total-revenue', TotalRevenueAPIView.as_view(), name='total-revenue'),
    path('total-profit', TotalProfitAPIView.as_view(), name='total-profit'),
    path('transaction-count', TransactionCountAPIView.as_view(), name='transaction-count'),
    path('customer-count', CustomerCountAPIView.as_view(), name='customer-count'),
    path('target-achievement', TargetAchievementAPIView.as_view(), name='target-achievement'),
    path('channel-revenue', ChannelRevenueAPIView.as_view(), name='channel-revenue'),
    path('promotion-revenue', PromotionRevenueAPIView.as_view(), name='promotion-revenue'),
    path('yearly-revenue-profit', YearlyRevenueProfitAPIView.as_view(), name='yearly-revenue-profit'),
    path('region-revenue', RegionRevenueAPIView.as_view(), name='region-revenue'),
]