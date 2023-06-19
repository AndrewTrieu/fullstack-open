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
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
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
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccessMessage("Login successful");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setSuccessMessage('Logout successful')
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Logout failed. Please try again later.')
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <div>
      <h2> All blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
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
