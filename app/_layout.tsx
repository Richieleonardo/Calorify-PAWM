import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerShown: false,
      }}>
      <Stack.Screen name="login" options={{title: 'Login'}}/>
      <Stack.Screen name="register" options={{title: 'Register'}}/>
      <Stack.Screen name="history" options={{title: 'History'}}/>
      <Stack.Screen name="home" options={{title: 'Home'}}/>
      {/* <Stack.Screen name="index" options={{title: 'Home Page'}} /> */}
      <Stack.Screen name="+not-found"/>
    </Stack>
  );
}
