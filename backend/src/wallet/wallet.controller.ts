import { Controller, Get, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('moi')
  getMoi(@Request() req: any) {
    return this.walletService.getMoi(req.user.id);
  }
}