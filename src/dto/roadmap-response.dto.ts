import { ApiProperty } from '@nestjs/swagger';

export class RoadmapResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier for the roadmap entry.',
    })
    id: number;

    @ApiProperty({
        example: 'Q1 2025',
        description: 'Which quarter the roadmap item belongs to.',
    })
    quarter: string;

    @ApiProperty({
        example: 'Launch PRISMAI Integration',
        description: 'Short description of the roadmap goal.',
    })
    goal: string;

    @ApiProperty({
        example: 50,
        description: 'Percent completion of the roadmap item.',
        default: 0,
        minimum: 0,
        maximum: 100,
    })
    complete: number;
}
