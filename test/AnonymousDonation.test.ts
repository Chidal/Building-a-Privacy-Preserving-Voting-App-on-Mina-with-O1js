import { AnonymousDonation } from '../src/contracts/AnonymousDonation';
import { PrivateKey, Field } from '@o1labs/mina-sdk';

describe('AnonymousDonation zkApp', () => {
  let zkApp: AnonymousDonation;

  beforeAll(() => {
    zkApp = new AnonymousDonation('<zkApp-address>');
  });

  test('donate with valid amount', async () => {
    const donorPrivateKey = PrivateKey.random();
    const donationAmount = Field(50);

    await zkApp.donate(donorPrivateKey, donationAmount);
    const totalDonations = zkApp.totalDonations.get();

    expect(totalDonations.equals(Field(50))).toBe(true);
  });

  test('donate with invalid amount', async () => {
    const donorPrivateKey = PrivateKey.random();
    const donationAmount = Field(1500); // Exceeds limit

    await expect(() => zkApp.donate(donorPrivateKey, donationAmount)).toThrow('Invalid donation amount');
  });
});
