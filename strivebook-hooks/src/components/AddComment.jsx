import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin }) => {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: null,
  //   },
  // }
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: null,
  });
  console.log(comment);
  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     })
  //   }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setComment({
      comment: "",
      rate: 1,
      elementId: { asin },
    });
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjQwZmQ0YmUzZDAwMTU4NDVmZWQiLCJpYXQiOjE2Njk3MzI1ODcsImV4cCI6MTY3MDk0MjE4N30.p0vB7pawx4dUuyfFdrnTGn1zw8qGaBKvSladvY5Y2KQ",
          },
        }
      );
      if (response.ok) {
        alert("Comment was sent!");
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={(e) =>
              // this.setState({
              //   comment: {
              //     ...comment,
              //     comment: e.target.value,
              //   },
              // })
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              // this.setState({
              //   comment: {
              //     ...comment,
              //     rate: e.target.value,
              //   },
              // })
              setComment({
                comment: {
                  rate: e.target.value,
                },
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
