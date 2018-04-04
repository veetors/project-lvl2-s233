import fs from 'fs';
import genDiff from '../src';

test('simple json', () => {
  const path1 = '__tests__/__fixtures__/json/simpleBefore.json';
  const path2 = '__tests__/__fixtures__/json/simpleAfter.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/simpleDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('simple yaml', () => {
  const path1 = '__tests__/__fixtures__/yaml/simpleBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/simpleAfter.yml';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/simpleDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('simple ini', () => {
  const path1 = '__tests__/__fixtures__/ini/simpleBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/simpleAfter.ini';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/simpleDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('recursive json', () => {
  const path1 = '__tests__/__fixtures__/json/recursiveBefore.json';
  const path2 = '__tests__/__fixtures__/json/recursiveAfter.json';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/recursiveDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('recursive yaml', () => {
  const path1 = '__tests__/__fixtures__/yaml/recursiveBefore.yml';
  const path2 = '__tests__/__fixtures__/yaml/recursiveAfter.yml';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/recursiveDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});

test('recursive ini', () => {
  const path1 = '__tests__/__fixtures__/ini/recursiveBefore.ini';
  const path2 = '__tests__/__fixtures__/ini/recursiveAfter.ini';
  const result = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/recursiveDiff.txt', 'utf-8');

  expect(result).toBe(expected);
});
