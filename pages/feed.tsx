import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {} from "@emotion/styled";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Row from "./Row";
import { getData } from "./helpers";
import { displayError } from "./displayError";
import Head from "next/head";

export type IPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type IComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setError(false)
      const postsData = await getData<IPost>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const commentsData = await getData<IComment>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(postsData);
      setComments(commentsData);
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Fanvue - View Posts</title>
      </Head>
      {!error && (
        <>
          {" "}
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => {
                  const currentPostComments = comments.filter(
                    (item) => item.postId === post.userId
                  );
                  return (
                    <Row
                      key={post.id}
                      post={post}
                      comments={currentPostComments}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {error && displayError(init)}
    </>
  );
};

export default Feed;
