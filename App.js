import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import the screens
import HomeScreen from "./screen/HomeScreen";
import QuestionsScreen from "./screen/QuestionsScreen";
import AddQuestionScreen from "./screen/AddQuestionsScreen";
import ViewQuestionsScreen from "./screen/ViewQuestinsScreen";
import EditQuestionScreen from "./screen/EditQuestionsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="Add Question" component={AddQuestionScreen} />
        <Stack.Screen name="View Questions" component={ViewQuestionsScreen} />
        <Stack.Screen name="Edit Questions" component={EditQuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
