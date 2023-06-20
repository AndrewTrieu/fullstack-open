import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <Togglable buttonLabel="view">
          <ul>
            <li> {blog.author}</li>
            <li> {blog.url}</li>
          </ul>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
