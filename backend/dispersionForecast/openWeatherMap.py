import requests
from tkinter import *
import math
import numpy as np


api_key = "fae6dc77fdff2d7a7f56fe816288a026"
lat = 6.9126927
lon = 79.8506791


def get_weather(api_key, lat, lon):

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"

    response = requests.get(url).json()

    Temperature = response['main']['temp']
    Temperature = (Temperature - 273.15)  # Convert to °C
    Temperature = format(Temperature, '.6f')

    Apparent_Temperature = response['main']['feels_like']
    Apparent_Temperature = (Apparent_Temperature - 273.15)  # Convert to °C
    Apparent_Temperature = format(Apparent_Temperature, '.6f')

    Humidity = response['main']['humidity']
    Humidity = (Humidity/100)

    Wind_Speed = response['wind']['speed']

    Wind_Bearing = response['wind']['deg']  # wind direction

    Visibility = response['visibility']

    Pressure = response['main']['pressure']

    return {
        'Temperature': Temperature,
        'Apparent_Temperature': Apparent_Temperature,
        'Humidity': Humidity,
        'Wind_Speed': Wind_Speed,
        'Wind_Bearing': Wind_Bearing,
        'Visibility': Visibility,
        'Pressure': Pressure
    }


weather = get_weather(api_key, lat, lon)
weather = list(weather.values())
# Convert list to an array
weather = np.array(weather, dtype=float)
