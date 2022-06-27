import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from '../../pages/Restaurant/RestaurantDetail';
import ReviewForm from '../../ReviewForm';
import Reviews from '../../Reviews';

import { loadRestaurant, changeReviewField, sendReview } from '../../actions';

import { get } from '../../utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const accessToken = useSelector(get('accessToken'));
  const restaurant = useSelector(get('restaurant'));
  const reviewFields = useSelector(get('reviewFields'));

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  function handleChange({ name, value }) {
    dispatch(changeReviewField({ name, value }));
  }

  function handleSubmit() {
    dispatch(sendReview({ restaurantId }));

    dispatch(changeReviewField({ name: 'score', value: '' }));
    dispatch(changeReviewField({ name: 'description', value: '' }));
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {accessToken && (
        <ReviewForm
          fields={reviewFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      <Reviews reviews={restaurant.reviews} />
    </>
  );
}
