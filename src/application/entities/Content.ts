export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 255;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length must be between 5 and 255 characters');
    }

    this.content = content;
  }
}
