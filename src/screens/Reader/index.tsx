import { useContext, useEffect, useState } from "react"
import { Modal, Alert } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { ApplicationContext } from "../../contexts/Application"
import { getPages } from "../../services/mangadex"
import { CloseButton } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"

type ChapterDataType = any | undefined

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const chapterData: ChapterDataType = route?.params?.chapterData
  const { startLoad, endLoad } = useContext(ApplicationContext)
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (!chapterData) return

    startLoad()
    const id = chapterData.id
    getPages(id).then(data => {

      const pageList = data?.chapter?.data.map(item => {
        return { url: `${data?.baseUrl}/data/${data?.chapter?.hash}/${item}` }
      })

      setPages(pageList)

    }).catch((err) => {
      Alert.alert(
        'Falha',
        'Infelizmente não foi possivel carregar esse capitulo, tente mais tarde',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    }).finally(() => {
      endLoad()
    })
  }, [chapterData])

  const closePage = () => {
    navigation.goBack()
  }

  const header = () => {
    return (
      <CloseButton onPress={() => closePage()} >
        <FontAwesome name="close" size={30} color="white" />
      </CloseButton>
    )
  }

  return (
    <Modal visible={true} transparent={true}>
      {pages?.length > 0 &&
        <ImageViewer
          renderHeader={header}
          imageUrls={pages}
          loadingRender={() => <Load />}
        />
      }
    </Modal>
  )
}