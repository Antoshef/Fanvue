import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { FC, memo, useState } from "react";
import { IComment, IPost } from "./feed";

type IProps = {
  post: IPost;
  comments: IComment[];
};

const Row: FC<IProps> = ({ post, comments }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableHead
        onClick={(prevState) => setOpen(!prevState)}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.body}</TableCell>
      </TableHead>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>{comment.name}</TableCell>
                      <TableCell>{comment.email}</TableCell>
                      <TableCell>{comment.body}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default memo(Row);
