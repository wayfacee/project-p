import { classNames } from "./classNames";

describe('classNames', () => {
  test('test with only first param', () => {
    expect(classNames('true')).toBe('true');
  });

  test('test with mods', () => {
    const expected = 'true cl2 hovered';
    expect(classNames('true', { hovered: true }, ['cl2'])).toBe(expected);
  });

  test('test', () => {
    const expected = 'true class1'
    expect(classNames('true', {}, ['class1'])).toBe(expected);
  });

  test('test with mods false', () => {
    const expected = 'true cl2';
    expect(classNames('true', { hovered: false }, ['cl2'])).toBe(expected);
  });

  test('test with mods undefined', () => {
    const expected = 'true cl2';
    expect(classNames('true', { hovered: undefined }, ['cl2'])).toBe(expected);
  });
});