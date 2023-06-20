import { useState } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";

const Blog = ({ blog, setNotification, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [likes, setLikes] = useState(blog.likes);

  const handleLike = (blog) => {
    blog.likes = blog.likes + 1;
    blogService
      .update(blog.id, blog)
      .then((returnedBlog) => {
        setLikes(returnedBlog.likes);
        setNotification(`You liked ${blog.title}`, "success");
      })
      .catch((error) => {
        setNotification(`Like failed. Error: ${error}`, "error");
      });
  };

  return (
    <div style={blogStyle}>
      <div>
        <em>{blog.title}</em>
        <Togglable buttonLabel="View">
          <ul>
            <li> Author: {blog.author}</li>
            <li> URL: {blog.url}</li>
            <li>
              {likes} likes&nbsp;
              <button onClick={() => handleLike(blog)}>+</button>
            </li>
          </ul>
          <button onClick={() => removeBlog(blog)}>Remove</button>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
