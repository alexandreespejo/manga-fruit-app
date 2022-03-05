import { useContext, useState } from "react";
import { Container, Input } from "./style";
import { Feather } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import Button from "../Button";
import { getSearch } from "../../services";
import { ApplicationContext } from "../../contexts/Application";

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const { setSearchData,startLoad,endLoad  } = useContext(ApplicationContext)

  const onSearch = () => {
    startLoad();
    getSearch(search).then((data) => {
      setSearchData(data.mangas)
    }).catch(err => console.log(err)
    ).finally(()=>endLoad());
  }
  
  return (
    <Container>
      <Button onPress={() => onSearch()}>
        <Feather name="search" size={25} color={Colors.light.text} />
      </Button>

      <Input
        onChangeText={setSearch}
        value={search}
        placeholder="Pesquise um titulo"
        selectionColor={Colors.light.text}
      />
      {/* <Button onPress={() => { }}>
        <Feather name="sliders" size={25} color={Colors.light.text} />
      </Button> */}
    </Container>
  );
}