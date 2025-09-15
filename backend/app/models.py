# app/models.py
from django.db import models

class Region(models.Model):
    rcode = models.IntegerField(verbose_name="지역코드", primary_key=True)
    sido = models.CharField("시도", max_length=100)
    gugun = models.CharField("구군시", max_length=100)
    region = models.CharField("지역", max_length=100)

class Promotion(models.Model):
    procode = models.IntegerField(verbose_name="프로모션코드", primary_key=True)
    promotion = models.CharField("프로모션", max_length=100)
    salep = models.FloatField(verbose_name="할인율")
    def __str__(self):
        return f"{self.promotion} ({self.salep*100}%)"

class Channel(models.Model):
    chcode = models.IntegerField(verbose_name="채널코드", primary_key=True)
    chname = models.CharField("채널명", max_length=100)

class Date(models.Model):
    datecode = models.IntegerField(verbose_name="날짜코드")
    date = models.CharField(verbose_name="날짜", max_length=100,primary_key=True)
    year = models.IntegerField(verbose_name="년도")
    quarter = models.IntegerField(verbose_name="분기")
    month = models.IntegerField(verbose_name="월")
    monthname = models.CharField(verbose_name="월(영문)", max_length=100)

class Category(models.Model):
    kcode = models.IntegerField(verbose_name="분류코드", primary_key=True)
    kname = models.CharField("분류명", max_length=100)

class ProductCategory(models.Model):
    kcode = models.CharField("제품분류코드", max_length=100, primary_key=True)
    kname = models.CharField("제품분류명", max_length=100)
    category = models.IntegerField(verbose_name="분류코드")

class Product(models.Model):
    pcode = models.IntegerField(verbose_name="제품코드", primary_key=True)
    productName = models.CharField("제품명", max_length=100)
    color = models.CharField("색상", max_length=100)
    initPrice = models.IntegerField(verbose_name="원가")
    price = models.IntegerField(verbose_name="단가")
    kcode = models.CharField(verbose_name="제품분류코드", max_length=100)

class Customer2018to2022(models.Model):
    ccode = models.IntegerField(verbose_name="고객코드", primary_key=True)
    rcode = models.IntegerField(verbose_name="지역코드")
    name = models.CharField("고객명", max_length=100)
    gender = models.CharField("성별", max_length=10)
    birth = models.DateField(verbose_name="생년월일")
    def __str__(self):
        return f"{self.name} ({self.ccode})"

class Sales(models.Model):
    date = models.CharField("날짜", max_length=100)
    pcode = models.ForeignKey(Product, on_delete=models.CASCADE)
    ccode = models.ForeignKey(Customer2018to2022, on_delete=models.CASCADE)
    procode = models.ForeignKey(Promotion, on_delete=models.CASCADE)
    chcode = models.ForeignKey(Channel, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.IntegerField()
    region = models.CharField("지역", max_length=100)

    @property
    def total_amount(self):
        return self.quantity * self.unit_price

    class Meta:
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['pcode']),
            models.Index(fields=['ccode']),
        ]