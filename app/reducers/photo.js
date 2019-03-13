import { handleActions } from 'redux-actions';
import actions from '../actions/photo';

const INITIAL_STATE = {
  photos: [],
  shouldStopCapture: false,
  MAX_PHOTOS_CAPTURED:4,
  number_of_remain:4
};

export default handleActions({
  [actions.photoCaptured]: (state, action) => {
    // return { ...state, shouldStopCapture:false}
        let my_photos = state.photos
    console.log("==== PHOTO CAPUTRED====")

    if(my_photos.length >= state.MAX_PHOTOS_CAPTURED)
    {
      my_photos = my_photos.slice(my_photos.length-state.MAX_PHOTOS_CAPTURED+1)
    }
    return { ...state, photos:my_photos.concat([action.payload]),
      shouldStopCapture:false,
    };
  },
  [actions.lastPhotoCaptured]:(state,action)=>{
    console.log("===L:AST PHOTO CAPUTRED==")
    return {
      ...state,
      photos:state.photos.concat([action.payload]),
      shouldStopCapture:false
    };
  },
  [actions.SavePrintableImage]:(state,action)=>{
    return {
      ...state,
      PrintablePhoto:action.payload
    };
  }
}, INITIAL_STATE);

