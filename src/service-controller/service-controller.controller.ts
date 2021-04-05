import {
  Controller,
  Query,
  Get,
} from '@nestjs/common';

import { ServiceControllerService } from './service-controller.service';
import { IGetCurrentExchanges } from './validations';

@Controller('service')
export class ServiceControllerController {
  constructor(
    private readonly serviceControllerService: ServiceControllerService,
  ) {}

  // [GET] /service/price
  @Get('price')
  async getCurrentExchanges(
    @Query() { fsyms, tsyms }: IGetCurrentExchanges,
  ): Promise<any> {
    const apiExchangeResponse = await this.serviceControllerService.getCurrExchange(fsyms, tsyms);
    return apiExchangeResponse.body;
  }
}
