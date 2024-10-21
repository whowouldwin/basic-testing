import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const transferringAmount = getBankAccount(1000);
    expect(() => account.transfer(200, transferringAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const senderAccount = getBankAccount(1000);
    const recipientAccount = getBankAccount(50);

    senderAccount.transfer(500, recipientAccount);

    expect(senderAccount.getBalance()).toBe(500);
    expect(recipientAccount.getBalance()).toBe(550);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const fetchBalance = await account.fetchBalance();

    expect(typeof fetchBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    await account.synchronizeBalance();
    const syncBalance = account.getBalance();
    expect(typeof syncBalance).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);

    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
