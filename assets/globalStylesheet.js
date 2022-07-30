import { width } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { StyleSheet } from "react-native";

export const globalStylesheet = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 25,
    },
    listItem:{
      margin: 5,
      padding: 5,
      backgroundColor:"#FFF",
      width:"50%",
      flex:1,
      flexDirection:"row",
      borderRadius:5
    },
    btnContainer: {
      flexDirection: 'row',
      alignContent: 'space-between',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    btn: {
      padding: 22, 
    },
    txt: {
      fontSize: 18,
      paddingLeft: 20,
    },
    icon: {
      width: 30,
      height: 30,
    }

  });