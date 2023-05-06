import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Button, Image } from "react-native";
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { firebase } from '../global/firebase';

const Severity = ({ navigation }) => {

    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const getImageURL = async () => {
            const imageRef = firebase.firestore().collection('severity').doc('s1');
            const imageDoc = await imageRef.get();
            const imageURL = imageDoc.data().sev_img3;
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

        </View><View style={{ alignItems: 'center', marginLeft: 10, marginTop: 30 }}>
                {imageURL ? (
                    <Image source={{ uri: imageURL }} style={{ width: 300, height: 430 }} />
                ) : (
                    <Text>Loading...</Text>
                )}

                <View style={{ alignItems: 'center', marginLeft: 15, marginTop: 40 }}>
                    <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>Severity Level: Blister Stage</Text>
                </View>


            </View></>
    )
}


export default Severity
