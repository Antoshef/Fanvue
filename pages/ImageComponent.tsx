import Image from "next/image";
import { FC, memo, useState } from "react";
import { IImage } from "./vault";

const ImageComponent: FC<{ image: IImage }> = ({ image }) => {
  const [fullWidth, setFullWidth] = useState(false)

  return (
    <Image
      alt={image.title}
      src={image.url}
      loading="lazy"
      layout="responsive"
      width={fullWidth ? window.innerWidth : 150}
      onClick={(prevState) => setFullWidth(!prevState)}
    />
  );
};

export default memo(ImageComponent)