import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function ViewQuestionsScreen({ navigation }) {
  const [customQuestions, setCustomQuestions] = useState([]);

  const loadCustomQuestions = async () => {
    try {
      const savedData = await AsyncStorage.getItem("customQuestions");
      const storedQuestions = savedData ? JSON.parse(savedData) : [];
      setCustomQuestions(storedQuestions);
    } catch (error) {
      console.error("Error loading custom questions:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCustomQuestions();
    }, [])
  );

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

  const handleEditQuestion = (questionObj, index) => {
    navigation.navigate("Edit Questions", {
      questionToEdit: questionObj,
      questionIndex: index,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Add Question")}>
          <Fontisto name="plus-a" size={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Custom Questions</Text>

        {customQuestions.length === 0 ? (
          <View style={styles.questionCard}>
            <Text style={styles.noQuestionsText}>No questions added yet.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Add Question")}
            >
              <Text style={styles.buttonText}>Add Custom Question</Text>
            </TouchableOpacity>
          </View>
        ) : (
          customQuestions.map((q, index) => (
            <View key={index} style={styles.questionCard}>
              <Text style={styles.questionText}>{q.question}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleEditQuestion(q, index)}
              >
                <Text style={styles.buttonText}>Edit Question</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteQuestion(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
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
  button: {
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
    marginVertical: 10,
  },
});
