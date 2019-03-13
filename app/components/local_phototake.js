import React, { Component } from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import CountDown from '../components/layout/countdown';
import Sound from 'react-sound';

const COUNT_DOWN_SECONDS = 5;
const MAX_PHOTOS_CAPTURED = 4;
const COUNT_DOWN_RESTART_AFTER = 5*1000;

//import './take.scss';

export default class PhotoTake extends Component {
   constructor (props) {
    super(props);
    this.state = {
      isWebcamActive: true,
      smile:false,
      show_flash:false,
      first_entrance:true,      
    };
  }
  static propTypes = {
    onLastPhotoCaptured:PropTypes.func.isRequired,
    onPhotoCaptured:PropTypes.func.isRequired,
  }
  componentDidMount() {
    console.log("DID MOUNT BEFORE 1000")
    setTimeout(()=>{this.refs.countdown.setactive();},3*1000)
    console.log("DID MOUNT AFTER 1000")
  }
  componentWillReceiveProps (props) {
    console.log("Component Will Recevei Props : ",props);
    setTimeout(
      ()=>{
        this.setState({
          isWebcamActive: false,
          show_flash:false,
          smile:false,
          first_entrance:false
        });
      },2000
    )

    const { shouldStopCapture } = props.photo;

    setTimeout(() => {
      if (shouldStopCapture) {
        this.context.history.pushState(null, '/photos/format-chooser');
        return;
      }
      this.goon()
    }, COUNT_DOWN_RESTART_AFTER);
  }
  goon(){
    console.log("Reset From Start")
    this.setState({smile:false,show_flash:false,isWebcamActive:true})
    setTimeout(
      ()=>{
        this.refs.countdown.reset() 
      },1000
    )    
  }  
  handleOnCountDownFinish () {
    const { photos } = this.props.photo;
    this.setState({smile:true});
    console.log("COUNT DOWN FINSIH")
    setTimeout(
      () => {
        console.log("Get Photo")
        if (photos.length + 1 === MAX_PHOTOS_CAPTURED) {
          this.props.onLastPhotoCaptured(this.refs.webcam.getScreenshot())
          return;
        }
        this.props.onPhotoCaptured(this.refs.webcam.getScreenshot())        
      },1000
    )
    setTimeout(
      ()=> {
        console.log("Flash ");
        this.setState({show_flash:true})
      },1100
    )
  }

  render () {
    console.log("Render Render Render Render Render Render Render Render ")
    const { photos } = this.props.photo;
    const lastPhoto = photos[photos.length - 1];

    let webcamClassName;
    let myname;
    let imageClsssName;
    var text = "Ok! Get Ready ...";
    imageClsssName = "display-none";
    myname = "photos-webcam "
    webcamClassName = "webcam"
    if(this.state.smile)
    {
      text = "SMILE!"
    }

    if(this.state.first_entrance){
      myname = myname + "camera-enter ";
    }else if(this.state.isWebcamActive)
    {
      myname = myname +"camera-show "
    }
    console.log(this.state)
    if(this.state.show_flash)
    {
      myname = myname + "display-none "
      webcamClassName = "opacity_zero ";
      return (
          <div>
            <h1> Flash </h1>
            
            <Sound          
              url="https://www.soundjay.com/mechanical/camera-shutter-click-01.wav"
              playStatus={Sound.status.PLAYING}
              playFromPosition={0 /* in milliseconds */}
            />
            <div className={myname}>
              <CountDown
                seconds={ COUNT_DOWN_SECONDS }
                onCountDownFinish={ ::this.handleOnCountDownFinish }
                ref="countdown" />
            </div>
            <Webcam ref="webcam" audio={ false } className={ webcamClassName } style={{zIndex:-1}}/>
          </div>

      )

    }
    if (!this.state.isWebcamActive) {
      myname = myname + "display-none "
      webcamClassName = 'display-none '; 
      imageClsssName = "display_show "
      text ="Nice!";
    }    
    console.log(myname)
    console.log(imageClsssName)
    console.log(text)
    console.log("End End End ========== ========")
    return (        
        <div className="photo-take">
          <div className={myname}>
            <CountDown
              seconds={ COUNT_DOWN_SECONDS }
              onCountDownFinish={ ::this.handleOnCountDownFinish }
              ref="countdown" />
            <div style={{position:"absolute",top:"50%",color:"red",width:"100%",textAlign:"center"}}>
              <h1>{text} Camera </h1>
            </div>
            <div style = {{width:"300",height:"400",backgroundColor:"coral"}}>
              <Webcam ref="webcam" audio={ false } className={ webcamClassName } style={{zIndex:-1}}/>
            </div>

            <div className="photo-list">
              <ul>
                {
                  photos.map((photo, index) =>
                    <li key={index}>
                    <img src={ photo }  />
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className={imageClsssName}>
            <div style = {{width:"300",height:"400",backgroundColor:"coral"}}>
              <img src={ lastPhoto } className="photo-last-img" style={{zIndex:-1}} />
            </div>
            <div style={{position:"absolute",top:"50%",color:"red",width:"100%",textAlign:"center"}}>
              <h1>{text}</h1>
            </div>
          </div>
        </div>
    );
  }
}
