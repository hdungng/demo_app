import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "./firebase";
import { ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  let storedCartItems;

  useEffect(() => {
    const loadCartItems = async () => {
      storedCartItems = await AsyncStorage.getItem("cartItems");

      if (storedCartItems === null) {
        navigation.navigate("AvailableCourses");
      }
    };

    loadCartItems();
  }, []);

  const handleCheckout = async () => {    
    if (!name || !email) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    let cartItems = JSON.parse(storedCartItems);
    
    let id = Math.random().toString(16).slice(2);    

    try {
      const order = {
        name,
        email,
        courses: cartItems,
        date: new Date().toISOString(),
      };

      await set(ref(db, "Order/" + id), order);

      await AsyncStorage.removeItem("cartItems");

      Alert.alert("Success", "Your order has been placed", [
        { text: "OK", onPress: () => navigation.navigate("AvailableCourses") },
      ]);
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Error",
        "There was an error placing your order. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
    height: 60,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Checkout;
