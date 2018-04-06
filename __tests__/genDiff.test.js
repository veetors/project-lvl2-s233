import fs from 'fs';
import genDiff from '../src';

test('json simple inline', () => {
  const path1 = '__tests__/__fixtures__/json/simpleBefore.json';
  const path2 = '__tests__/__fixtures__/json/simpleAfter.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimpleInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('json simple plain', () => {
  const path1 = '__tests__/__fixtures__/json/simpleBefore.json';
  const path2 = '__tests__/__fixtures__/json/simpleAfter.json';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffSimplePlain.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('json nested inline', () => {
  const path1 = '__tests__/__fixtures__/json/recursiveBefore.json';
  const path2 = '__tests__/__fixtures__/json/recursiveAfter.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedInline.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('json nested plain', () => {
  const path1 = '__tests__/__fixtures__/json/recursiveBefore.json';
  const path2 = '__tests__/__fixtures__/json/recursiveAfter.json';
  const result = genDiff(path1, path2, 'plain');
  const expected = fs.readFileSync('__tests__/__fixtures__/diffNestedPlain.txt', 'utf-8');

  expect(result).toBe(expected);
});

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
