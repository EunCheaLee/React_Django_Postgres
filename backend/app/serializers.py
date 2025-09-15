# app/serializers.py
from rest_framework import serializers
from .models import (
    Region, Promotion, Channel, Date, Category, ProductCategory,
    Product, Customer2018to2022, Sales
)

# Region Serializer
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['rcode', 'sido', 'gugun', 'region']

# Promotion Serializer
class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ['procode', 'promotion', 'salep']

# Channel Serializer
class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['chcode', 'chname']

# Date Serializer
class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ['datecode', 'date', 'year', 'quarter', 'month', 'monthname']

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['kcode', 'kname']

# ProductCategory Serializer
class ProductCategorySerializer(serializers.ModelSerializer):
    category = serializers.IntegerField(source='category')  # IntegerField로 처리

    class Meta:
        model = ProductCategory
        fields = ['kcode', 'kname', 'category']

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    kcode = serializers.CharField(source='kcode')  # CharField로 처리

    class Meta:
        model = Product
        fields = ['pcode', 'productName', 'color', 'initPrice', 'price', 'kcode']

# Customer2018to2022 Serializer
class CustomerSerializer(serializers.ModelSerializer):
    rcode = serializers.IntegerField(source='rcode')  # IntegerField로 처리

    class Meta:
        model = Customer2018to2022
        fields = ['ccode', 'rcode', 'name', 'gender', 'birth']

# Sales Serializer
class SalesSerializer(serializers.ModelSerializer):
    date = DateSerializer(read_only=True)  # 중첩
    pcode = ProductSerializer(read_only=True)  # 중첩
    name = CustomerSerializer(read_only=True)  # 중첩
    procode = PromotionSerializer(read_only=True)  # 중첩
    chcode = ChannelSerializer(read_only=True)  # 중첩
    region = RegionSerializer(read_only=True)  # 중첩
    total_amount = serializers.SerializerMethodField()  # 계산된 필드

    # 편의 필드
    product_name = serializers.CharField(source='pcode.productName', read_only=True)
    customer_name = serializers.CharField(source='name.name', read_only=True)
    promotion_name = serializers.CharField(source='procode.promotion', read_only=True)
    channel_name = serializers.CharField(source='chcode.chname', read_only=True)
    region_name = serializers.CharField(source='region.region', read_only=True)

    class Meta:
        model = Sales
        fields = [
            'id', 'date', 'pcode', 'name', 'procode', 'chcode', 'quantity',
            'unit_price', 'region', 'total_amount', 'product_name',
            'customer_name', 'promotion_name', 'channel_name', 'region_name'
        ]

    def get_total_amount(self, obj):
        # 총 결제금액 = 수량 * 단가
        return obj.quantity * obj.unit_price