FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# بدلاً من تحميل المكتبات الضخمة في كل مرة عند تغيير كود بايثون، 
# سنقوم بتثبيت المكتبات أولاً قبل نسخ ملفات الكود الخاصة بك.
# بهذه الطريقة، إذا قمت بتعديل ملف main.py، لن يعيد Docker تحميل المكتبات.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]