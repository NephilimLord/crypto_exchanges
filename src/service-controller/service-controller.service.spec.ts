import { Test, TestingModule } from '@nestjs/testing';
import { ServiceControllerService } from './service-controller.service';

describe('ServiceControllerService', () => {
  let service: ServiceControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceControllerService],
    }).compile();

    service = module.get<ServiceControllerService>(ServiceControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
