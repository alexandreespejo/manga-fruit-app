import MangaCard from "../../components/MangaCard";
import { Container } from "./style";

export default function MangaList({ data,goToChapter }) {
  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      {
        data.map(mangaData => <MangaCard key={mangaData.id} data={mangaData} goToChapter={goToChapter}/>)
      }
    </Container>
  );
}