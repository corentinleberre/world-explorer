import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WorldExplorerController } from './application/world-explorer.controller';
import { KayakService } from './infrastructure/kayak.service';
import { WorldExplorerService } from './domain/world-explorer.service';
import { GooglePlaceService } from './infrastructure/google-place.service';

@Module({
  imports: [HttpModule],
  controllers: [WorldExplorerController],
  providers: [WorldExplorerService, KayakService, GooglePlaceService],
})
export class AppModule {}
