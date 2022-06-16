import mockAxios from 'jest-mock-axios';

import {
  fetchRestaurants,
  fetchRestaurantById,
  authorize,
} from './api';

import RESTAURANTS from '../../../fixtures/restaurants';
import RESTAURANT_DETAIL from '../../../fixtures/restaurantDetail';

jest.mock('axios');

describe('api', () => {
  const mockFetch = (data) => mockAxios.get.mockResolvedValue({ data });
  const mockLogin = (data) => mockAxios.post.mockResolvedValue({ data, status: 201 });

  describe('fetchRestaurants', () => {
    beforeEach(() => {
      mockFetch(RESTAURANTS);
    });

    it('returns restaurants', async () => {
      const restaurants = await fetchRestaurants({
        regionName: '서울',
        categoryId: 1,
      });

      expect(restaurants).toEqual(RESTAURANTS);
    });
  });

  describe('fetchRestaurantById', () => {
    beforeEach(() => {
      mockFetch(RESTAURANT_DETAIL);
    });

    it('returns restaurantDetail', async () => {
      const restaurantDetail = await fetchRestaurantById(1);

      expect(restaurantDetail).toEqual(RESTAURANT_DETAIL);
    });
  });

  describe('login', () => {
    beforeEach(() => {
      mockLogin({
        accessToken: 'accessToken',
      });
    });

    it('returns accessToken', async () => {
      const response = await authorize('tester@example.com', 'test');

      expect(response.accessToken).toEqual('accessToken');
    });
  });
});
