import { useContext, useEffect, useState } from "react";
import { Modal} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { ApplicationContext } from "../../contexts/Application";
import { getPages } from "../../services";
import { FontAwesome } from '@expo/vector-icons';
import { CloseButton } from "./style";


export default function ReaderScreen({navigation,route}) {
  const { startLoad,endLoad } = useContext(ApplicationContext);
  const [pages,setPages] = useState([]);

  useEffect(()=>{
    const { id } = route.params;
    startLoad();

    getPages(id).then(data=>{
      setPages(data?.images.map(item=>{
        return {url:item?.legacy}
      }));
    }).catch(err=>console.log(err)
    ).finally(()=>{
      endLoad();
    })
  },[])

  const closePage=()=>{
    navigation.goBack();
  }

  const header=()=>{
    return (
    <CloseButton onPress={()=>closePage()} >
      <FontAwesome name="close" size={30} color="white" />
    </CloseButton>
    )
  }
  
  return (
    <Modal visible={true} transparent={true}>
      { pages.length > 0 &&
        <ImageViewer renderHeader={header} imageUrls={pages}/>
      }
    </Modal>
  );
}