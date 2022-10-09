
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";

export default function ImagesGallery ({images}){
 const [data,setData] = useState()
 useEffect(() => {
   console.log(images);
   setData(images.filter(e=>e!=null).map((e,index)=>{
    const item =   {
        original: window.baseurl+"uploads/"+e,
        thumbnail: window.baseurl+"uploads/"+e,
        originalClass:"original",
         thumbnailClass:"thumbnail"
      }
      return item
     }))  
     
  }, []);

  return data ? 
            <ImageGallery items={data} />
 : null;
};


