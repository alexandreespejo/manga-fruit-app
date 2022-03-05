import SearchBar from "../../components/SearchBar";
import { Container } from "./style";
import { useCallback, useContext } from "react";
import { ApplicationContext } from "../../contexts/Application";
import MangaList from "../../components/MangaList";

export default function SearchScreen({navigation}) {
  const { searchData } = useContext(ApplicationContext)

  const goToChapter=useCallback(()=>navigation.navigate('MangaStack'))

  return (
    <Container>
      <SearchBar />
      <MangaList data={searchData} goToChapter={goToChapter}/>
    </Container>
  );
}