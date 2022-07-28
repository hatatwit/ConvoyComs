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
        <Text>{item.name}</Text>
      </View>
    </View>
  );
}

export default class App extends React.Component {


  constructor(props){
    super();
    this.manager = new BleManager();

    this.searchedDevice = [];
    this.connected = false;


    console.log('THERE')
    console.log(props)
    // only pushing one for today, rather than loop
    let devices = props.navigation.state.params; 

    let firstDevice = devices.otherParam
    console.log('Firrst device' + firstDevice)

    if(this.searchedDevice.indexOf(firstDevice) === -1){

      this.searchedDevice.push(firstDevice)

    }
    
    this.state = {
      data:[
         {"name": this.searchedDevice[0]}
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

    // remember about how manager destroys on unmount. 
    // Try to request extra permissions, find the different between yours and this trang app
    // restart app frequently to continue to retry

    this.manager.startDeviceScan(null, null, (error, device) => {
        // To avoid bluetooth access errors, use the permissions API

        if (error) {
            console.log("Scan operation error: " + JSON.stringify(error))
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (device.name === this.searchedDevice[0]) {

          this.manager.stopDeviceScan();

            // Proceed with connection.

          
          device.connect()
            .then((device) => {
                console.log(device.discoverAllServicesAndCharacteristics())
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
                console.log("Working with device")
                console.log(device)
               // Do work on device with services and characteristics
            })
            .catch((error) => {
                // Handle errors
                console.log("error" + JSON.stringify(error))
            });

          // device.isConnected()
          //   .then((isConnected)=>{
          //     toast("connecting...")
          //     console.log('isConnected:: ', isConnected)
          //     return isConnected ? device : device.connect();
          //   })
          //   .then((d) =>{
          //     toast("Connected")
          //     console.log('connect::', d);
          //     return d.discoverAllServicesAndCharacteristics();
          //   })
          //   .then((d) =>{
          //     console.log('discoverAllServicesAndCharacteristics::', d);
          //     return d.services;
          //   }).catch((error)=>{
          //     console.log(JSON.stringify(error))
          //   })


            
            
        }
        
    });
}

componentWillUnmount() {
  this.manager.stopDeviceScan();
  this.manager.destroy();
  delete this.manager;
}
  

  render(){    

    return (

      <View style={globalStylesheet.container}>
        <Button title="request bluetooth" onPress={requestBluetoothPermission} />

        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item }) => <Item item={item}/>}
        />
        <View style={globalStylesheet.btnContainer}>
          <FontAwesome.Button name='phone' style={globalStylesheet.btn}  />
          <FontAwesome.Button name='microphone' style={globalStylesheet.btn}  />
          <FontAwesome.Button name='plus' style={globalStylesheet.btn}  />
        </View>
      </View>

    );
  }
}