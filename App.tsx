import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "expo-dev-client"
import Main from "./src"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Main />
    </GestureHandlerRootView>
  )
}
