import React from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QuestionForm from "../components/QuestionForm";
import { StackActions } from "@react-navigation/native";

export default function EditQuestionScreen({ navigation, route }) {
  // Assume route.params contains the question object and its index in the list
  const { questionToEdit, questionIndex } = route.params;

  const title = "Edit Custom Question";

  const handleSaveQuestion = async (updatedQuestion) => {
    try {
      const storedQuestions = await AsyncStorage.getItem("customQuestions");
      const existingQuestions = storedQuestions
        ? JSON.parse(storedQuestions)
        : [];

      // Replace the edited question at the correct index
      existingQuestions[questionIndex] = updatedQuestion;

      await AsyncStorage.setItem(
        "customQuestions",
        JSON.stringify(existingQuestions)
      );
      Alert.alert("Success", "Question updated!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating question:", error);
      Alert.alert("Error", "Failed to update question.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <QuestionForm
        title={title}
        navigation={navigation}
        initialQuestion={questionToEdit.question}
        initialOptions={questionToEdit.options}
        initialCorrectAnswerIndex={questionToEdit.correctAnswerIndex}
        onSave={handleSaveQuestion}
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
