import './TransactionList.css';

function TransactionList({ transactions }) {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Amount (₹)</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.amount}</td>
            <td>{transaction.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;
