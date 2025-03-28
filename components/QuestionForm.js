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

export default function QuestionForm({
  initialQuestion = "",
  initialOptions = ["", "", "", ""],
  initialCorrectAnswerIndex = null,
  onSave,
  navigation,
  title,
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [options, setOptions] = useState(initialOptions);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    initialCorrectAnswerIndex
  );

  // Toggle correct answer selection
  const handleToggleCorrectAnswer = (index) => {
    setCorrectAnswerIndex(correctAnswerIndex === index ? null : index);
  };

  // Handle form submission
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
    onSave(newQuestion);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>

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
        onPress={() => navigation.navigate("View Questions")}
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
