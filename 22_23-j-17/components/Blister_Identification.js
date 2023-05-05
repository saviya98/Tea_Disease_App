import React from "react";
import { View, Text, Button } from "react-native";
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const Blister_Identification = ({ navigation }) => {
    return (

        <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
            <Text style={{ color: COLORS.primary }}>Blister Identification View</Text>
            <Button onPress={() => navigation.navigate('Severity Symptom Identification')} title='Severity Symptom Identification'></Button>
            <Button onPress={() => navigation.navigate('Dispersion Pattern')} title='Blister Dispersion'></Button>
        </View>

    )
}

export default Blister_Identification