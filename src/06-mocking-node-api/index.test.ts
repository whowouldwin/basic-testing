import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const timeout = 1000;
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, timeout);
    expect(timeoutSpy).toHaveBeenCalledWith(mockCallback, timeout);
    timeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(mockCallback, timeout);

    jest.advanceTimersByTime(timeout - 1);
    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const interval = 1000;
    const intervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockCallback, interval);
    expect(intervalSpy).toHaveBeenCalledWith(mockCallback, interval);
    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const interval = 1000;
    doStuffByInterval(mockCallback, interval);
    jest.advanceTimersByTime(interval * 3);
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    (join as jest.Mock).mockReturnValue(`/mocked/path/${pathToFile}`);
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(fileContent));
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe(fileContent);
  });
});
