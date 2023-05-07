import { View, Text, Button, StyleSheet ,Image } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { firebase } from '../global/firebase';
import BlisterSampleResult from './BlisterSampleResult';

const BlisterSample = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [date, setDate] = useState(null);

  const [blisterSampleData, setBlisterSampleData] = useState(null);
  const [translucent, setTranslucent] = useState(null);
  const [blisterUnder, setBlisterUnder] = useState(null); 
  const [blisterUpper, setBlisterUpper] = useState(null); 
  const [necro, setNecro] = useState(null); 

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      const formData = new FormData();
      formData.append('image', {
        uri: result.assets[0].uri,
        name: 'test.jpg',
        type: 'image/jpeg'
      });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
      axios.post('http://192.168.1.7:3009/geo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async (response) => {

        setImage(result.assets[0].uri);
        // console.log("Response ",response);
        setGeoData(response.data);
        setLatitude(response.data.lat[0]);
        setLongitude(response.data.lon[0]);
        setDate(response.data.date[0]);
  
        console.log(response.data.lat[0]); 
        console.log(response.data.lon[0]); 
        console.log(response.data.date[0]);
        
      }).catch((error) => {
        console.log(error);
      });

      axios.post('http://192.168.1.7:3009/blisterSample', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async (response2) => {

        setImage(result.assets[0].uri);
        // console.log("Response ",response);
        setBlisterSampleData(response2.data);
        setTranslucent(response2.data.Translucent[0]);
        setBlisterUnder(response2.data.BlisterUnder[0]);
        setNecro(response2.data.Necro[0]);
        setBlisterUpper(response2.data.BlisterUpper[0]);
  
        console.log('Translucent',response2.data.Translucent[0]); 
        console.log(response2.data.BlisterUnder[0]); 
        console.log(response2.data.Necro[0]);
      }).catch((error) => {
        console.log(error);
      });

       // Create a reference to the Firebase Storage bucket
       const storageRef = firebase.storage().ref().child('SeveritySample/' + image.split('/').pop());
  
       // Upload the image to Firebase Storage
       const responseUrl = await fetch(image);
       const blob = await responseUrl.blob();
       const snapshot = await storageRef.put(blob);
 
       // Create a reference to the Firestore collection
       const collectionRef1 = firebase.firestore().collection('SeveritySample');
       console.log("HIII1");
       // Add the image metadata to the Firestore collection
       collectionRef1.add({
         image: await snapshot.ref.getDownloadURL(),
         date: date,
         geo: {
           latitude: parseFloat(latitude),
           longitude: parseFloat(longitude)
         },
         sampleData: {
          Translucent: translucent+'%',
          Blister_Upper: blisterUpper+'%',
          Blister_Under: blisterUnder+'%',
          Necro: necro+'%',
        }
       }).then((docRef) => {
         console.log("Document written with ID: ", docRef.id);
       }).catch((error) => {
         console.error("Error adding document: ", error);
       });
       console.log("HIII2");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////   


    }
  };

  if (image && translucent && blisterUpper && blisterUnder && necro) {
    return <BlisterSampleResult image={image} translucent={translucent} necro={necro} blisterUpper={blisterUpper} blisterUnder={blisterUnder}/>;
  } else if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
  <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 ,marginLeft:10, fontWeight: 'bold'}}>
    Please use the quadrant shape object like the below image. 
  </Text>    
  <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 30 }}>
    <Image
      source={require('../assets/IMG_3875.jpg')}
      style={[styles.image, { resizeMode: 'contain', width: 500, height: 400 }]}
    />
  </View>      
  <View style={{  justifyContent: 'space-between', paddingHorizontal: 60 }}>
    <Button title='Camera' onPress={() => pickImage()} style={{ width: '40%', marginBottom: 20 }} />
    <View style={{ height: 20 }} />
    <Button title='Gallery' onPress={() => pickImage()} style={{ width: '40%' }} />
  </View>
  {/* {image && <Image source={{ uri: image }} style={{ flex: 1 / 2 }} />} */}
</View>



    );
  }
  
  
};

export default BlisterSample;



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