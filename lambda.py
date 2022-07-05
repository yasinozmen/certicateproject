import json
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO
import boto3
from boto3.session import Session
import os


def lambda_handler(event, context):
    session = Session(aws_access_key_id=os.environ.get('ACCESS_KEY'), aws_secret_access_key=os.environ.get('SECRET_KEY'))
    s3 = session.resource('s3')

    bucket = s3.Bucket("miuul")
    response = requests.get('https://miuul.s3.eu-central-1.amazonaws.com/cert_empty.png')
    img = Image.open(BytesIO(response.content))
    d = ImageDraw.Draw(img)
    res2 = requests.get(r"https://miuul.s3.eu-central-1.amazonaws.com/Lora-BoldItalic.ttf")
    fnt = ImageFont.truetype(BytesIO(res2.content), 56)

    text = "Sinan Artun"
    x = img.width / 2
    y = img.height / 2

    d.text((x + 60, y - 120), text, font=fnt, fill=(92, 99, 110), )
    img.save('/tmp/' + text + '.png')
    s3.meta.client.upload_file(Filename='/tmp/' + text + '.png', Bucket="miuul", Key='certs/' + text + '.png')

    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

