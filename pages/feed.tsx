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

type IComment = {
  postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    const init = async () => {
      await getData()
    }
    init()
  }, [])

  const getData = async () => {
    try {
      const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts")
      const resComments = await fetch("https://jsonplaceholder.typicode.com/posts")
      const postsData: IPost[] = await resPosts.json()
      const commentData: IComment[] = await resComments.json()
      setPosts(postsData)
      setComments(commentData)
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
