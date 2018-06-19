import * as React from 'react';
import { GetLessonQuery } from './__generated__/types';
import { GetLesson as QUERY } from './queries';
import { Query } from 'react-apollo';
import { Preloader } from './Preloader';
import { Player } from './Player';
import { TextInput } from './TextInput';
import { RouteComponentProps } from "react-router-dom";

class LessonQuery extends Query<GetLessonQuery> {}

export interface Phrase {
  __typename: "Phrase"
  id: string
  startTime: number | null
  stopTime: number | null
  originalText: string | null
  translateText: string | null
}

interface LessonRouterProps {
  lessonId : string
}

interface LessonProps extends RouteComponentProps<LessonRouterProps> {}

interface LessonState {
  currentPhrase : Phrase
  inputValue : string
  indexPhrase : number
}

export class Lesson extends React.Component<LessonProps, LessonState> {
  
  phrases : Phrase[]

  constructor(props : LessonProps) {
    super(props);
    this.state = {
        currentPhrase : null,
        inputValue : "",
        indexPhrase : 0
    }
  }

  onPickedPhrase = (key : number, phrase : Phrase) => {
    this.setState({
       indexPhrase : key,
       currentPhrase : phrase,
       inputValue : phrase.originalText
    });
    console.log("onPickedPhrase", phrase);
  }

  onStopPhrase = (phrase : Phrase) => {
    this.setState({ currentPhrase : null });
    console.log("onStopPhrase", phrase);
  }

  onGuessed = () => {
    console.log('GUESSED');
    this.setState({
      inputValue : null
   }, () => {
    this.nextPhrase();
   });
  }

  nextPhrase = () => {
    const nextIndex = this.state.indexPhrase + 1;
    if (this.phrases[nextIndex]) {
      this.onPickedPhrase(nextIndex, this.phrases[nextIndex])
    }
  }

  previousPhrase = () => {
    const previousIndex = this.state.indexPhrase - 1;
    if (this.phrases[previousIndex]) {
      this.onPickedPhrase(previousIndex, this.phrases[previousIndex])
    }
  }

  phraseList(phrases : Phrase[]) {
    
    // save phrases
    this.phrases = phrases;
    
    return phrases.map((phrase, key) => {
      return (
        <tr key={key} onClick={() => this.onPickedPhrase(key, phrase)}>
          <td>{phrase.originalText}</td>
          <td>{phrase.translateText}</td>
          <td>{phrase.startTime}</td>
          <td>{phrase.stopTime}</td>
        </tr>
      );
    });
  }

  render() {

    return (
      <LessonQuery query={QUERY} variables={{ id : this.props.match.params.lessonId }}>
        { ({ loading, data, error }) => {
          if (loading) return <div><Preloader/></div>;
          if (error) return <h1>ERROR</h1>;
          if (!data) return <div>no data</div>;
          
          return (
            <div className="pt-dark center">
              <table className="pt-html-table pt-interactive">
                <thead>
                  <tr>
                    <th>Phrase</th>
                    <th>Translate</th>
                    <th>startTime</th>
                    <th>stopTime</th>
                  </tr>
                </thead>
                <tbody>
                  { this.phraseList(data.lesson.phrases) }
                </tbody>
              </table>

              <hr/>

              <Player 
                src={process.env.PUBLIC_URL + '/test_data/0002/0.wav'} 
                onStopPhrase={this.onStopPhrase}
                phrase={this.state.currentPhrase}
              />

              <hr/>

              { this.state.inputValue ? 
                <TextInput
                  checkValue={this.state.inputValue}
                  onGuessed={this.onGuessed}
                /> 
              : "" }
          
          </div>
          );
        }}
      </LessonQuery>
    );
  }
}