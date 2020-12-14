import React, { FC, useEffect, useMemo } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { TRIP_STATUS } from '../queries/trip';
import { setTrip, selectTripReducer } from '../slices/tripSlice';
import { selectLoginReducer } from '../slices/loginSlice';
import LoadingView from '../components/presentational/LoadingView';

const ValidateTripStatus = (Component:FC, type:string):FC => () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { trip } = useSelector(selectTripReducer);
  const { loginRole } = useSelector(selectLoginReducer);

  const { loading, data: tripStatus } = useQuery(TRIP_STATUS, {
    variables: { id: trip.id },
    fetchPolicy: 'network-only',
    skip: !trip.id,
  });

  const status = useMemo(() => (!trip.id) ? 'main' : !loading ? tripStatus.tripStatus.status : undefined, [tripStatus]);

  useEffect(() => {
    if (status && status !== type) {
      switch (status) {
        case 'main':
          if (loginRole === 'rider') {
            history.push('/rider/setcourse');
            break;
          }
          if (loginRole === 'driver') {
            history.push('/driver/main');
            break;
          }
        case 'cancel':
          dispatch(setTrip({ id: undefined }));
          if (loginRole === 'rider') {
            history.push('/rider/setcourse');
            break;
          }
          if (loginRole === 'driver') {
            history.push('/driver/main');
            break;
          }
        case 'open':
          if (loginRole === 'rider') {
            history.push('/rider/waiting');
            break;
          }
          if (loginRole === 'driver') {
            history.push('/driver/main');
            break;
          }
        case 'matched':
          history.push(`/${loginRole}/pickup`);
          break;
        case 'onBoard':
          history.push(`/${loginRole}/driving`);
          break;
        case 'close':
          history.push(`/${loginRole}/tripend`);
          break;
      }
    }
  }, [status]);

  if (loading) {
    return <LoadingView />;
  }

  return (<>{!!status && status === type && <Component />}</>);
}
;

export default ValidateTripStatus;
