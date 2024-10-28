import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AvailableCourses from './AvailableCourses';
import CourseOrdering from './CourseOrdering';
import OrderCourses from './OrderCourses';
import Checkout from './Checkout';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AvailableCourses">
        <Stack.Screen name="AvailableCourses" component={AvailableCourses} options={{ title: 'Available Courses' }} />
        <Stack.Screen name="ShoppingCart" component={CourseOrdering} options={{ title: 'Shopping Cart' }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Checkout' }} />
        <Stack.Screen name="OrderedCourses" component={OrderCourses} options={{ title: 'My Ordered Courses' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
