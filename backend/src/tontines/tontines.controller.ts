import {
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request,
} from '@nestjs/common';
import { TontinesService } from './tontines.service';
import { CreateTontineDto } from './dto/create-tontine.dto';
import { AjouterMembreDto } from './dto/ajouter-membre.dto';

@Controller('tontines')
export class TontinesController {
  constructor(private readonly tontinesService: TontinesService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateTontineDto) {
    return this.tontinesService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tontinesService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.tontinesService.findOne(id, req.user.id);
  }

  @Post(':id/membres')
  ajouterMembre(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AjouterMembreDto,
  ) {
    return this.tontinesService.ajouterMembre(id, req.user.id, dto);
  }

  @Patch(':id/tour-suivant')
  tourSuivant(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.tontinesService.tourSuivant(id, req.user.id);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.tontinesService.remove(id, req.user.id);
  }
}