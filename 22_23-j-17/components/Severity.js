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
            const imageURL = imageDoc.data().sev_image;
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
            <Text style={{ color: COLORS.primary }}>Severity Symptom View</Text>
            <Button onPress={() => navigation.navigate('Severity Symptom Identification')} title='Severity Symptom Identification'></Button>
        </View><View>
                {imageURL ? (
                    <Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }} />
                ) : (
                    <Text>Loading...</Text>
                )}
            </View></>
    )
}


export default Severity
