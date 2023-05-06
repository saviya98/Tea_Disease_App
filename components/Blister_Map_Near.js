//importing components and modules
import { StyleSheet, Text, View,Dimensions,Image} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
const SCREEN_WIDTH =Dimensions.get('window').width
import {colors,parameters} from '../global/styles'
import { StatusBar } from 'expo-status-bar'
//access blister identified locations data in the data file
import { blisterAround } from '../global/data'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps'; 
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import {firebase} from '../global/firebase'



const Blister_Map_Near = () => {

//get user permission to access device location data
const checkPermission =async()=>{
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if(hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission
    }
    return true
};

const askPermission = async()=>{
    const permission = await Location.requestForegroundPermissionsAsync()
    return permission.status === 'granted';
};

//get device's location data
const getLocation = async() => {
  try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
          coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
  } catch (err) {
      console.log("Cannot access device location data.")
  }
}

const [location, setLocation] = useState({});

  const _map = useRef(1);

  useEffect(()=>{
    checkPermission();
    getLocation()
,[]})

//fucntion to get current location
const useCurrentLocation = async () => {
    let current_location = await Location.getCurrentPositionAsync({});
    return current_location.coords;
  };

 //
 const [current_location, setLocation2] = React.useState({latitude: 0, longitude: 0});

  React.useEffect(() => {
    useCurrentLocation().then(coords => {
      setLocation2(coords);
    });
  }, []);

  // initialized variables
  const [blister_locations, setUsers_blocations] = useState([]);
  //make reference for the database collection
  const todoRef = firebase.firestore().collection('blisterC');

  //useEffect hook is used to fetch data from the Firestore collection and update the state variable, 
  //blister_locations when the component mounts or updates
  useEffect(() => {
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const blister_locations = [];
      querySnapshot.forEach((doc) => {
        const { color, geo} = doc.data();
        blister_locations.push({
          //fields need to be extracted from the firestore collection
          color,
          geo,
        });
      });
      setUsers_blocations(blister_locations);//update the blister_locations state variable
    });

    return () => {
      // unsubscribes the listener from the Firestore collection when the component unmounts or updates
      unsubscribe();
    };
  }, []);

  //get locations which are in 5km radius of current location
  const filteredLocations = blister_locations.filter((item) => {
    //geolib library to calculate the distance between the user's location and the nearby locations
    const distance = geolib.getDistance(current_location, item.geo);
    return distance <= 5000;
  });

  //store the filtered locations
  const near_Locations = filteredLocations

  return (
    <View style ={styles.container}>
      
                    <View style ={{alignItems:"center",justifyContent:"center"}}>
                        
                       <MapView
                            //display the google map focusing 5km radius of user 
                            ref = {_map}
                            provider ={PROVIDER_GOOGLE}
                            style = {styles.map}
                            showsUserLocation ={false}
                            followsUserLocation = {true}
                            region = {{
                              //focus the map for current user location
                              latitude: current_location.latitude,
                              longitude: current_location.longitude,
                              // display the map with 5km radius based, on current user location
                              latitudeDelta: 2 / 111.32, 
                              longitudeDelta:  2 / (111.32 * Math.cos(current_location.latitude))
                            }}                            
                         >

                          <Marker 
                          //add a custom image to visulaize current user location
                            coordinate={current_location} 
                            image={require('../assets/icons8-standing-man-100_2_60.png')}
                            title={'Me'} />

                          {near_Locations.map((item,index)=>
                            // visulaize near identified locations on the map
                              <Marker 
                              coordinate = {item.geo} 
                              key= {index.toString()} 
                              pinColor={item.color}/>   
                              )
                              }
                       </MapView>
                    </View>
      <StatusBar style ="light" backgroundColor="#2058c0" translucent={true}/>

{/* add a risk level card for better user experience */}
      <View style={styles.colorIndicatorContainer}>
        <View style={styles.colorIndicatorCol}>
          <View style={styles.colorIndicator}>
            <Text style={styles.colorIndicatorText}>Risk level:</Text>
            </View>
            <View style={styles.colorIndicator}>
              <Image source={require('../assets/icons8-delivery-pin-for-parcel-delivery-location-making-24_red.png')} style={styles.colorIndicatorIcon} />
              <Text style={styles.colorIndicatorText}>High</Text>
            </View>
            <View style={styles.colorIndicator}>
              <Image source={require('../assets/icons8-delivery-pin-for-parcel-delivery-location-making-24_orange.png')} style={styles.colorIndicatorIcon} />
              <Text style={styles.colorIndicatorText}>Moderate</Text>
            </View>
            <View style={styles.colorIndicator}>
              <Image source={require('../assets/icons8-delivery-pin-for-parcel-delivery-location-making-24_green.png')} style={styles.colorIndicatorIcon} />
               <Text style={styles.colorIndicatorText}>Low</Text>
             </View>
        </View>
      </View>         
    </View>
  )
}

export default Blister_Map_Near

//styles for the relavent items 
const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:colors.white,
            paddingBottom:0,
            paddingTop:0,
            // paddingTop:parameters.statusBarHeight
        },
        header:{
          backgroundColor:colors.blue,
          height:parameters.headerHeight,
          alignItems:"flex-start"
         
        },
        
        map:{          
        height: 720,
         marginVertical: 0,
         width:SCREEN_WIDTH,
         paddingBottom:0,
            paddingTop:0,
        },
        text6:{
          fontSize:15,
          color:colors.black,
          marginLeft:105,
          marginRight:5,
          marginTop:-8
        },
        text4:{
          fontSize:30,
          fontWeight:'bold',
          color:colors.white,
          marginLeft:200,
          marginTop:-40
        },
        
        icon1: {
          marginLeft:10,
          marginTop:5
        },
    
       
        blisterAround: {
        width: 28,
        height: 14,
        
        },    
        
      colorIndicatorContainer: {
          position: 'absolute',
          top: 0,
          right: 0,
          flexDirection: 'column',
          alignItems: 'center',
          padding: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          paddingBottom:10
      },
      colorIndicator: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 2,
          borderRadius: 10,
          marginRight: 10,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start'
      },
      colorIndicatorIcon: {
          width: 15,
          height: 15,
          marginRight: 2,
          marginLeft:-2
      },
      colorIndicatorText: {
          fontWeight: 'bold',
          color: 'black',
          marginRight:-25
      },
      colorIndicatorCol: {
        flexDirection: 'column',
        alignItems: 'center'
    }

})