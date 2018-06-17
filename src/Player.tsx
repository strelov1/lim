import * as React from "react";
import { Phrase } from "./Lesson";

interface PlayerProps {
  src : string
  phrase : Phrase
  onStopPhrase: (phrase : Phrase) => void;
}

interface PlayerState {
  percent : number
}

export class Player extends React.Component<PlayerProps, PlayerState> {

  audioElement : HTMLAudioElement;
  currentPhrase : Phrase;
  loop : number;

  constructor(props : PlayerProps) {
    super(props);
    this.state = {
      percent : 0,
    }
  }

  componentDidUpdate()
  {
      if (this.props.phrase && this.currentPhrase !== this.props.phrase) {
        console.log('new phrase: ', this.props.phrase);
        this.playPhrase(this.props.phrase);
        this.currentPhrase = this.props.phrase;
      }
  }

  playPhrase = (phrase : Phrase) => {
    console.log('start play: ', phrase);
    clearInterval(this.loop);
    
    const audio = this.audioElement;
    if (!phrase) return <div>not phrase</div>;
    if (!audio) return <div>no html element</div>;
    
    audio.currentTime = phrase.startTime / 1000;
    audio.play();

    this.loop = window.setInterval(() => {
      let currentTime = audio.currentTime * 1000;
      if (currentTime >= phrase.startTime && currentTime <= phrase.stopTime) {
        console.log('playing phrase: ', phrase.originalText);
      } else {
        clearInterval(this.loop);
        audio.pause();
        this.props.onStopPhrase(this.currentPhrase);
        this.currentPhrase = null;
        console.log('stop phrase: ', phrase.originalText);
      }
      
      this.setPercent(audio.duration, audio.currentTime);

    }, 300);
    return null;
  }

  setPercent = (duration : number, currentTime : number) => {
    const increment = 10 / duration;
    const percent = Math.min(increment * currentTime * 10, 100);
    this.setState({ percent });
  }
  
  render() {
    return (
        <div>
            <div className="pt-progress-bar pt-intent-success pt-no-animation progress-bar">
              <div className="pt-progress-meter" 
                  style={{ width: this.state.percent + "%"}}></div>
            </div>
            <audio
                ref={(ref) => { this.audioElement = ref; }}
                src={this.props.src}
            />
        </div>
    );
  }
}