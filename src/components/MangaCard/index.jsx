import { StyleSheet } from "react-native";
import { Image, Container, Title, InfoWrapper, TitleContainer, RankContainer } from "./style";
import { MaterialIcons } from '@expo/vector-icons';

export default function MangaCard({ data,onMangaSelect }) {
  const styles = StyleSheet.create({
    containerShadow: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      elevation: 1,
    }
  })
  return (
    <Container style={styles.containerShadow} onPress={()=>onMangaSelect()}>
      <Image
        source={{
          url: data?.cover ?? 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <InfoWrapper>
        <TitleContainer>
          <Title>{data?.name}</Title>
          <Title autor>Autor: {data?.author}</Title>
        </TitleContainer>
        <RankContainer>
          <Title autor>{data?.categories[0].name}</Title>
          <RankContainer>
            <MaterialIcons name="star" size={25} color='#f7d017' />
            <Title autor> {data?.score}</Title>
          </RankContainer>

        </RankContainer>
      </InfoWrapper>
    </Container>
  );
}