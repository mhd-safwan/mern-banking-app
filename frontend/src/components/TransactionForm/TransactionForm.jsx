import { useState } from 'react';
import './TransactionForm.css';
import { toast } from 'react-toastify';

function TransactionForm({ handleTransaction, buttonLabel }) {
  const [amount, setAmount] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      toast.error('Amount is required');
      return;
    }
    handleTransaction(parseInt(amount));
    setAmount(''); 
  };

  return (
    <form className="transaction-form" onSubmit={onSubmit}>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default TransactionForm;
