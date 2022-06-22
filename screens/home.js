import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { globalStylesheet } from '../assets/globalStylesheet';

export default function Home({navigation}) {

  const connectBtn = () => {
    navigation.push('Call');
  };

  const[device1, setDevice1] = useState(false);
  const[device2, setDevice2] = useState(false);
  const[device3, setDevice3] = useState(false);

  const selectedDevice = []

  const select = () => {
    if(device1 == true){
      selectedDevice.push("Device 1")
    }
    if(device2 == true){
      selectedDevice.push("Device 2")
    }
    if(device3 == true){
      selectedDevice.push("Device 3")
    }    
  }

  return (
    <View style={globalStylesheet.container}>
      <Text>Nearby Devices</Text>
      <CheckBox 
        title='Device 1'
        checked={device1}
        onPress={()=>setDevice1(!device1)}
      />
      <CheckBox 
        title='Device 2'
        checked={device2}
        onPress={()=>setDevice2(!device2)}
      />
      <CheckBox 
        title='Device 3'
        checked={device3}
        onPress={()=>setDevice3(!device3)}
      />
      <Button title='Connect' onPress={connectBtn}/>
    </View>
  );
}

