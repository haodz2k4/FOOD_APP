import { WebSocketGateway, OnGatewayConnection, WebSocketServer, OnGatewayInit, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { Logger } from '@nestjs/common';
import { SocketOrder } from 'src/constants/socket.constant';
import { OrderStatus } from 'src/constants/app.constant';
import { OrdersService } from 'src/api/orders/orders.service';
import { ChangeStatusOrderDto } from './dto/change-status-order.dto';

@WebSocketGateway({
  cors: "*"
})
export class SocketGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Socket;
  private readonly logger = new Logger(SocketGateway.name)

  constructor(
    private readonly socketService: SocketService,
    private readonly ordersService: OrdersService
  ) {}


  handleDisconnect(client: Socket) {
    this.logger.log(`client ${client.id} disconnected`);
  }
  afterInit(server: any) {
    this.logger.log(`Socket gateway initialized`)
  }

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
    this.logger.log(`client ${socket.id} connected`)
  }
  
  @SubscribeMessage(SocketOrder.UPDATE)
  async changeStatus(
    @MessageBody() changeStatusOrderDto: ChangeStatusOrderDto,
    @ConnectedSocket() client: Socket
  ) {
    const { id, status } = changeStatusOrderDto;
    this.logger.log(changeStatusOrderDto)
    this.logger.log(id, status)
    const updatedOrder = await this.ordersService.updateStatus(id, status);

    this.server.emit(SocketOrder.UPDATE, {
      id: updatedOrder.id,
      status: updatedOrder.status,
    });
  }


  

}