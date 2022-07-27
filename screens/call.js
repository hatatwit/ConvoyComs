import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { globalStylesheet } from '../assets/globalStylesheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {BleManager} from 'react-native-ble-plx';



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

    
    this.state = {
      data:[
          {"name": "Device 1"},
          {"name": "Device 2"},
          {"name": "Device 3"},
      ]
    }
  }


  componentDidMount(){
    const {navigation}=this.props

    // only pushing one for today, rather than loop
    let devices = navigation.state.params; 

    let firstDevice = devices.otherParam[0]

    if(this.searchedDevice.indexOf(firstDevice) === -1){

      this.searchedDevice.push(firstDevice)

    }

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

  async scanAndConnect() {


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

          device.isConnected()
            .then((isConnected)=>{
              console.log('isConnected:: ', isConnected)
              return isConnected ? device : device.connect();
            })
            .then((d) =>{
              console.log('connect::', d);
              return d.discoverAllServicesAndCharacteristics();
            })
            .then((d) =>{
              console.log('discoverAllServicesAndCharacteristics::', d);
              return d.services;
            })
            
            
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