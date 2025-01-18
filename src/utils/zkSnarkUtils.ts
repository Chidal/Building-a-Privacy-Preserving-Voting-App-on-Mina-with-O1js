import { zkSNARK } from 'protokit';

export const verifyDonation = (amount: number): boolean => {
  return zkSNARK.verify(amount, (amt) => amt > 0 && amt <= 1000);
};
