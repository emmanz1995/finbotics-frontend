import styled from 'styled-components';

export const TransactionsHeaders = styled.header``;
export const TransactionsContent = styled.div``;
export const TransactionsTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 6px;
`;
export const TransactionsTableRow = styled.tr`
  :nth-child(odd) {
    background-color: #dddddd;
  }
`;
export const TransactionsTableHead = styled.th`
  text-align: left;
  border: 1px solid #0a0a0a;
  padding: 4px;
`;
export const TransactionsTableContent = styled.td`
  text-align: left;
  border: 1px solid #0a0a0a;
  padding: 4px;
`;

export const ERROR = styled.span``;
