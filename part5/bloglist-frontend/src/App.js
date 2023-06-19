import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [urlAddress, setUrlAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const resetInputFields = () => {
    setUsername("");
    setPassword("");
    setTitle("");
    setAuthor("");
    setUrlAddress("");
  };

  const setNotification = (message, type) => {
    if (type === "success") {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } else if (type === "error") {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedInUserLocal = window.localStorage.getItem("loggedInUser");

    if (loggedInUserLocal) {
      const user = JSON.parse(loggedInUserLocal);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      resetInputFields();
      setNotification("Login successful", "success");
    } catch (exception) {
      setNotification("Wrong credentials", "error");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      setNotification("Logout successful", "success");
      window.localStorage.clear();
      blogService.setToken(null);
      setUser(null);
      resetInputFields();
    } catch (exception) {
      setNotification("Logout failed", "error");
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: urlAddress,
    };

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        resetInputFields();
        setNotification(
          `A new blog ${title} by ${author} at ${urlAddress} added`,
          "success"
        );
      })
      .catch((error) => {
        setNotification("Failed to add new blog: " + error, "error");
      });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogForm = () => (
    <div>
      <h2> Create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={urlAddress}
            name="Url"
            onChange={({ target }) => setUrlAddress(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <h2> All blogs</h2>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>URL</th>
        </tr>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </table>
    </div>
  );

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {user === null ? (
        <div>
          <p> Please log in </p>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p> {user.name} logged in </p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
