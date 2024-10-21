import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockApiResponseData = {
    id: 42,
    title: 'test title',
    content: 'test content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock) = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ data: mockApiResponseData }),
    }));

    const response = await throttledGetDataFromApi('/users/42');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    expect(response).toEqual(mockApiResponseData);
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosGet = jest
      .fn()
      .mockResolvedValue({ data: mockApiResponseData });
    (axios.create as jest.Mock) = jest.fn(() => ({
      get: mockAxiosGet,
    }));

    const relativeApiPath = '/users/42';
    await throttledGetDataFromApi(relativeApiPath);
    expect(mockAxiosGet).toHaveBeenCalledWith(relativeApiPath);
  });

  test('should return response data', async () => {
    const mockAxiosGet = jest
      .fn()
      .mockResolvedValue({ data: mockApiResponseData });
    (axios.create as jest.Mock) = jest.fn(() => ({
      get: mockAxiosGet,
    }));

    const response = await throttledGetDataFromApi('/users/42');
    expect(response).toEqual(mockApiResponseData);
  });
});
