import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { InMemoryNotificationsRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';
import { makeNotification } from '@test/factories/NotificationFactory';
import { GetRecipientNotificationsUseCase } from './GetRecipientNotificationsUseCase';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
