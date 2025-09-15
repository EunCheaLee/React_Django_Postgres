import os
import django
import pandas as pd
from django.core.management.base import BaseCommand
from app.models import (
    Sales, Customer2018to2022, Promotion, Channel, Date,
    Category, ProductCategory, Product, Region
)

# Django 설정
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

class Command(BaseCommand):
    help = "Load data from Sales.xlsx into Sales model"

    def handle(self, *args, **kwargs):
        # 엑셀 파일 경로
        excel_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))),
            "data",
            "Sales.xlsx"
        )

        # 엑셀 읽기
        df = pd.read_excel(excel_path)
        df.columns = df.columns.str.strip()  # 컬럼명 공백 제거

        # Excel 컬럼 → 모델 필드 매핑
        column_map = {
            "날짜": "date",          # Date 모델 PK (date)
            "제품코드": "pcode",      # Product.pcode
            "고객코드": "ccode",      # Customer2018to2022.ccode
            "프로모션코드": "procode", # Promotion.procode
            "채널코드": "chcode",     # Channel.chcode
            "Quantity": "quantity",
            "UnitPrice": "unit_price",
            "지역": "region",     # Region.rcode
        }

        inserted = 0
        for _, row in df.iterrows():
            obj_data = {}

            for excel_col, model_field in column_map.items():
                if excel_col not in df.columns:
                    continue

                value = row[excel_col]

                # FK 처리
                try:
                    if model_field == "date":
                        # 그냥 문자열로 넣기
                        value = str(value).strip()
                    elif model_field == "pcode":
                        value = Product.objects.get(pk=value)
                    elif model_field == "ccode":
                        value = Customer2018to2022.objects.get(pk=value)
                    elif model_field == "procode":
                        value = Promotion.objects.get(pk=value)
                    elif model_field == "chcode":
                        value = Channel.objects.get(pk=value)
                    elif model_field == "region":
                        if pd.isna(value):
                            value = None
                        else:
                            # 그냥 문자열로 저장
                            value = str(value).strip()
                except Exception as e:
                    self.stdout.write(self.style.WARNING(
                        f"FK 매핑 실패: {model_field}={row[excel_col]} ({e})"
                    ))
                    value = None

                obj_data[model_field] = value

            try:
                Sales.objects.get_or_create(**obj_data)
                inserted += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Sales 삽입 실패: {obj_data}, {e}"))

        self.stdout.write(self.style.SUCCESS(f"{inserted} 건의 Sales 데이터가 성공적으로 삽입되었습니다."))