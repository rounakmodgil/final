import React from 'react';
import Login from './Pages/login';
import Signup from './Pages/singup';
import SplashScreen from './Pages/splashscreen';
import {Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Searchpage from './Pages/searchpage';
import Profilepage from './Pages/profilepage';
import Profilelist from './Pages/profilelist';
import Explore from './Pages/Explore';
import ReviewPage from './Pages/reviewpage';
import AddReviewComponent from './Pages/addreviewcomponent';
import EditProfile from './Pages/EditProfile';
import Notifications from './Pages/Notifications';
import Aboutus from './Pages/Aboutus';
import SendFeedback from './Pages/SendFeedback';
import Map from './Pages/map';
export default function Routes() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Loginstack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
  const explorestack = () => (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Explore"
        component={Explore}
      />
      <Stack.Screen name="ReviewPage" component={ReviewPage} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );

  const searchstack = () => (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Search"
        component={Searchpage}
      />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="ReviewPage" component={ReviewPage} />
    </Stack.Navigator>
  );

  const profilestack = () => (
    <Stack.Navigator
     >
      <Stack.Screen options={{headerShown: false}} name="ProfilePage" component={Profilepage} />
      <Stack.Screen name="Add Review" component={AddReviewComponent} />
    </Stack.Navigator>
  );

  const profileliststack = () => (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profilelist"
        component={Profilelist}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
      <Stack.Screen name="SendFeedback" component={SendFeedback} />
    </Stack.Navigator>
  );

  const Tabstack = () => (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={explorestack}
        options={{
          title: 'Explore',
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'cover',
                }}
                source={require('./assets/explore.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={searchstack}
        options={{
          title: 'Search',
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'cover',
                }}
                source={require('./assets/Searchnavigation.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={profilestack}
        options={{
          title: 'Timeline',
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'cover',
                }}
                source={require('./assets/timeline.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profileliststack}
        options={{
          title: 'Profile',
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'cover',
                }}
                source={require('./assets/profile.jpeg')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Loginstack"
          component={Loginstack}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Tabstack"
          component={Tabstack}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
