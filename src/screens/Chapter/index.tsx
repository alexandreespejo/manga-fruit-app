import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Load from "../../components/Load";
import { ApplicationContext } from "../../contexts/Application";
import { getChapters } from "../../services";
import { Container, Banner, ContentWrraper, Label, ChapterButton, ChapterList } from "./style";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export default function ChapterScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const { mangaData } = route.params ?? {}
  console.log(route.params)
  const { startLoad, endLoad } = useContext(ApplicationContext);
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    startLoad();
    loadChapters();
  }, [])

  const loadChapters = () => {
    // const nextPage = page+1;

    getChapters(mangaData?.id).then((data) => {

      let chapterList = [];

      for (let volume in data.volumes) {
        const { chapters } = data.volumes[volume];
        for (let chapter in chapters) {
          chapterList.push(chapters[chapter]);
        }
      }

      setChapters(chapterList);
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false);
      endLoad();
    });
  }

  const openReader = (selected_id) => {
    navigation.navigate('Reader', { id: selected_id });
  }

  const listChapters = ({ item }) => {
    let label = `Capitulo ${item?.chapter}`;

    return (
      <ChapterButton onPress={() => openReader(item?.id)}>
        <Text numberOfLines={1}>{label}</Text>
      </ChapterButton>
    )
  }

  // const renderFooterLoader = () => {
  //   if (!isLoading) return null;
  //   return <Load />;
  // }

  // const onReachListEnd = () => {
  //   const nextPage = page + 1;
  //   if (nextPage <= maxPages) {
  //     setIsLoading(true);
  //     loadChapters();
  //   }
  // }

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
        url: mangaData?.coverLink ?? 'https://reactnative.dev/img/tiny_logo.png',
      }}
      />
      <ContentWrraper>
        <Label title>
          {mangaData?.attributes?.title?.en || 'Titulo do mangá'}
        </Label>
        {/* <Label desc> 
          {mangaDat?.attributes?.description?.en || 'Descrição do mangá'}
        </Label> */}
        <ChapterList
          data={chapters}
          renderItem={listChapters}
          keyExtractor={(item) => item.id}
        // onEndReached={onReachListEnd}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooterLoader}
        />

      </ContentWrraper>
    </Container>
  );
}