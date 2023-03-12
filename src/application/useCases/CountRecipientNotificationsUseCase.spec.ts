import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';
import { makeNotification } from '@test/factories/NotificationFactory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
