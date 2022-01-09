import SearchBar from "../../components/SearchBar";
import { Container } from "./style";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/Application";
import MangaList from "../../components/MangaList";
import Load from "../../components/Load";

export default function SearchScreen({navigation}) {
  const { searchData } = useContext(ApplicationContext)

  return (
    <Container>
      <SearchBar />
      <MangaList data={searchData} onMangaSelect={()=>navigation.navigate('Chapter')}/>
    </Container>
  );
}