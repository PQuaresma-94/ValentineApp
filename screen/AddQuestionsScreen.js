import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddQuestionScreen({ navigation }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  // Toggle correct answer selection
  const handleToggleCorrectAnswer = (index) => {
    setCorrectAnswerIndex(correctAnswerIndex === index ? null : index);
  };

  // Save the question to AsyncStorage
  const handleSaveQuestion = async () => {
    if (
      !question.trim() ||
      options.some((opt) => !opt.trim()) ||
      correctAnswerIndex === null
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const newQuestion = { question, options, correctAnswerIndex };

    try {
      const storedQuestions = await AsyncStorage.getItem("customQuestions");
      const existingQuestions = storedQuestions
        ? JSON.parse(storedQuestions)
        : [];
      const updatedQuestions = [...existingQuestions, newQuestion];

      await AsyncStorage.setItem(
        "customQuestions",
        JSON.stringify(updatedQuestions)
      );

      Alert.alert("Success", "Question added!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Custom Question</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
        multiline={true}
      />

      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Option ${index + 1}`}
            value={option}
            onChangeText={(text) => {
              const updatedOptions = [...options];
              updatedOptions[index] = text;
              setOptions(updatedOptions);
            }}
          />
          <TouchableOpacity
            style={[
              styles.toggleButton,
              correctAnswerIndex === index && styles.selectedToggleButton,
            ]}
            onPress={() => handleToggleCorrectAnswer(index)}
          >
            <Text style={styles.toggleButtonText}>
              {correctAnswerIndex === index ? "✓ Selected" : "Select"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuestion}>
        <Text style={styles.buttonText}>Save Question</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("ViewQuestions")}
      >
        <Text style={styles.buttonText}>View Custom Questions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
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
  input: {
    borderWidth: 1,
    borderColor: "#ffb3b3",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleButton: {
    marginLeft: 10,
    width: 100,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff9999",
    borderRadius: 5,
  },
  selectedToggleButton: {
    backgroundColor: "#ff5c5c",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#ff5c5c",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#ff9999",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
