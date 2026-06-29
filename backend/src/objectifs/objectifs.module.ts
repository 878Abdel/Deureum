import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectifsService } from './objectifs.service';
import { ObjectifsController } from './objectifs.controller';
import { Objectif } from './entities/objectif.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Objectif])],
  controllers: [ObjectifsController],
  providers: [ObjectifsService],
})
export class ObjectifsModule {}