'use client';

import { type ChangeEvent, type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  EditIcon,
  ViewIcon,
  // SearchCheck
} from 'lucide-react';
import {
  TransactionsTable,
  TransactionsTableContent,
  TransactionsTableHead,
  TransactionsTableRow,
} from '@/app/transactions/[id]/transactions.styled';
import Input from '@/app/components/atoms/input';
import { TransactionProps } from '@/app/transactions/[id]/page';
// import { transactionsService } from '@/app/services/transactions/transactions';
import { useSelectId } from '@/app/hooks';

const TransactionTable: FC<{
  transactionState: any;
  onHandleUpdateCategory: any;
  onSelectTransactionToView: (id: any) => void;
  selectTransaction: string | null;
}> = ({ transactionState, onHandleUpdateCategory }) => {

  const { selectedId, chooseId: selectTransactionRow } = useSelectId();
  return (
    <TransactionsTable>
      <TableHeadRow />
      {transactionState.transactions.map((transaction: TransactionProps) => (
        <>
          <TableContentRow
            transaction={transaction}
            isEditing={transaction.id === selectedId}
            onSelectTransaction={selectTransactionRow}
            onHandleUpdateCategory={onHandleUpdateCategory}
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
  onHandleUpdateCategory: any;
}> = ({
  transaction,
  isEditing,
  onSelectTransaction,
  onHandleUpdateCategory,
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const router = useRouter();

  return (
    <>
      <TransactionsTableRow key={transaction?.id}>
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
                  onHandleUpdateCategory(evt, transaction.id, category)
                }
              >
                <Input
                  type="text"
                  name="category"
                  value={category}
                  placeholder={transaction?.category}
                  onChange={(evt: ChangeEvent<HTMLInputElement>): void =>
                    setCategory(evt.target.value.toUpperCase())
                  }
                />
              </form>
            ) : (
              <p>{transaction.category}</p>
            )}
          </TransactionsTableContent>
          <TransactionsTableContent>
            {transaction?.comments}
          </TransactionsTableContent>
          <TransactionsTableContent>
            <EditIcon
              onClick={() => onSelectTransaction(transaction.id)}
              cursor="pointer"
            />{' '}
            <ViewIcon
              cursor="pointer"
              onClick={() =>
                router.push(`/transactions/view/${transaction.id}`)
              }
            />
          </TransactionsTableContent>
        </>
      </TransactionsTableRow>
    </>
  );
};

export default TransactionTable;
