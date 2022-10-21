import { Grid, makeStyles } from "@mui/material";
import {  } from "@emotion/styled"
import type { NextPage } from "next";
import { useEffect, useState } from "react";

type IPost = {
  userId: number,
  id: number,
  title: string,
  body: string
}

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    const init = async () => {
      await getData()
    }
    init()
  }, [])

  const getData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data: IPost[] = await res.json()
      setPosts(data)
    } catch (err) {
      throw err
    }
  }
  
  const {  } = useStyles
  return <div>
    <Grid>

    </Grid>
  </div>;
};

const useStyles = makeStyles

export default Feed;
