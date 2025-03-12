import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Questions", { quizType: "valentine" });
        }}
      >
        <Text style={styles.buttonText}>Valentine's Day Quiz</Text>
      </TouchableOpacity>

      {/* Button for Personal Questions */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Questions", { quizType: "personal" });
        }}
      >
        <Text style={styles.buttonText}>Personal Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddQuestion")}
      >
        <Text style={styles.buttonText}>Add Custom Questions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6e6", // Light pink background
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#ff5c5c",
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 12,
  },
});
