import React,{useState,useRef,useEffect} from 'react'
import { View, Text, Button, Image,StyleSheet } from "react-native";
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { firebase } from '../global/firebase';

const Home = ({ navigation }) => {

    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const getImageURL = async () => {
            const imageRef = firebase.firestore().collection('cultivar').doc('xan5u18u79z111E07kDZ');
            const imageDoc = await imageRef.get();
            const imageURL = imageDoc.data().image;
            setImageURL(imageURL);
        };
        getImageURL();
    }, []);

    console.log(imageURL);

    const downloadImage = async () => {
        const storageRef = storage().refFromURL(imageURL);
        const url = await storageRef.getDownloadURL();
        return url;
    };

    return (
        <><View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
            <Text style={{ color: COLORS.primary }}>Home View</Text>
            <Button onPress={() => navigation.navigate('Blister Map(Near locations)')} title='Blister identified near locations.'></Button>
            <Button onPress={() => navigation.navigate('Blister Identification')} title='Blister Identification'></Button>
            <Button onPress={() => navigation.navigate('Blister Risk Map')} title='Blister Risk Assessment' style={{ width: '40%', marginBottom: 20 }} ></Button>
            <Button onPress={() => navigation.navigate('Blister Map')} title='Identified all Blister location.' style={{ width: '40%', marginBottom: 20 }} ></Button>
            <Button onPress={() => navigation.navigate('Blister Sample Count')} title='Blister Sample Count' style={{ width: '40%', marginBottom: 20 }} ></Button>
            <Button onPress={() => navigation.navigate('Cultivar')} title='Cultivar Identification' style={{ width: '40%', marginBottom: 20 }} ></Button>
        </View><View>
                {imageURL ? (
                    <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} />
                ) : (
                    <Text>Loading...</Text>
                )}
            </View></>
    )
}


export default Home



const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      marginTop:10
  },
  textInput:{
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fonySize:20,
    borderBottomWidth:1,
    borderBottomColor:"#000",
    marginBottom:10,
    textAlign:'center'
  },
  
  button:{
      marginTop:50,
      height:70,
      width:250,
      fonySize:20,
      backgroundColor:"#026efd",
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50,
    },



})