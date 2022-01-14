import { get, equal, reviewsTo10 } from './utils';

test('get', () => {
  const state = {
    name: '홍길동',
  };

  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('홍길동');
  expect(g(state)).toBeUndefined();
});

test('equal', () => {
  const state = {
    name: '홍길동',
  };

  const f = equal('name', '홍길동');
  const g = equal('name', '임꺽정');

  expect(f(state)).toBeTruthy();
  expect(g(state)).toBeFalsy();
});

test('reviewsTo10', () => {
  const state = [{ id: 1 }, { id: 2 }, { id: 3 }]

  expect(reviewsTo10(state)).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }])
})
