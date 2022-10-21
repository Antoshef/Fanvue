import styled from "@emotion/styled";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { displayError } from "./displayError";
import { getData } from "./helpers";
import ImageComponent from "./ImageComponent";

export type IImage = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const GridTable = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

const Vault: FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setError(false)
      const imageData = await getData<IImage>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setImages(imageData);
    } catch (err) {
      setError(true)
      throw err;
    }
  };

  return (
    <GridTable>
      <Head>
        <title>Fanvue images</title>
      </Head>
      {!error &&
        images.map((image) => <ImageComponent key={image.id} image={image} />)}
      {error && displayError(init)}
    </GridTable>
  );
};

export default Vault;
