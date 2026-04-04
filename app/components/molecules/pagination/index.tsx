import type { FC, MouseEvent } from 'react';
import { Pagination as PaginationContainer } from './styles';
import Button from '../../atoms/button';

interface PaginationProps {
  totalPages: number;
  handleChangePage: (
    evt: MouseEvent<HTMLButtonElement>,
    pageNumber: number
  ) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages, handleChangePage }) => {
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
  return (
    <PaginationContainer>
      {pages.map((pageNumber: number, i: number) => {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={evt => handleChangePage(evt, pageNumber)}
            key={i}
          >
            {pageNumber}
          </Button>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
