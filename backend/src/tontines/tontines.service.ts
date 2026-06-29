import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tontine } from './entities/tontine.entity';
import { TontineMembre } from './entities/tontine-membre.entity';
import { CreateTontineDto } from './dto/create-tontine.dto';
import { AjouterMembreDto } from './dto/ajouter-membre.dto';

@Injectable()
export class TontinesService {
  constructor(
    @InjectRepository(Tontine)
    private readonly tontineRepository: Repository<Tontine>,
    @InjectRepository(TontineMembre)
    private readonly membreRepository: Repository<TontineMembre>,
  ) {}

  async create(userId: number, dto: CreateTontineDto): Promise<Tontine> {
    const tontine = this.tontineRepository.create(dto);
    const saved = await this.tontineRepository.save(tontine);

    // Le créateur devient automatiquement le 1er membre
    const premierMembre = this.membreRepository.create({
      tontineId: saved.id,
      userId,
      ordrePassage: 1,
    });
    await this.membreRepository.save(premierMembre);

    return this.findOne(saved.id, userId);
  }

  async findAllByUser(userId: number): Promise<Tontine[]> {
    const membres = await this.membreRepository.find({ where: { userId } });
    const tontineIds = membres.map((m) => m.tontineId);

    if (tontineIds.length === 0) return [];

    return this.tontineRepository.find({
      where: tontineIds.map((id) => ({ id })),
      relations: { membres: { user: true } },
    });
  }

  async findOne(id: number, userId: number): Promise<Tontine> {
    const tontine = await this.tontineRepository.findOne({
      where: { id },
     relations: { membres: { user: true } },
    });
    if (!tontine) {
      throw new NotFoundException(`Tontine ${id} introuvable`);
    }

    const estMembre = tontine.membres.some((m) => m.userId === userId);
    if (!estMembre) {
      throw new ForbiddenException('Vous ne faites pas partie de cette tontine');
    }

    return tontine;
  }

  async ajouterMembre(tontineId: number, userId: number, dto: AjouterMembreDto): Promise<Tontine> {
    await this.findOne(tontineId, userId); // vérifie l'accès

    const membre = this.membreRepository.create({
      tontineId,
      userId: dto.userId,
      ordrePassage: dto.ordrePassage,
    });
    await this.membreRepository.save(membre);

    return this.findOne(tontineId, userId);
  }

  async tourSuivant(id: number, userId: number): Promise<Tontine> {
    const tontine = await this.findOne(id, userId);
    tontine.tourActuel += 1;
    return this.tontineRepository.save(tontine);
  }

  async remove(id: number, userId: number): Promise<void> {
    const tontine = await this.findOne(id, userId);
    await this.tontineRepository.remove(tontine);
  }
}