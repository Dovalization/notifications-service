import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
