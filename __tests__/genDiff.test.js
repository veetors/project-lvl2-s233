import fs from 'fs';
import genDiff from '../src';

test('genDiff', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(result).toBe(expected);
});
