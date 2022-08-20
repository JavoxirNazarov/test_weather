import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { weatherSaga } from './weather/sagas';
import { weatherReducer } from './weather/slice';

// didn't create combining reducers and saga files because we have only one)
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: weatherReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(weatherSaga);

export type RootState = ReturnType<typeof store.getState>;
