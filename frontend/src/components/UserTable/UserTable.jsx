import "./UserTable.css";

function UserTable({ users, handleDisable }) {
  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.disabled ? "Disabled" : "Active"}</td>
              <td>
                <button onClick={() => handleDisable(user._id)}>
                  {user.disabled ? "Enable" : "Disable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
