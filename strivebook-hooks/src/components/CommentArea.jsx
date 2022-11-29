import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect, useState } from "react";

const CommentArea = ({ asin }) => {
  // state = {
  //   comments: [], // comments will go here
  //   isLoading: false,
  //   isError: false,
  // }
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [asin]);

  const fetchComments = async () => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjQwZmQ0YmUzZDAwMTU4NDVmZWQiLCJpYXQiOjE2Njk3MzI1ODcsImV4cCI6MTY3MDk0MjE4N30.p0vB7pawx4dUuyfFdrnTGn1zw8qGaBKvSladvY5Y2KQ",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        // this.setState({
        //   comments: comments,
        //   isLoading: false,
        //   isError: false,
        // })
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      } else {
        console.log("error");
        // this.setState({ isLoading: false, isError: true })
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} className=" comments-area" />
    </div>
  );
};

export default CommentArea;
