import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChangeStatusOrderDto } from './dto/change-status-order.dto';
import { OrdersService } from 'src/api/orders/orders.service';

@Injectable()
export class SocketService {

    private readonly connectedClients: Map<string, Socket> = new Map();
    constructor(private ordersService: OrdersService) {}
    handleConnection(socket: Socket): void {
        const clientId = socket.id;
        this.connectedClients.set(clientId, socket);

        socket.on('disconnect', () => {
            this.connectedClients.delete(clientId)
        })
    }

    changeStatus(changeStatusOrderDto: ChangeStatusOrderDto) {

    }
}
