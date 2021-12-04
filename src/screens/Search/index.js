import { SafeAreaView, Text } from "react-native";
import { SearchBar } from "react-native-screens";
import { Container } from "./style";

export default function SearchScreen() {
  return (
    <Container>
      <SearchBar />
    </Container>
  );
}