import { Controller, Get } from '@nestjs/common';
import { RoadmapResponseDto } from '../dto/roadmap-response.dto';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
    constructor(private readonly roadmapService: RoadmapService) {}

    @Get()
    async getAllRoadmaps(): Promise<RoadmapResponseDto[]> {
        const roadmaps = await this.roadmapService.findAll();
        // Optionally map database entities to the DTO if fields differ:
        return roadmaps.map((item) => ({
            id: item.id,
            quarter: item.quarter,
            goal: item.goal,
            complete: item.complete,
        }));
    }
}
