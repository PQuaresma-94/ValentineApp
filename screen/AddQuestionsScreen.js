import React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuestionForm from "../components/QuestionForm";

export default function AddQuestionScreen({ navigation }) {
  const title = "Add Custom Question";

  const handleSaveQuestion = async (newQuestion) => {
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
    } catch (error) {
      console.error("Error saving question:", error);
      Alert.alert("Error", "Failed to save question.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <QuestionForm
        onSave={handleSaveQuestion}
        title={title}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffe6e6",
    flexGrow: 1,
  },
});
