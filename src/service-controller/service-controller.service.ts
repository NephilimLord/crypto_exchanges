import { Injectable } from '@nestjs/common';
import * as config from 'config';

import { getThirdPartyExchange } from '../utils/api';

@Injectable()
export class ServiceControllerService {
  constructor() {
  }

  async getCurrExchange(fsyms: string, tsyms: string): Promise<any> {
    return getThirdPartyExchange(fsyms, tsyms);
  }
}
