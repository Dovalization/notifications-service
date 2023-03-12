import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/useCases/SendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotificationUseCase } from '@application/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@application/useCases/ReadNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/UnreadNotificationUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
