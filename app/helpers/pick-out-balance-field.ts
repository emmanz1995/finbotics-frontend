import _ from 'lodash';
import { BalanceProps } from '../pages/AccountsDashboard';

/**
 * Helps pick out the important balance fields.
 * @param output - Balance object.
 * @returns {object} An object containing selected fields from initial balance object.
 */
export const pickBalanceFields = (output: BalanceProps) =>
  _.pickBy({
    id: output.id,
    amount: output.amount,
    currency: output.currency,
    type: output.type,
    metadata: output.metadata,
    accountDetailsId: output.accountDetailsId,
  });
