import {
  Paper,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const init = async () => {
      await getData();
    };
    init();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const resComments = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const commentData: IComment[] = await resComments.json();
      const postsData: IPost[] = await res.json();
      setPosts(postsData);
      setComments(commentData);
    } catch (err) {
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
              const currentPostComments = comments.filter((item => item.postId === post.userId))
              return <Row key={post.id} post={post} comments={currentPostComments} />
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
  );
};

export default Feed;
