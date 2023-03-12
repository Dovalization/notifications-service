import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { makeNotification } from '@test/factories/NotificationFactory';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotificationUseCase.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
