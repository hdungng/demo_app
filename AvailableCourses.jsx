import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

const AvailableCourses = ({ navigation }) => {
  var listCourseOrder = [];

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = () => {
      const coursesCollection = ref(db, "Class");

      onValue(coursesCollection, (snapshot) => {
        const data = snapshot.val();

        const arr = Object.keys(data).map((key) => data[key]);

        setCourses(arr);
        setFilteredCourses(arr);
      });
    };

    fetchCourses();
  }, []);

  const addToCart = async (course) => {
    let ordered = await AsyncStorage.getItem("cartItems");

    listCourseOrder = JSON.parse(ordered) ? JSON.parse(ordered) : [];

    if (
      !listCourseOrder.find((c) => c.name === course.name) ||
      listCourseOrder.length === 0
    ) {
      listCourseOrder.push(course);
      Alert.alert("Success", "Your order has been placed!", [{ text: "OK" }]);
    } else {
      Alert.alert("Error", "You have put this course into your cart already.");
    }

    await AsyncStorage.setItem("cartItems", JSON.stringify(listCourseOrder));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const lowercasedQuery = text.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        (course.date && course.date.toLowerCase().includes(lowercasedQuery)) ||
        (course.teacher &&
          course.teacher.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredCourses(filtered);
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Image
        style={styles.image}
        source={{
          uri: "https://vesselify.com/wp-content/uploads/2017/08/JohnSuhar_AmyIppolitiDigYoga_20170730-220-scaled.jpg",
        }}
      />
      <Text style={styles.courseTitle}>{item.name}</Text>
      <Text style={styles.courseTeacher}>
        {item.teacher} - Starting Date: {item.date}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by date or teacher"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No courses found</Text>
        }
      />
      <View style={styles.bottomPanel}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("ShoppingCart")}
        >
          <Text style={styles.cartButtonText}>View Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderedButton}
          onPress={() => navigation.navigate("OrderedCourses")}
        >
          <Text style={styles.orderedButtonText}>Ordered Courses</Text>
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
  courseItem: {
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
    padding: 30,
    marginBottom: 24,
    borderRadius: 20,
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
  courseTitle: {
    fontSize: 28,
    marginTop: 24,
    fontWeight: "bold",
  },
  courseTeacher: {
    marginTop: 24,
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    borderColor: "#007AFF",
    borderWidth: 2,
    fontWeight: "bold",
    padding: 18,
    borderRadius: 8,
    marginTop: 24,
  },
  addButtonText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  cartButton: {
    width: 150,
    borderColor: "#34C759",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  orderedButton: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  cartButtonText: {
    color: "#34C759",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  orderedButtonText: {
    color: '#000',
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomPanel: {
    paddingTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    width: 335,
    height: 200,
    textAlign: "center",
  },
});

export default AvailableCourses;
