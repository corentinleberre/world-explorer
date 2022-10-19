import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WorldExplorerController } from './application/world-explorer.controller';
import { KayakService } from './application/kayak.service';
import { WorldExplorerService } from './application/world-explorer.service';
import { GooglePlaceService } from './application/google-place.service';

@Module({
  imports: [HttpModule],
  controllers: [WorldExplorerController],
  providers: [WorldExplorerService, KayakService, GooglePlaceService],
})
export class AppModule {}
