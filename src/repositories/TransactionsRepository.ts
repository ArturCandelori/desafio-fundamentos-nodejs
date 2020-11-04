import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeArray = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
      return 0;
    });

    const income = incomeArray.reduce((sum, current) => sum + current, 0);

    const outcomeArray = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
      return 0;
    });

    const outcome = outcomeArray.reduce((sum, current) => sum + current, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
