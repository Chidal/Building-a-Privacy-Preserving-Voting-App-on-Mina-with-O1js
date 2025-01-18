import { AnonymousDonation } from './contracts/AnonymousDonation';
import { PrivateKey, Field } from '@o1labs/mina-sdk';

// Initialize the zkApp
const zkApp = new AnonymousDonation('<zkApp-address>');

// Create a new donor private key
const donorPrivateKey = PrivateKey.random();

// Make a donation
(async () => {
  const donationAmount = Field(100);
  await zkApp.donate(donorPrivateKey, donationAmount);
  console.log('Donation successful!');
})();
