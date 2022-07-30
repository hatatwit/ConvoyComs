import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { globalStylesheet } from '../assets/globalStylesheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';


function Item({ item }) {
  return (
    <View style={globalStylesheet.listItem}>
      <Icon name='person-outline' style={globalStylesheet.icon}/>
      <Text style={globalStylesheet.txt}>{item.name}</Text>
    </View>
  );
}

export default class App extends React.Component {
  state = {
    data:[
        {"name": "trangH"},
        {"name": "frankieG"},
        {"name": "paulG"},

    ]
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