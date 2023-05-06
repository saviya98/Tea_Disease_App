import PIL.ExifTags
import PIL.Image
import metadata
import numpy as np
import pandas as pd
import math
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error, mean_squared_error
import matplotlib.pyplot as plt
from datetime import date
import datetime
from sklearn.metrics import r2_score
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, request, jsonify, render_template, send_file
import pickle
import jsonpickle

import dispersionForecast.openWeatherMap
import dispersionForecast.multipleLinearRegression.mlrModel
import dispersionForecast.openWeatherMap
import dispersionForecast.gaussianPlumeModel

import metadata_parser
# import keras.utils as image
# from keras.models import load_model

import cv2
import blistersample
import cultivarIdentification

import blisterIdentification
import severitySymptoms

# WSGI Application
app = Flask(__name__)

################ Loch Start #####################

# Load the pickle model
model_temp = pickle.load(open("tempARIMAmodel.pkl", "rb"))
model_hum = pickle.load(open("humARIMAmodel.pkl", "rb"))
model_wind = pickle.load(open("windARIMAmodel.pkl", "rb"))

########################## Weather Forecasting #########################################
# Get current date
today = date.today()
last_date = datetime.date(2022, 9, 25)
gap = today - last_date
gap = gap.days

# Taking prediction values for next 14 days
prediction_temp = model_temp.predict(start=(999+gap), end=((999+gap)+13))

prediction_hum = model_hum.predict(start=(999+gap), end=((999+gap)+13))

prediction_wind = model_wind.predict(start=(999+gap), end=((999+gap)+13))

# Calculating Blister Blight Emergence Date

# Tempareture
for x in prediction_temp:
    if x <= 14.6:
        temp = 1
        break
    else:
        temp = 0

# Humidity
for x in prediction_hum:
    if x >= 0.7:
        hum = 1
        break
    else:
        hum = 0

# Wind Speed
for x in prediction_wind:
    if x >= 8.2:
        wind = 1
        break
    else:
        wind = 0

if temp == 1 and hum == 1 and wind == 1:
    msg = "There is a possibility of Blister Blight emergence within next two weeks"
else:
    msg = "The next two weeks are safe according to the weather data"

prediction_temp[1] = round(prediction_temp[1], 2)
prediction_hum[1] = round(prediction_hum[1], 2)
prediction_wind[1] = round(prediction_wind[1], 2)


@app.route("/predictions", methods=['GET'])
def predict():

    # return {'predictions': [prediction_temp[0], prediction_hum[0], prediction_wind[0], msg]}
    return {'prediction': [msg], 'Temperature': [prediction_temp[1]], 'Humidity': [prediction_hum[1]], 'Wind': [prediction_wind[1]]}


######################################## Risk Calculation ##############################
lat = 6.9126927
lon = 79.8506791

weather = dispersionForecast.openWeatherMap.get_weather(
    dispersionForecast.openWeatherMap.api_key, lat, lon)
weather = list(weather.values())
# Convert list to an array
weather = np.array(weather, dtype=float)

current_weather = weather

# Transforming data
scaler = MinMaxScaler()
x_train_trans_display = scaler.fit_transform(
    dispersionForecast.multipleLinearRegression.mlrModel.x_train)
weather = scaler.transform([current_weather])

# Load the pickle model
model_reg = pickle.load(open("mlrModel.pkl", "rb"))

risk_pred = model_reg.predict(weather)
risk_pred = risk_pred[0]
risk_pred = str(risk_pred.astype(int))+'%'


@app.route("/risk", methods=['GET'])
def risk():

    # return {'predictions': [prediction_temp[0], prediction_hum[0], prediction_wind[0], msg]}
    return {'risk': [risk_pred]}
# print(risk_pred)

######################################## Plume Gaussian Model ##############################


# dispersionForecast.gaussianPlumeModel.fullgaussianModel()
# dispersionForecast.gaussianPlumeModel.overlay_on_map()


################ Loch End #####################

################ Lihini Start #####################

############### Metadata Extraction
@app.route('/geo', methods=['POST'])
def geo():
    try:
        file = request.files['image']
        img = PIL.Image.open(file.stream)
        geoTag = metadata.get_image_metadata(img)
        return {'lat': [geoTag['north_decimal']], 'lon': [geoTag['east_decimal']], 'date': [geoTag['captured_date']]}
    except Exception as e:
        return str(e)

############### Get sample picture's bliater precentages
@app.route('/blisterSample', methods=['POST'])
def blisterSample():
    print("hi ", 3)
    try:
        file = request.files['image']
        img_array = np.frombuffer(file.read(), np.uint8)
        img2 = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        blisterS = blistersample.getBlisterSample(img2)
        return {'Translucent': [blisterS['Translucent']], 'BlisterUnder': [blisterS['Blister_Under']], 'BlisterUpper': [blisterS['Blister_Upper']] ,'Necro': [blisterS['Necro']]}
    except Exception as e:
        return str(e)
    

#get Cultivar
@app.route('/getCultivar', methods=['POST'])
def getCultivar():
    print("hi ", 3)
    try:
        file = request.files['image']
        img = PIL.Image.open(file.stream)
        cultivar = cultivarIdentification.getCultivar(img)
        return {'Cultivar': [cultivar['Cultivar']]}
    except Exception as e:
        return str(e)    

################ Lihini End #####################

################ Hassan Start #####################
@app.route('/getBlister', methods=['POST'])
def getBlister():
    print("hi getBlister", 3)
    try:
        file = request.files['image']
        img = PIL.Image.open(file.stream)
        Blister = blisterIdentification.getBlister(img)
        return {'Blister': [Blister['Blister']]}
    except Exception as e:
        return str(e)  
################ Hassan End #####################

# get Severity


@app.route('/getSeverity', methods=['POST'])

def getSeverity():
    try:

     file = request.files['image']

     img = PIL.Image.open(file.stream)

     severity = severitySymptoms.getSeverity(img)

     return {'Severity': [severity['Severity']]}

    except Exception as e:

     return str(e)


if __name__ == "__main__":
    #  app.run(host="http://192.168.1.106", port="5000", debug=True)
        app.run(host="192.168.8.100", port="3009", debug=True)

