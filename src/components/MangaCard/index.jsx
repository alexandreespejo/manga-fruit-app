import { useCallback, useContext,useEffect,useState} from "react";
import { StyleSheet } from "react-native";
import { Image, Container, Title, InfoWrapper, TitleContainer, TagsContainer,Tag } from "./style";
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
      const responseCover = `https://uploads.mangadex.org/covers/${data.id}/${fileName}`;
      setCover(responseCover);

    }).catch((err)=>{
      console.log(err);
    });
  };

  const onMangaSelect=useCallback(()=>{
    setSelectedManga({...data,coverLink:cover});
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

  const renderTags = () => {
    return tags.map((tag,index)=>{
      return <Tag key={tag}><Title tag index={index}>{tag}</Title></Tag>
    })
  };
  
  return (
    <Container style={styles.containerShadow} onPress={()=>onMangaSelect()}>
      <Image source={{ url: cover }}/>
      <InfoWrapper>
        <TitleContainer>
          <Title>{data?.attributes?.title?.en}</Title>
          <Title autor>Lançamento: {data?.attributes?.year ?? 'Indefinido'}</Title>
          <Title autor>Status: {data?.attributes?.status ?? ''}</Title>
        </TitleContainer>
        <TagsContainer>
          {renderTags()}
        </TagsContainer>
      </InfoWrapper>
    </Container>
  );
}