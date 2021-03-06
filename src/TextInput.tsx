import * as React from 'react';
import { TextArea, Intent } from '@blueprintjs/core';

interface InputProps {
  checkValue: string;
  onGuessed: () => void;
}

interface InputState {
  value: string;
  checkValue : string;
  guessWords : string[];
  intnet : Intent;
}

export class TextInput extends React.Component<InputProps, InputState> {

  constructor(props : InputProps) {
    super(props);
    this.state = {
      value : '',
      checkValue : this.props.checkValue,
      guessWords : [],
      intnet : Intent.NONE,
    };
  }

  checkInput = (word : string , input : string) : boolean => {
    return word.indexOf(input) === 0;
  }

  cleanInput = (value : string) : string => {
    let checkValue = value.trim();
    for (let i = 0; i < this.state.guessWords.length; i += 1) {
      checkValue = checkValue.replace(this.state.guessWords[i], '');
    }
    return checkValue.trim();
  }

  onChange = (event : React.FormEvent<HTMLTextAreaElement>) : void => {
    const value = event.currentTarget.value;

    const words = this.state.checkValue.toLowerCase().split(' ');
    const word = words.shift();
    const checkValue = this.cleanInput(value);

    if (checkValue && this.checkInput(word, checkValue))  {
      this.state.guessWords.push(word) ;
      this.setState({
        guessWords : this.state.guessWords,
        checkValue : words.join(' '),
        value : this.state.value + word + ' ',
        intnet : Intent.NONE,
      });
    } else {
      if (words.length ===  0) {
        this.setState({
          intnet : Intent.SUCCESS,
        });
        this.props.onGuessed();
      } else {
        this.setState({ intnet : Intent.DANGER });
      }
    }
  }

  render() {
    return (
      <div className="input-box">
          <TextArea
            autoFocus={true}
            intent={this.state.intnet}
            className="pt-fill"
            onChange={this.onChange}
            value={this.state.value}
          />
      </div>
    );
  }
}
