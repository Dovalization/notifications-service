import { SendNotificationUseCase } from './SendNotificationUseCase';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemoryNotificationsRepository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: "You've got a new message",
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
