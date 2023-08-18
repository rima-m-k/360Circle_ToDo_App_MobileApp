import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from './screens/Login';
import Signup from './screens/Signup';
import ToDo from './screens/ToDo';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" >
          {(props) => <Login {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Signup" >
          {(props) => <Signup {...props} />}
        </Stack.Screen>

        <Stack.Screen name="ToDo" >
          {(props) => <ToDo {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Forgot-password" >
          {(props) => <ForgotPassword {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Reset-Password" >
          {(props) => <ResetPassword {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

