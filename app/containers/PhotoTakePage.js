import photo_actions from '../actions/photo';
import { connect } from 'react-redux';
import PhotoTake from '../components/PhotoTake'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
function mapStateToProps (state) {
  return {
  	state,
    photo: state.photo,
  };
}
const mapDispatchToProps = (dispatch) => {
	console.log("mapDispatchToProps");
  const user = bindActionCreators(photo_actions, dispatch);
  return {
    onLastPhotoCaptured: (data) => {
      user.lastPhotoCaptured(data);
    },
    onPhotoCaptured: (data) => {
      console.log("Camera Data")
      user.photoCaptured(data);
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PhotoTake);