import { Field, PrivateKey, SmartContract, state, State, method } from '@o1labs/mina-sdk';
import { zkSNARK } from 'protokit';

export class AnonymousDonation extends SmartContract {
  @state(Field) totalDonations = State<Field>();

  init() {
    super.init();
    this.totalDonations.set(Field(0));
  }

  @method donate(donorPrivateKey: PrivateKey, donationAmount: Field) {
    // Verify donation validity
    const isValid = zkSNARK.verify(donationAmount, (amount) => amount > 0 && amount <= 1000);
    isValid.assertEquals(true, 'Donation amount must be between 1 and 1000');

    // Update total donations anonymously
    const currentTotal = this.totalDonations.get();
    this.totalDonations.set(currentTotal.add(donationAmount));
  }
}
