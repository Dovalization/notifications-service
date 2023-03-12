import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { makeNotification } from '@test/factories/NotificationFactory';
import { UnreadNotificationUseCase } from './UnreadNotificationUseCase';

describe('Unread notification', () => {
  it('should be able to unread the notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotificationUseCase.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
