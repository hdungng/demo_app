import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

const OrderCourses = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = ref(db, "Order");

      onValue(ordersCollection, (snapshot) => {
        const data = snapshot.val();

        const arr = Object.keys(data).map((key) => data[key]);

        setOrders(arr);
        setFilteredOrders([]);
      });
    };

    fetchOrders();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = orders.filter((course) => course.email === text);
    setFilteredOrders(filtered);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      {item.courses.map((course) => (
        <>
          <Text style={styles.coursesTitle}>{course.name}</Text>
          <Text key={course.id} style={styles.courseDesc}>
            Teacher: {course.teacher}
          </Text>
          <Text key={course.id} style={styles.courseDesc}>
            Date: {course.date}
          </Text>
          <Text key={course.id} style={styles.courseDesc}>
            Note: {course.comment}
          </Text>
        </>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Please enter your email to search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    fontSize: 16,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  coursesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  courseDesc: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  emptyList: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 32,
  },
});

export default OrderCourses;
