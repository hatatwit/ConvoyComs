import React from 'react';
import { Text, View, FlatList, Image, PermissionsAndroid, Button } from 'react-native';
import { globalStylesheet } from '../assets/globalStylesheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {BleManager} from 'react-native-ble-plx';




const requestBluetoothPermission = async (props, component) =>{

  try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
              title:"Coolio Bluetooth Permission Request",
              message: "GIVE US BEEGLETOOTH NOW",
              buttonNeutral: "Ask me later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
          }
      );
      if(granted == PermissionsAndroid.RESULTS.GRANTED){
          console.log("You can use the bluetooth")
      } else {
          console.log("Bluetooth permission denied")
      }
  } catch(err){
      console.warn(err)
  }
}


function Item({ item }) {
  return (
    <View style={globalStylesheet.listItem}>
      <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1946/1946392.png'}}  style={{width:50, height:50,borderRadius:20}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text>{item}</Text>
      </View>
    </View>
  );
}

export default class App extends React.Component {


  constructor(props){
    super();

    this.manager = props.navigation.state.params.managerParam; // BleManager


    let devices = props.navigation.state.params; // storing IDs of Bluetooth devices passed by user from checkboxes
    let firstDevice = devices.deviceName

    let passedDevices = [];
    if(passedDevices.indexOf(firstDevice) === -1){

      passedDevices.push(firstDevice)

    }

    console.log(passedDevices)

    this.canConnect = false;

    
    this.state = {
      searchDevices: passedDevices,

      availableDevices: [

      ],

      connectedDevices: [

      ]
      
    }
  }


  componentDidMount(){


    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
          console.log(state)
          this.scanAndConnect();
          subscription.remove();
      }
      else{
          console.log("powered off")
          console.log(state)
      }
  }, true);
  }

  scanAndConnect() {


    this.manager.startDeviceScan(null, null, (error, device) => {
        // To avoid bluetooth access errors, use the permissions API

        if (error) {
            console.log("Scan operation error: " + JSON.stringify(error))
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log('device.id is ' + device.id + " : " + device.name)
        // its bluetooth addres is B5:BD:36:27:D4:F6
        if (device.name === this.state.searchDevices[0]) {
          // need some way to alert the user when this happens.
          this.canConnect = true;
          console.log("device obj pushed : \n" + device)
          this.state.availableDevices.push(device)

          this.manager.stopDeviceScan();

            // Proceed with connection.

          
          // device.connect()
          //   .then((device) => {
          //       console.log(device.discoverAllServicesAndCharacteristics())
          //       return device.discoverAllServicesAndCharacteristics()
          //   })
          //   .then((sersAndChars) => {
          //       console.log("Working with device")
          //       console.log(sersAndChars)
          //      // Do work on device with services and characteristics
          //   })
          //   .catch((error) => {
          //       // Handle errors
          //       console.log("error" + JSON.stringify(error))
          //   });            
            
        }
        
    });
}

componentWillUnmount() {
  this.manager.stopDeviceScan();
  this.manager.destroy();
  delete this.manager;
}


connectDevice(){
  console.log('call button press')
  console.log("type of available device " + typeof(this.state.availableDevices))
  console.log("available device object again : \n" + this.state.availableDevices)
  console.log("JSON OF AVAILABLE OBJECT : \n" + JSON.stringify(this.state.availableDevices))


  this.manager.stopDeviceScan();
  this.manager.connectToDevice(this.state.availableDevices[0].id, {autoConnect:true}).then(async device =>{
    await device.discoverAllServicesAndCharacteristics();
    this.manager.stopDeviceScan();
    this.state.connectedDevices.push(device)

    device.services().then(async service => {
      for (const ser of service) {
        ser.characteristics().then(characteristic =>{
          console.log("Characteristics of device " + device.name + " \n:")
          console.log(JSON.stringify(characteristic))
        })
      }
    })
  })

  
}

seeConnected() {
  console.log(BleManager.connctedDevices());
}
  

  render(){    

    return (

      <View style={globalStylesheet.container}>
        <Button title="request bluetooth" onPress={requestBluetoothPermission} />

        <FlatList
          style={{flex:1}}
          data={this.state.searchDevices}
          renderItem={({ item }) => <Item item={item}/>}
        />
        <View style={globalStylesheet.btnContainer}>
          <FontAwesome.Button name='phone' style={globalStylesheet.btn} onPress = {() => this.connectDevice()}  />
          <FontAwesome.Button name='microphone' style={globalStylesheet.btn}  />
          <FontAwesome.Button name='plus' style={globalStylesheet.btn} onPress = {() => this.seeConnected()} />
        </View>
      </View>

    );
  }
}