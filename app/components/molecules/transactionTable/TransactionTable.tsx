import { type FC, useState } from 'react';
import { EditIcon } from 'lucide-react';
import {
  TransactionsTable,
  TransactionsTableContent,
  TransactionsTableHead,
  TransactionsTableRow,
} from '@/app/transactions/[id]/transactions.styled';
import Input from '@/app/components/atoms/input';
import { TransactionProps } from '@/app/transactions/[id]/page';
import { transactionsService } from '@/app/services/transactions/transactions';

const TransactionTable: FC<{
  transactionState: any;
}> = ({ transactionState }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectTransactionRow = (id: string) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  };
  return (
    <TransactionsTable>
      <TableHeadRow />
      {transactionState.transactions.map((transaction: TransactionProps) => (
        <>
          <TableContentRow
            transaction={transaction}
            isEditing={transaction.id === selectedId}
            onSelectTransaction={selectTransactionRow}
          />
        </>
      ))}
    </TransactionsTable>
  );
};

const TableHeadRow = () => (
  <TransactionsTableRow>
    <TransactionsTableHead>Descriptions</TransactionsTableHead>
    <TransactionsTableHead>Amount</TransactionsTableHead>
    <TransactionsTableHead>Category</TransactionsTableHead>
    <TransactionsTableHead>Comments</TransactionsTableHead>
    <TransactionsTableHead>Trx Actions</TransactionsTableHead>
  </TransactionsTableRow>
);

const TableContentRow: FC<{
  transaction: TransactionProps;
  isEditing: boolean;
  onSelectTransaction: (id: string) => void;
}> = ({ transaction, isEditing, onSelectTransaction }) => {
  const [category, setCategory] = useState<string | null>(null);

  const handleUpdateCategory = async (evt: any, id: string) => {
    evt.preventDefault()

    const body = {
      id,
      category
    }

    const response = await transactionsService.onUpdateTransaction(body)

    console.log('...response', response);
  }

  return (
    <>
      <TransactionsTableRow key={transaction.id}>
        <>
          <TransactionsTableContent>
            {transaction.details}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {transaction.amount}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {isEditing ? (
              <form
                onSubmit={(evt: any) =>
                  handleUpdateCategory(evt, transaction.id)
                }
              >
                <Input
                  type="text"
                  name="category"
                  value={category}
                  placeholder={transaction?.category}
                  onChange={evt => setCategory(evt.target.value.toUpperCase())}
                />
              </form>
            ) : (
              <p>{transaction.category}</p>
            )}
          </TransactionsTableContent>
          <TransactionsTableContent>{transaction?.comments}</TransactionsTableContent>
          <TransactionsTableContent>
            <EditIcon onClick={() => onSelectTransaction(transaction.id)} />
          </TransactionsTableContent>
        </>
      </TransactionsTableRow>
    </>
  );
};

export default TransactionTable;
