import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', async () => {
    expect(
      () =>
        new Notification({
          content: new Content("You've got a new message"),
          category: 'social',
          recipientId: 'example-recipient-id',
        }),
    ).toBeTruthy();
  });
});
