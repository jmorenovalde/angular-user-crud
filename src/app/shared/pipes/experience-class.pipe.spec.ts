import { ExperienceClassPipe } from './experience-class.pipe';

describe('ExperienceClassPipe', () => {
  it('create an instance', () => {
    const pipe = new ExperienceClassPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform a undefined value, return empty string', () => {
    const pipe = new ExperienceClassPipe();
    const value = pipe.transform(undefined);
    expect(value).toBe('');
  });

  it('transform a value in the correct values, return lower case string', () => {
    const pipe = new ExperienceClassPipe();
    const value = pipe.transform('Expert');
    expect(value).toBe('expert');
  });

  it('transform a invalid value, return empty string', () => {
    const pipe = new ExperienceClassPipe();
    const value = pipe.transform('anyValue');
    expect(value).toBe('');
  });
});
