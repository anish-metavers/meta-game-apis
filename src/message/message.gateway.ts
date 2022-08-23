import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway({
    namespace: 'message',
    cors: {
        origin: '*',
    },
})
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private readonly messageService: MessageService) {}

    @WebSocketServer() server: any;

    handleConnection(client: any, ...args: any[]) {
        console.log('Client Connected');
    }
    handleDisconnect(client: any) {
        // console.log('Client', client);
        console.log('Client Disconnected');
    }

    @SubscribeMessage('createMessage')
    create(@MessageBody() createMessageDto: CreateMessageDto) {
        this.messageService.create(createMessageDto, this.server);
    }

    @SubscribeMessage('findAllMessage')
    findAll() {
        return this.messageService.findAll();
    }

    @SubscribeMessage('findOneMessage')
    findOne(@MessageBody() id: number) {
        return this.messageService.findOne(id);
    }

    @SubscribeMessage('updateMessage')
    update(@MessageBody() updateMessageDto: UpdateMessageDto) {
        return this.messageService.update(
            updateMessageDto.id,
            updateMessageDto,
        );
    }

    @SubscribeMessage('removeMessage')
    remove(@MessageBody() id: number) {
        return this.messageService.remove(id);
    }
}
