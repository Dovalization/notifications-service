import { Content } from './Content';

describe('Notification content', () => {
  it('should be able to create a notification content', async () => {
    expect(() => new Content("You've got a new message")).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', async () => {
    expect(() => new Content('1234')).toThrow();
  });

  it('should not be able to create a notification content with more than 255 characters', async () => {
    expect(() => new Content('a'.repeat(256))).toThrow();
  });
});
