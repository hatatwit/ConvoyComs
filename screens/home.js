import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { globalStylesheet } from '../assets/globalStylesheet';

export default function Home({navigation}) {

  const connectBtn = () => {
    select(); // adds variables into array
    //navigation.push('Call');
    navigation.navigate('Call', {
      otherParam: selectedDevice
    })
  };

  const[device1, setDevice1] = useState(false);
  const[device2, setDevice2] = useState(false);
  const[device3, setDevice3] = useState(false);

  const selectedDevice = [] // never pushed into by 'select' func, although would want to add devices in future to add into selectedDevice

  const registeredDevices = [] // can be filled by user somehow

  const select = () => {
    if(device1 == true){
      // make it so it pushes only unique
      selectedDevice.push("JLab Go Air")
    }
    if(device2 == true){
      selectedDevice.push("Device 2")
    }
    if(device3 == true){
      selectedDevice.push("Device 3")
    } 
    console.log(selectedDevice)   
  }

  return (
    <View style={globalStylesheet.container}>
      <Text>Nearby Devices</Text>
      <CheckBox 
        title='JLab Go Air'
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

