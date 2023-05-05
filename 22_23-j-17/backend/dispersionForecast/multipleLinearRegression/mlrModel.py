# Importing the libraries
import numpy as np
import pandas as pd
from numpy import math

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error

import matplotlib.pyplot as plt
import pickle

df = pd.read_csv("backend\\dispersionForecast\\weatherHistory.csv")

df = df.drop(columns=["Date"])

###### Adding the Label column ######

# Temperature
Temperature = df['Temperature']
Temperature_total = df['Temperature'].sum()
df['nor_temp'] = ((Temperature*-1)/(Temperature_total))*100

# Humidity
Humidity = df['Humidity']
Humidity_total = df['Humidity'].sum()
df['nor_hum'] = ((Humidity)/(Humidity_total))*100

# Wind_Speed
Wind_Speed = df['Wind_Speed']
WindSpeed_total = df['Wind_Speed'].sum()
df['nor_wind'] = ((Wind_Speed)/(WindSpeed_total))*100

# Total
df['Total_risk'] = df['nor_temp'] + df['nor_hum'] + df['nor_wind']
Total_risk = df['Total_risk']
Total_risk_Total = df['Total_risk'].sum()
df['Risk'] = ((Total_risk*10000)+28.083913).astype(int)

###### Model ######
df = df.drop(columns=["nor_temp", "nor_hum", "nor_wind", "Total_risk"])

dependent_variable = 'Risk'

# Create a list of independent variables
independent_variables = df.columns.tolist()

independent_variables.remove(dependent_variable)

# Create the data of independent variables
x = df[independent_variables].values

# Create the dependent variable data
y = df[dependent_variable].values

# Splitting the dataset into the Training set and Test set
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=0)

# Transforming data
scaler = MinMaxScaler()
x_train_trans = scaler.fit_transform(x_train)
x_test = scaler.transform(x_test)

# # Fitting Multiple Linear Regression to the Training set
# regressor = LinearRegression()
# regressor.fit(x_train_trans, y_train)

# # Predicting the Test set result
# y_pred = regressor.predict(x_test)

# print("MLR:Mean Squared Error:", math.sqrt(mean_squared_error(y_test, y_pred)))

# print("MLR:R2 Score:", r2_score(y_test, y_pred))

# # Make pickle file of the Model
# pickle.dump(regressor, open("mlrModel.pkl", "wb"))
