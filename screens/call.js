import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { globalStylesheet } from '../assets/globalStylesheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';


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
    console.log(navigation.state.params)
    

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