import { useState } from "react";
import "./AuthForm.css";
import { toast } from "react-toastify";

function AuthForm({ title, handleSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }
    handleSubmit(username, password);
  };

  return (
    <div className="auth-form">
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthForm;
