import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { makeNotification } from '@test/factories/NotificationFactory';
import { ReadNotificationUseCase } from './ReadNotificationUseCase';

describe('Read notification', () => {
  it('should be able to read the notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotificationUseCase.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
