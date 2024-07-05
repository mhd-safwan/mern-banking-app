import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import UserTable from "../../components/UserTable/UserTable";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminDashboardPage.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const handleDisable = async (userId) => {
    try {
      await api.put(
        `/api/admin/user/${userId}/disable`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, disabled: !user.disabled } : user
        )
      );
      toast.success("User status updated");
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const paginatedUsers = users.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="admin-dashboard">
        <UserTable users={paginatedUsers} handleDisable={handleDisable} />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
