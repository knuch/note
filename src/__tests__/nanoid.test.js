import { nanoid } from 'nanoid';

test('Nanoid should work', () => {
  expect(() => nanoid()).not.toThrow();
});
