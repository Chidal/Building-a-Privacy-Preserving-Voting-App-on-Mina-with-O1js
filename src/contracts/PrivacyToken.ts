import { SmartContract, state, State, method, PublicKey, Field } from '@o1labs/mina-sdk';

export class PrivacyToken extends SmartContract {
  @state(Map<PublicKey, Field>) balances = State<Map<PublicKey, Field>>();

  @method mint(recipient: PublicKey, amount: Field) {
    const balances = this.balances.get();
    const currentBalance = balances.get(recipient) || Field(0);
    balances.set(recipient, currentBalance.add(amount));
    this.balances.set(balances);
  }

  @method transfer(sender: PublicKey, recipient: PublicKey, amount: Field) {
    const balances = this.balances.get();
    const senderBalance = balances.get(sender) || Field(0);
    senderBalance.assertGte(amount, 'Insufficient balance');

    balances.set(sender, senderBalance.sub(amount));
    const recipientBalance = balances.get(recipient) || Field(0);
    balances.set(recipient, recipientBalance.add(amount));
    this.balances.set(balances);
  }
}
