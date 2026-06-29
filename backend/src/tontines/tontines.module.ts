import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TontinesService } from './tontines.service';
import { TontinesController } from './tontines.controller';
import { Tontine } from './entities/tontine.entity';
import { TontineMembre } from './entities/tontine-membre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tontine, TontineMembre])],
  controllers: [TontinesController],
  providers: [TontinesService],
})
export class TontinesModule {}