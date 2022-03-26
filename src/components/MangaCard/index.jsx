import { useCallback, useContext,useEffect,useState} from "react";
import { StyleSheet,View } from "react-native";
import { Image, Container, Title, InfoWrapper, TitleContainer, TagsContainer } from "./style";
import { MaterialIcons } from '@expo/vector-icons';
import { ApplicationContext } from "../../contexts/Application";
import { getCover } from "../../services";

export default function MangaCard({ data,goToChapter }) {
  const { setSelectedManga } = useContext(ApplicationContext);
  const [cover,setCover]=useState('https://reactnative.dev/img/tiny_logo.png');
  const [tags,setTags]=useState([]);

  useEffect(() => {
    loadTags();
    loadCover();
  }, []);

  const loadTags=()=>{
    const tagList = data?.attributes?.tags;
    setTags(tagList.map(item=>item?.attributes?.name?.en));
  };

  const loadCover=()=>{
    const coverArt = data?.relationships.filter(item=>item.type==='cover_art')[0];

    getCover(coverArt?.id).then(item=>{

      const {fileName} = item?.data?.attributes;
      setCover(`https://uploads.mangadex.org/covers/${data.id}/${fileName}`);

    }).catch((err)=>{
      console.log(err);
    });
  };

  const onMangaSelect=useCallback(()=>{
    setSelectedManga(data);
    goToChapter();
  });

  const styles = StyleSheet.create({
    containerShadow: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      elevation: 1,
    }
  });
  
  return (
    <Container style={styles.containerShadow} onPress={()=>onMangaSelect()}>
      <Image
        source={{
          url: cover,
        }}
      />
      <InfoWrapper>
        <TitleContainer>
          <Title>{data?.attributes?.title?.en}</Title>
          <Title autor>Lançamento: {data?.attributes?.year ?? 'Indefinido'}</Title>
          <Title autor>Status: {data?.attributes?.status ?? ''}</Title>
        </TitleContainer>
        <TagsContainer>
          {tags.map(tag=>{
            return <Title>{tag}</Title>
          })}
        </TagsContainer>
      </InfoWrapper>
    </Container>
  );
}