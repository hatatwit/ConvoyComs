import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Call from '../screens/call';

const mainStack = createStackNavigator({
    Home: {screen: Home},
    Call: {screen: Call}
});

export default createAppContainer(mainStack);