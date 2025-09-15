from django.db.models import Sum, F, Count
from .models import Sales
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime

# 총매출액 def get_total_revenue(): return Sales.objects.aggregate(total=Sum(F('quantity') * F('unit_price')))['total'] or 0 class TotalRevenueAPIView(APIView): def get_total(self, request): total = get_total_revenue() return Response({'total_revenue': total}) # 매출이익 def get_total_profit(): return Sales.objects.aggregate(profit=Sum(F('quantity') * (F('unit_price') - F('pcode__initPrice'))))['profit'] or 0 class TotalProfitAPIView(APIView): def get(self, request): profit = get_total_profit() return Response({'total_profit': profit}) # 거래건수 def get_transaction_count(): return Sales.objects.count() class TransactionCountAPIView(APIView): def get(self, request): count = get_transaction_count() return Response({'transaction_count': count}) # 고객수 def get_customer_count(): return Sales.objects.values('name').distinct().count() class CustomerCountAPIView(APIView): def get(self, request): count = get_customer_count() return Response({'customer_count': count})

# 1️⃣ 총매출액
def get_total_revenue():
    return Sales.objects.aggregate(total=Sum(F('quantity') * F('unit_price')))['total'] or 0

class TotalRevenueAPIView(APIView):
    def get(self, request):  # 반드시 get 메서드
        total = get_total_revenue()
        return Response({'total_revenue': total})

# 2️⃣ 매출이익
def get_total_profit():
    return Sales.objects.aggregate(
        profit=Sum(F('quantity') * (F('unit_price') - F('pcode__initPrice')))
    )['profit'] or 0

class TotalProfitAPIView(APIView):
    def get(self, request):
        profit = get_total_profit()
        return Response({'total_profit': profit})

# 3️⃣ 거래건수
def get_transaction_count():
    return Sales.objects.count()

class TransactionCountAPIView(APIView):
    def get(self, request):
        count = get_transaction_count()
        return Response({'transaction_count': count})

# 4️⃣ 고객수
def get_customer_count():
    return Sales.objects.values('ccode').distinct().count()  # name → ccode로 수정

class CustomerCountAPIView(APIView):
    def get(self, request):
        count = get_customer_count()
        return Response({'customer_count': count})

# 1️⃣ 목표매출달성현황
def get_target_achievement():
    total = Sales.objects.aggregate(total=Sum(F('quantity') * F('unit_price')))['total'] or 0
    target = 100000000  # 가정 목표 1억
    achievement = (total / target) * 100 if target > 0 else 0
    return achievement

class TargetAchievementAPIView(APIView):
    def get(self, request):
        achievement = get_target_achievement()
        return Response({'target_achievement': achievement})


# 2️⃣ 채널별 매출
def get_channel_revenue():
    return Sales.objects.values('chcode__chname').annotate(
        revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-revenue')

class ChannelRevenueAPIView(APIView):
    def get(self, request):
        data = get_channel_revenue()
        return Response(list(data))


# 3️⃣ 프로모션별 매출
def get_promotion_revenue():
    return Sales.objects.values('procode__promotion').annotate(
        revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-revenue')

class PromotionRevenueAPIView(APIView):
    def get(self, request):
        data = get_promotion_revenue()
        return Response(list(data))


# 4️⃣ 연도별 매출 금액 및 이익률
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response

def get_yearly_revenue_profit():
    sales = Sales.objects.all()
    result = {}

    for s in sales:
        # 문자열 date → datetime
        try:
            dt = datetime.strptime(s.date, "%Y-%m-%d %H:%M:%S")  # 일반적인 DateTimeField 문자열
        except ValueError:
            dt = datetime.strptime(s.date, "%Y-%m-%d")  # 날짜만 있는 경우
        year = dt.year

        if year not in result:
            result[year] = {'revenue': 0, 'profit': 0}

        revenue = s.quantity * s.unit_price
        profit = s.quantity * (s.pcode.initPrice if s.pcode else 0)
        result[year]['revenue'] += revenue
        result[year]['profit'] += profit

    # 리스트 변환 및 마진율 계산
    response_data = []
    for year, d in result.items():
        margin = (d['profit'] / d['revenue'] * 100) if d['revenue'] else 0
        response_data.append({
            'year': year,
            'revenue': d['revenue'],
            'profit': d['profit'],
            'margin': margin
        })

    return response_data

class YearlyRevenueProfitAPIView(APIView):
    def get(self, request):
        try:
            data = get_yearly_revenue_profit()
            return Response(data)
        except Exception as e:
            print("Error in YearlyRevenueProfitAPIView:", e)
            return Response({"error": str(e)}, status=500)


# 5️⃣ 권역별 매출
def get_region_revenue():
    return Sales.objects.values('region').annotate(
        revenue=Sum(F('quantity') * F('unit_price'))
    ).order_by('-revenue')

class RegionRevenueAPIView(APIView):
    def get(self, request):
        data = get_region_revenue()
        return Response(list(data))