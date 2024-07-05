import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import TransactionList from '../../components/TransactionList/TransactionList';
import Navbar from '../../components/Navbar/Navbar';
import './DashboardPage.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

function DashboardPage() {
  const [userDetails, setUserDetails] = useState({});
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 5;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/users/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserDetails(response.data.userDetails);
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error('User account was suspended by admin');
          setIsDisabled(true);
        } else {
          toast.error('Failed to load dashboard data');
        }
      }
    };
    fetchData();
  }, []);

  const handleDeposit = async (amount) => {
    if (isDisabled) {
      toast.error('Account is disabled');
      return;
    }
    try {
      await api.post('/api/users/deposit', { amount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBalance(balance + amount);
      setTransactions([...transactions, { type: 'deposit', amount }]);
      toast.success('Deposit successful');
    } catch (error) {
      toast.error('Deposit failed');
    }
  };

  const handleWithdraw = async (amount) => {
    if (isDisabled) {
      toast.error('Account is disabled');
      return;
    }
    if (amount > balance) {
      toast.error('Insufficient balance');
      return;
    }
    try {
      await api.post('/api/users/withdraw', { amount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBalance(balance - amount);
      setTransactions([...transactions, { type: 'withdrawal', amount }]);
      toast.success('Withdrawal successful');
    } catch (error) {
      toast.error('Withdrawal failed');
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const paginatedTransactions = transactions.slice(
    currentPage * transactionsPerPage,
    (currentPage + 1) * transactionsPerPage
  );

  return (
    <div>
      <Navbar />
      <div className="dashboard-page">
        <h2>Dashboard</h2>
        <p>Username: {userDetails.username}</p>
        <p>Balance: ₹{balance}</p>
        <TransactionForm handleTransaction={handleDeposit} buttonLabel="Deposit" />
        <TransactionForm handleTransaction={handleWithdraw} buttonLabel="Withdraw" />
        <h3>Transaction History</h3>
        <TransactionList transactions={paginatedTransactions} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(transactions.length / transactionsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
