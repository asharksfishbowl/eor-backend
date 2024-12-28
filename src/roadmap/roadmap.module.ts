import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadmapService } from './roadmap.service';
import { RoadmapController } from './roadmap.controller';
import { Roadmap } from '../entities/roadmap.entity'; // or wherever your entity is defined

@Module({
  imports: [TypeOrmModule.forFeature([Roadmap])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
})
export class RoadmapModule {}
