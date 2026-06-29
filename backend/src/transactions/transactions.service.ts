import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TypeTransaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(userId: number, dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionRepository.create({ ...dto, userId });
    return this.transactionRepository.save(transaction);
  }

  async findAllByUser(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction ${id} introuvable`);
    }
    if (transaction.userId !== userId) {
      throw new ForbiddenException('Cette transaction ne vous appartient pas');
    }
    return transaction;
  }

  async update(id: number, userId: number, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.findOne(id, userId);
    Object.assign(transaction, dto);
    return this.transactionRepository.save(transaction);
  }

  async remove(id: number, userId: number): Promise<void> {
    const transaction = await this.findOne(id, userId);
    await this.transactionRepository.remove(transaction);
  }

  async getStats(userId: number) {
    const transactions = await this.findAllByUser(userId);

    const totalRevenus = transactions
      .filter(t => t.type === TypeTransaction.REVENU)
      .reduce((sum, t) => sum + Number(t.montant), 0);

    const totalDepenses = transactions
      .filter(t => t.type === TypeTransaction.DEPENSE)
      .reduce((sum, t) => sum + Number(t.montant), 0);

    const solde = totalRevenus - totalDepenses;

    const parCategorie: Record<string, number> = {};
    transactions
      .filter(t => t.type === TypeTransaction.DEPENSE)
      .forEach(t => {
        parCategorie[t.categorie] = (parCategorie[t.categorie] || 0) + Number(t.montant);
      });

    return {
      totalRevenus,
      totalDepenses,
      solde,
      parCategorie,
      nombreTransactions: transactions.length,
    };
  }
}