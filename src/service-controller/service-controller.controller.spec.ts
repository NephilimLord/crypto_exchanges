import { Test, TestingModule } from '@nestjs/testing';
import { ServiceControllerController } from './service-controller.controller';

describe('ServiceControllerController', () => {
  let controller: ServiceControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceControllerController],
    }).compile();

    controller = module.get<ServiceControllerController>(ServiceControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
