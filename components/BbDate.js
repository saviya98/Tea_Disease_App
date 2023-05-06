import React, { useState, useEffect } from "react";
import { View, Text, Button, Dimensions, ScrollView } from "react-native";
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const BbDate = () => {
    //get current date
    const [currentDate, setcurrentDate] = useState('')

    useEffect(() => {
        var date = new Date().getDate() // current Date
        var month = new Date().getMonth() + 1 // current Month
        var year = new Date().getFullYear() // current Year
        var hours = new Date().getHours() // current Hours
        var min = new Date().getMinutes() // current Minutes
        var sec = new Date().getSeconds() // current Seconds
        setcurrentDate(
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
        )
    }, [])

    const [dataARIMA, setDataARIMA] = useState([{}])


    useEffect(() => {
        fetch("http://192.168.8.100:3009/predictions").then(
        res => res.json()
        ).then(
            dataARIMA => {
                setDataARIMA(dataARIMA)
                console.log(dataARIMA)
            }
        )

    }, [])


    return (
        <><View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>

            {(typeof dataARIMA.prediction === 'undefined') ? (
                <Text>Loading...</Text>
            ) : (
                dataARIMA.prediction.map((prediction, i) => (
                    <Text style={{ textAlign: 'center', color: '#6d597a', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }} key={i}>{prediction}</Text>
                ))
            )}

            <Text style={{ textAlign: 'center', color: '#899dd0', fontWeight: 'bold' }}>Tomorrow's Weather Data</Text>

            {(typeof dataARIMA.Temperature === 'undefined') ? (
                <Text>Loading...</Text>
            ) : (
                dataARIMA.Temperature.map((Temperature, i) => (
                    <View style={{
                        backgroundColor: '#f8a4a4', width: 320, height: 50, marginTop: 10,
                        marginBottom: 5,
                        marginLeft: 20,
                        marginRight: 10, justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: 'center', color: COLORS.black, fontWeight: 'bold' }} key={i}>Temperature : {Temperature} °C</Text>
                    </View>
                ))
            )}
            {(typeof dataARIMA.Humidity === 'undefined') ? (
                <Text>Loading...</Text>
            ) : (
                dataARIMA.Humidity.map((Humidity, i) => (
                    <View style={{
                        backgroundColor: '#f8a4a4', width: 320, height: 50, marginTop: 10,
                        marginBottom: 5,
                        marginLeft: 20,
                        marginRight: 10, justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: 'center', color: COLORS.black, fontWeight: 'bold' }} key={i}>Humidity : {Humidity} g/m3</Text>
                    </View>
                ))
            )}
            {(typeof dataARIMA.Wind === 'undefined') ? (
                <Text>Loading...</Text>
            ) : (
                dataARIMA.Wind.map((Wind, i) => (
                    <View style={{
                        backgroundColor: '#f8a4a4', width: 320, height: 50, marginTop: 10,
                        marginBottom: 5,
                        marginLeft: 20,
                        marginRight: 10, justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: 'center', color: COLORS.black, fontWeight: 'bold' }} key={i}>Wind Speed : {Wind} km/h</Text>
                    </View>
                ))
            )}
        </View><ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{currentDate}</Text>
                    <Text style={{ textAlign: 'center', color: '#0d7377', fontWeight: 'bold' }}>Temprature for upcoming Week</Text>
                    <LineChart
                        data={{
                            labels: ["22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04"],
                            datasets: [
                                {
                                    data: [14.73111706, 14.66996099, 14.74075912, 14.80340294, 15.14916422, 15.06724188, 14.7990558, 14.74822037]
                                }
                            ]
                        }}
                        width={400} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="C"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#eee",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#6da7cc"
                            }
                        }}
                        // bezier // Making the curve
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }} />

                    <Text style={{ textAlign: 'center', color: '#0d7377', fontWeight: 'bold' }}>Humidity for upcoming Week</Text>
                    <LineChart
                        data={{
                            labels: ["22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04"],
                            datasets: [
                                {
                                    data: [0.72445284, 0.7285663, 0.72522354, 0.73153881, 0.71303472, 0.72068331, 0.73234401, 0.7420061]
                                }
                            ]
                        }}
                        width={400} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#eee",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        // bezier // Making the curve
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }} />

                    <Text style={{ textAlign: 'center', color: '#0d7377', fontWeight: 'bold' }}>Wind Speed for upcoming Week</Text>
                    <LineChart
                        data={{
                            labels: ["22/04", "23/04", "24/04", "25/04", "26/04", "27/04", "28/04"],
                            datasets: [
                                {
                                    data: [8.2487394, 8.2487394, 8.2487394, 8.14997873, 8.12376092, 8.12376092, 8.12376092, 8.12376092]
                                }
                            ]
                        }}
                        width={400} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#eee",
                            // backgroundGradientFrom: "#fb8c00",
                            // backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#f8a4a4"
                            }
                        }}
                        // bezier // Making the curve
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }} />
                </View>
            </ScrollView></>

    )
}

export default BbDate