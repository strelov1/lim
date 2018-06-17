import * as React from 'react';
import { GetLessonQuery } from './__generated__/types';
import { GetLesson as QUERY } from './queries';
import { Query } from 'react-apollo';
import { Preloader } from './Preloader';
import { Player } from './Player';

class LessonQuery extends Query<GetLessonQuery> {}

export interface Phrase {
  __typename: "Phrase",
  id: string,
  startTime: number | null,
  stopTime: number | null,
  originalText: string | null,
  translateText: string | null,
}

interface LessonProps {
  lessonId : string
}

interface LessonState {
  currentPhrase : Phrase
}

class Lesson extends React.Component<LessonProps, LessonState> {
  
  constructor(props : LessonProps) {
    super(props);
    this.state = {
        currentPhrase : null,
    }
  }

  onPickedPhrase = (phrase : Phrase) => {
    this.setState({ currentPhrase : phrase });
    console.log("onPickedPhrase", phrase);
  }

  onStopPhrase = (phrase : Phrase) => {
    this.setState({ currentPhrase : null });
    console.log("onStopPhrase", phrase);
  }

  render() {

    return (
      <LessonQuery query={QUERY} variables={{ id : this.props.lessonId }}>
        {({ loading, data, error }) => {
          if (loading) return <div><Preloader/></div>;
          if (error) return <h1>ERROR</h1>;
          if (!data) return <div>no data</div>;

          console.log(data);

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
                { 
                  data.lesson.phrases.map((phrase, key) => { return phrase ? 
                      <tr key={key} onClick={() => this.onPickedPhrase(phrase)}>
                        <td>{phrase.originalText}</td>
                        <td>{phrase.translateText}</td>
                        <td>{phrase.startTime}</td>
                        <td>{phrase.stopTime}</td>
                      </tr>
                    : null })
                }
              </tbody>
            </table>

            <hr/>
            <Player 
              src={process.env.PUBLIC_URL + '/test_data/0002/0.wav'} 
              onStopPhrase={this.onStopPhrase}
              phrase={this.state.currentPhrase}
            />

          </div>
          );
        }}
      </LessonQuery>
    );
  }
}

export default Lesson;
