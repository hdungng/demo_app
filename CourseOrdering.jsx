import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CourseOrdering = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const storedCartItems = await AsyncStorage.getItem("cartItems");

      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    loadCartItems();
  }, []);

  const removeFromCart = async (itemName) => {
    const updatedCartItems = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{
            uri: "https://vesselify.com/wp-content/uploads/2017/08/JohnSuhar_AmyIppolitiDigYoga_20170730-220-scaled.jpg",
          }}
        />
        <View style={styles.texBox}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.teacher}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.name)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        }
      />
      <View style={styles.totalContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    borderWidth: 1,
    borderColor: '#222', 
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
  texBox: {
    marginLeft: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  emptyCart: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 32,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 16,
    marginTop: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    borderColor: "#34C759",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24
  },
  checkoutButtonText: {
    color: "#34C759",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 80,
    textAlign: "center",
  },
});

export default CourseOrdering;
