import { width } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { StyleSheet } from "react-native";

export const globalStylesheet = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 25,
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
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
      backgroundColor: "#000000",
      padding: 30, 
      borderRadius: 40
    },
  });