import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Load from "../../components/Load";
import { ApplicationContext } from "../../contexts/Application";
import { getChapters } from "../../services";
import { Container,Banner,ContentWrraper,Label, ChapterButton,ChapterContainer, ChapterList } from "./style";


export default function ChapterScreen({navigation}) {
  const { selectedManga,startLoad,endLoad } = useContext(ApplicationContext);
  const [page,setPage]= useState(0);
  const [maxPages,setMaxPages]= useState(1);
  const [isLoading,setIsLoading]= useState(false);
  const [chapters,setChapters]= useState([]);

  useEffect(()=>{
    if(chapters.length==0) return
    startLoad();
    loadChapters();
  },[])

  const loadChapters=()=>{
    const nextPage = page+1;
    
    getChapters(selectedManga.id_serie,nextPage).then((data)=>{
      setPage(nextPage);
      if(nextPage===1){
        setMaxPages(data.numberPages)
      }
      setChapters([...chapters,...data.chapters]);
    }).catch(err=> console.log(err)
    ).finally(()=> {
      setIsLoading(false);
      endLoad();
    });
  }

  const openReader=(selected_id)=>{
    navigation.navigate('Reader',{id:selected_id});
  }

  const listChapters=(data)=>{
    const {item} = data;
    let label = `Capitulo ${item?.number}`;
    if(item?.chapter_name && item?.chapter_name != '') label += ` : ${item?.chapter_name}`
    
    return (
    <ChapterButton onPress={()=>openReader(item.id_release)}>
      <Text numberOfLines={1}>{label}</Text>
    </ChapterButton>
    )
  }

  const renderFooterLoader = () => {
    if(!isLoading) return null;
    return <Load/>;
  }

  const onReachListEnd=()=>{
   const nextPage = page + 1;
    if(nextPage <= maxPages) {
      setIsLoading(true);
      loadChapters();
    }
  }

  const styles = StyleSheet.create({
    containerShadow: {
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      elevation: 1,
    }
  })

  return (
    <Container>
      <Banner source={{
          url: selectedManga?.cover ?? 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <ContentWrraper>
        <Label title>
          {selectedManga?.name || 'Titulo do mangá'}
        </Label>
        <Label desc> 
          {selectedManga?.description || 'Descrição do mangá'}
        </Label>
        <ChapterContainer style={styles.containerShadow}>
          <Label >
            Lista de capitulos
          </Label>
          <ChapterList
            data={chapters}
            renderItem={listChapters}
            keyExtractor={(i,index) => index}
            onEndReached={onReachListEnd}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooterLoader}
          />
        </ChapterContainer>
      </ContentWrraper>
    </Container>
  );
}