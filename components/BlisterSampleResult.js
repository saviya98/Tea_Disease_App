import React from 'react';
import { View, Text, Image,ScrollView } from 'react-native';

const BlisterSampleResult = ({ image, translucent,necro,blisterUpper,blisterUnder }) => {
  return (
    <ScrollView>
        <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>
            Blister infected ratio within the quadrant area
        </Text>
       
        <View style={{ alignItems: 'flex-start', marginLeft: 60 , marginTop: 30 }}>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={require('../Translucent.jpg')} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={{ marginBottom: 20 ,fontSize: 15, fontWeight: 'bold'}}>Translucent spots  : {translucent}%</Text>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={require('../Blister_Upper.jpg')} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={{ marginBottom: 20  ,fontSize: 15, fontWeight: 'bold'}}>Blister Upper spots: {blisterUpper}%</Text>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={require('../Blister_Under.jpg')} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={{ marginBottom: 20  ,fontSize: 15, fontWeight: 'bold'}}>Blister Under spots: {blisterUnder}%</Text>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={require('../Necro.jpg')} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={{ marginBottom: 20  ,fontSize: 15, fontWeight: 'bold'}}>Necrotic spots    : {necro}%</Text>
        </View>
            {/* <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
            </View> */}
        </View>
        </ScrollView>

  );
};

export default BlisterSampleResult;
