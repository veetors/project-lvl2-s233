import fs from 'fs';
import genDiff from '../src';

test('json', () => {
  const path1 = '__tests__/__fixtures__/json/before.json';
  const path2 = '__tests__/__fixtures__/json/after.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('yaml', () => {
  const path1 = '__tests__/__fixtures__/yaml/before.yml';
  const path2 = '__tests__/__fixtures__/yaml/after.yml';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diff.txt', 'utf-8');

  expect(result).toBe(expected);
});
