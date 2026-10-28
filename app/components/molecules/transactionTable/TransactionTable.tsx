import { type FC, useState } from 'react';
import {
  TransactionsTable,
  TransactionsTableContent,
  TransactionsTableHead,
  TransactionsTableRow,
} from '@/app/transactions/[id]/transactions.styled';
import Input from '@/app/components/atoms/input';
import { EditIcon } from 'lucide-react';
import { TransactionProps } from '@/app/transactions/[id]/page';

const TransactionTable: FC<{
  transactionState: any;
  showHideTextbox: any;
  setShowHideTextbox: any;
}> = ({ transactionState, showHideTextbox, setShowHideTextbox }) => {
  const [selectedId, setSelectedId] = useState<string | null>('');

  const selectTransactionRow = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };
  return (
    <TransactionsTable>
      <TransactionsTableRow>
        <TransactionsTableHead>Descriptions</TransactionsTableHead>
        <TransactionsTableHead>Amount</TransactionsTableHead>
        <TransactionsTableHead>Category</TransactionsTableHead>
        <TransactionsTableHead>Trx Actions</TransactionsTableHead>
      </TransactionsTableRow>
      {transactionState.transactions.map((transaction: TransactionProps) => (
        <>
          <TableContentRow
            transaction={transaction}
            showHideTextbox={showHideTextbox}
            setShowHideTextbox={setShowHideTextbox}
            onSelectTransaction={selectTransactionRow}
            selectedId={selectedId}
          />
        </>
      ))}
    </TransactionsTable>
  );
};

const TableContentRow: FC<{
  transaction: TransactionProps;
  showHideTextbox: any;
  setShowHideTextbox: any;
  onSelectTransaction: any;
  selectedId: string | null;
}> = ({
  transaction,
  showHideTextbox,
  setShowHideTextbox,
  onSelectTransaction,
  selectedId
}) => {
  const handleSelectTransactionToEdit = (id: string) => {
    onSelectTransaction(id);
    console.log('...id',id);
    console.log('...is true', selectedId === id);
    if (selectedId === id) {
      console.log('...got in here');
      setShowHideTextbox(!showHideTextbox)
    }
  }

  console.log(selectedId);
  return (
    <>
      {/*{isSelected && (*/}
      <TransactionsTableRow key={transaction.id}>
        <>
          <TransactionsTableContent>
            {transaction.details}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {transaction.amount}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {showHideTextbox ? (
              <Input placeholder="Update Category" />
            ) : (
              <p>{transaction.category}</p>
            )}
          </TransactionsTableContent>
          <TransactionsTableContent>
            <EditIcon
              onClick={() => handleSelectTransactionToEdit(transaction.id)}
            />
          </TransactionsTableContent>
        </>
      </TransactionsTableRow>
      {/*)}*/}
    </>
  );
};

export default TransactionTable;
