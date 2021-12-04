import { useState } from "react";
import { TextInput } from "react-native";
import { Container } from "./style";

export default function SearchBar() {
  const [search, setSearch] = useState('')
  return (
    <Container>
      {/* <TextInput
        fieldName="Pesquise um titulo"
        onChangeText={setSearch}
        value={search}
      /> */}
    </Container>
  );
}