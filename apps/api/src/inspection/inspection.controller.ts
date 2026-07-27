import { Controller } from '@nestjs/common';
import { InspectionService } from './inspection.service';

@Controller('inspections')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}
}
