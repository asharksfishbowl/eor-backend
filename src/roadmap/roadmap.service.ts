import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roadmap } from '../entities/roadmap.entity';

@Injectable()
export class RoadmapService {
    constructor(
        @InjectRepository(Roadmap)
        private readonly roadmapRepository: Repository<Roadmap>,
    ) {}

    findAll(): Promise<Roadmap[]> {
        return this.roadmapRepository.find();
    }
}
