import fs from 'fs';
import genDiff from '../src';

test('yaml simple inline', () => {
  const path1 = '__tests__/__fixtures__/yaml/simpleBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/simpleAfter.yml';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimpleInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('yaml simple plain', () => {
  const path1 = '__tests__/__fixtures__/yaml/simpleBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/simpleAfter.yml';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimplePlain.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('yaml simple JSON', () => {
  const path1 = '__tests__/__fixtures__/yaml/simpleBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/simpleAfter.yml';
  const result = genDiff(path1, path2, 'json');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimpleJSON.json', 'utf-8');

  expect(result).toBe(expected);
});


test('yaml nested inline', () => {
  const path1 = '__tests__/__fixtures__/yaml/recursiveBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/recursiveAfter.yml';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('yaml nested plain', () => {
  const path1 = '__tests__/__fixtures__/yaml/recursiveBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/recursiveAfter.yml';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedPlain.txt', 'utf-8');

  expect(result).toBe(expected);
});
