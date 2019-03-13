import { handleActions } from 'redux-actions';
import actions from '../actions/api_host';

export default handleActions({
  [actions.UpdateApi]: (state, action) => {
    return { ...state, ...action.payload };
  },
}, {});
