import os
import django
import pandas as pd
from django.core.management.base import BaseCommand

# Django 설정
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from app.models import Region, Promotion, Channel, Date, Category, ProductCategory, Product, Customer2018to2022

class Command(BaseCommand):
    help = "Load Excel data into Django models"

    def handle(self, *args, **kwargs):
        excel_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))),
            "data",
            "Details.xlsx"
        )
        xls = pd.ExcelFile(excel_path)

        # 시트별 모델 매핑
        sheet_model_map = {
            "지역": Region,
            "프로모션": Promotion,
            "채널": Channel,
            "날짜": Date,
            "2018년도~2022년도 주문고객": Customer2018to2022,
            "분류": Category,
            "제품분류": ProductCategory,
            "제품": Product
        }

        # 시트별 컬럼 매핑 (Excel 컬럼 → 모델 필드)
        sheet_column_map = {
            "지역": {"지역코드": "rcode", "시도": "sido", "구군시": "gugun", "지역": "region"},
            "프로모션": {"프로모션코드": "procode", "프로모션": "promotion", "할인율": "salep"},
            "채널": {"채널코드": "chcode", "채널명": "chname"},
            "날짜": {"날짜코드": "datecode", "날짜": "date", "년도": "year", "분기": "quarter", "월(No)": "month", "월(영문)": "monthname"},
            "2018년도~2022년도 주문고객": {"고객코드": "ccode", "지역코드": "rcode", "고객명": "name", "성별": "gender", "생년월일": "birth"},
            "분류": {"분류코드": "kcode", "분류명": "kname"},
            "제품분류": {"제품분류코드": "kcode", "제품분류명": "kname", "분류코드": "category"},
            "제품": {"제품코드": "pcode", "제품명": "productName", "색상": "color", "원가": "initPrice", "단가": "price", "제품분류코드": "kcode"}
        }

        for sheet_name in xls.sheet_names:
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            df.columns = df.columns.str.strip()  # 공백 제거

            if sheet_name not in sheet_model_map:
                continue

            Model = sheet_model_map[sheet_name]
            mapping = sheet_column_map[sheet_name]

            for _, row in df.iterrows():
                obj_data = {}
                for excel_col, model_field in mapping.items():
                    # 컬럼이 존재하지 않으면 건너뜀
                    if excel_col not in row:
                        continue

                    value = row[excel_col]
                    field = Model._meta.get_field(model_field)

                    # ForeignKey 처리
                    if field.is_relation and field.many_to_one:
                        try:
                            ModelClass = field.remote_field.model
                            value = ModelClass.objects.get(pk=value)
                        except Exception as e:
                            self.stdout.write(self.style.WARNING(
                                f"FK 매핑 실패: {sheet_name} {model_field}={value}, {e}"))
                            value = None

                    # 문자열이면 공백 제거
                    if isinstance(value, str):
                        value = value.strip()

                    obj_data[model_field] = value

                try:
                    # 이미 존재하면 삽입하지 않음
                    Model.objects.get_or_create(
                        **obj_data
                    )
                except Exception as e:
                    self.stdout.write(self.style.ERROR(
                        f"데이터 삽입 실패: {sheet_name} {obj_data}, {e}"))

        self.stdout.write(self.style.SUCCESS("모든 시트의 데이터가 성공적으로 저장되었습니다."))
