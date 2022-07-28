import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
import { globalStylesheet } from '../assets/globalStylesheet';


export default function Home({navigation}) {

  const connectBtn = () => {
    //navigation.push('Call');
    console.log("HERE")
    console.log(data[1].userID)
    navigation.navigate('Call', {
      otherParam: data[1].userID
    })
  };

  const [data, setData] = useState([{ }]);
  const [userID, setUserID] = useState('');

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
            setData([...data, { userID: userID }]);
            setUserID('');
          } 
          // If userID unvalid or missing input -> Display alert dialog to redirect to home screen
          else{
            Alert.alert('Error', 'Your input UserID cannot be found. Please try again!', [
              {text: 'Try again', onPress: () => console.log('Alert closed')}, 
            ])
          }
          console.log('Added new user ID');
        }}
      />
      <FlatList
        keyExtractor={(item) => item}
        data={data}
        renderItem={({ item }) => <Text style={globalStylesheet.txt}>{item.userID}</Text>}
      />
      <Button title='Connect' onPress={connectBtn}/>
    </View>
  );
}





