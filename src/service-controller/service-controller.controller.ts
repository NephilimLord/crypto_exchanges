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
    let response = {};
    try {
      const apiExchangeResponse = await this.serviceControllerService.getCurrExchange(fsyms, tsyms);
      response = apiExchangeResponse.body;
    } catch (e) {
      console.log(e);
    }

    return response;
  }
}
