import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/commonState';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
