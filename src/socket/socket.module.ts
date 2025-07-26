import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { OrdersModule } from 'src/api/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}
