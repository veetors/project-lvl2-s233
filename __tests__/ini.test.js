import fs from 'fs';
import genDiff from '../src';

test('ini simple inline', () => {
  const path1 = '__tests__/__fixtures__/ini/simpleBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/simpleAfter.ini';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimpleInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('ini simple plain', () => {
  const path1 = '__tests__/__fixtures__/ini/simpleBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/simpleAfter.ini';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimplePlain.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('ini nested inline', () => {
  const path1 = '__tests__/__fixtures__/ini/recursiveBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/recursiveAfter.ini';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('ini nested plain', () => {
  const path1 = '__tests__/__fixtures__/ini/recursiveBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/recursiveAfter.ini';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedPlain.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('ini nested JSON', () => {
  const path1 = '__tests__/__fixtures__/ini/recursiveBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/recursiveAfter.ini';
  const result = genDiff(path1, path2, 'json');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedJSON.json', 'utf-8');

  expect(result).toBe(expected);
});
