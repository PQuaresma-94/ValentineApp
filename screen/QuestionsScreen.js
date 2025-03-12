import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questionsData } from "../constants";

function getRandomSubset(array, n) {
  const arrCopy = [...array];
  arrCopy.sort(() => 0.5 - Math.random());
  return arrCopy.slice(0, n);
}

export default function QuestionsScreen({ route, navigation }) {
  const { quizType } = route.params || {};
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const savedData = await AsyncStorage.getItem("customQuestions");
        const storedQuestions = savedData ? JSON.parse(savedData) : [];

        if (quizType === "valentine") {
          setQuizQuestions(getRandomSubset(questionsData, 10));
        } else {
          if (storedQuestions.length === 0) {
            // Handle case where there are no custom questions
            setQuizQuestions([]);
          } else {
            setQuizQuestions(getRandomSubset(storedQuestions, 10));
          }
        }
      } catch (error) {
        console.error("Error loading custom questions:", error);
      }
    };

    loadQuestions();
  }, [quizType]);

  const handleOptionPress = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextPress = () => {
    if (quizQuestions.length === 0) return;

    if (
      selectedOptionIndex ===
      quizQuestions[currentQuestionIndex].correctAnswerIndex
    ) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers((prev) => [...prev, currentQuestionIndex]);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOptionIndex(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    if (quizType === "valentine") {
      setQuizQuestions(getRandomSubset(questionsData, 10));
    } else {
      setQuizQuestions(getRandomSubset(quizQuestions, 10));
    }

    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    setSelectedOptionIndex(null);
    setIncorrectAnswers([]);
  };

  if (quizQuestions.length === 0 && quizType === "personal") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer_questions}>
          <Text style={styles.title}>No Custom Questions Found</Text>
          <View style={styles.quizCard}>
            <Text style={styles.subtitle}>
              Please add questions to start the quiz.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AddQuestion")}
            >
              <Text style={styles.buttonText}>Add Custom Questions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading Quiz...</Text>
      </SafeAreaView>
    );
  }

  if (isQuizFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Quiz Finished!</Text>
          <Text style={styles.scoreText}>
            You scored {score} out of {quizQuestions.length}!
          </Text>

          {incorrectAnswers.length > 0 && (
            <View style={styles.incorrectContainer}>
              <Text style={[styles.title, { fontSize: 18 }]}>
                Questions You Got Wrong:
              </Text>
              {incorrectAnswers.map((qIndex) => {
                const questionObj = quizQuestions[qIndex];
                const correctAnswer =
                  questionObj.options[questionObj.correctAnswerIndex];
                return (
                  <View key={qIndex} style={{ marginVertical: 8 }}>
                    <Text style={styles.incorrectQuestion}>
                      {questionObj.question}
                    </Text>
                    <Text style={styles.correctAnswer}>
                      Correct Answer: {correctAnswer}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer_questions}>
        <Text style={styles.title}>
          {quizType === "valentine"
            ? "Valentine's Day Quiz ♥"
            : "Personal Quiz ♥"}
        </Text>

        <View style={styles.quizCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {currentQuestion.options.map((option, index) => {
            const isSelected = index === selectedOptionIndex;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionPress(index)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.button,
              selectedOptionIndex === null && { backgroundColor: "#aaa" },
            ]}
            onPress={handleNextPress}
            disabled={selectedOptionIndex === null}
          >
            <Text style={styles.buttonText}>
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Next"
                : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6e6",
  },
  scrollContainer: {
    padding: 16,
  },
  scrollContainer_questions: {
    flex: 1,
    justifyContent: "center",
    maxHeight: "100%",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#ff5c5c",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  quizCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
    color: "#333",
  },
  optionButton: {
    width: "100%", // Ensures uniform size
    maxWidth: 350, // Prevents stretching
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ffb3b3",
    borderRadius: 5,
    marginVertical: 6,
  },
  selectedOptionButton: {
    backgroundColor: "#ff9999",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 12,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  incorrectContainer: {
    marginVertical: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  incorrectQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff5c5c",
  },
  correctAnswer: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});
