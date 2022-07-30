import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { globalStylesheet } from '../assets/globalStylesheet';


export default function Home({navigation}) {

  const connectBtn = () => {
    navigation.push('Call');
  };

  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  const checkedHandler = (index) => {
    const newData = [...data];
    newData[index].isChecked = !newData[index].isChecked;
    setData(newData);
  }

  return (
    <View style={globalStylesheet.container}>
      <TextInput
        style={globalStylesheet.txt}
        onChangeText={(userID) => setUserID(userID)}
        placeholder={'Enter to check valid user ID'}
        value={userID}
      />
      <Button
        title={'Check'}
        onPress={() => {
          // If userID valid -> Add to the list
          if (userID) {
            setData([...data, {userID: userID, isChecked: false }]);
            setUserID('');
          } 
          // If userID unvalid or missing input -> Display alert dialog to redirect to home screen
          else{
            Alert.alert('Error', 'Your input UserID cannot be found. Please try again!', [
              {text: 'Try again', onPress: () => console.log('Alert closed')}, 
            ])
          }
          console.log('Added new user ID: ' + String(userID));
        }}
      />
      <FlatList
        keyExtractor={(item) => item}
        data={data}
        renderItem={({ item, index }) => (
          <View>
            <CheckBox
              style={globalStylesheet.txt}
              title={item.userID}
              checked={item.isChecked}
              // onPress={() => item.isChecked(item.id=== true)}
              onPress={() => {checkedHandler(index)}}
            />
            {/* <Text style={globalStylesheet.txt}>{item.userID}</Text> */}
          </View>
        )}
      />
      

      <Button title='Connect' onPress={connectBtn}/>
    </View>
  );
}


