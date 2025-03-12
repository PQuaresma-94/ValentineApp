import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewQuestionsScreen({ navigation }) {
  const [customQuestions, setCustomQuestions] = useState([]);

  useEffect(() => {
    loadCustomQuestions();
  }, []);

  const loadCustomQuestions = async () => {
    try {
      const savedData = await AsyncStorage.getItem("customQuestions");
      const storedQuestions = savedData ? JSON.parse(savedData) : [];
      setCustomQuestions(storedQuestions);
    } catch (error) {
      console.error("Error loading custom questions:", error);
    }
  };

  const handleDeleteQuestion = async (index) => {
    const updatedQuestions = [...customQuestions];
    updatedQuestions.splice(index, 1);

    try {
      await AsyncStorage.setItem(
        "customQuestions",
        JSON.stringify(updatedQuestions)
      );
      setCustomQuestions(updatedQuestions);
      Alert.alert("Deleted", "Question has been removed.");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Custom Questions</Text>

      {customQuestions.length === 0 ? (
        <Text style={styles.noQuestionsText}>No questions added yet.</Text>
      ) : (
        customQuestions.map((q, index) => (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.questionText}>{q.question}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteQuestion(index)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffe6e6",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#ff5c5c",
  },
  questionCard: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffb3b3",
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#ff5c5c",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  backButton: {
    backgroundColor: "#aaa",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  noQuestionsText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
    marginTop: 10,
  },
});
