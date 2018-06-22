import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { CreateCourseMutation } from './__generated__/types';
import { createCourse as MUTATION, getCourses as QUERY } from './queries';

import { Button, FormGroup, TextArea, Intent } from '@blueprintjs/core';

class CourseMutation extends Mutation<CreateCourseMutation> {}

interface AddCourseRouterProps {}

interface AddCourseProps extends RouteComponentProps<AddCourseRouterProps> {}

interface AddCoursState {
  name : string;
  description : string;
}

export class AddCourse extends React.Component<AddCourseProps, AddCoursState> {

  constructor(props : AddCourseProps) {
    super(props);
    this.state = {
      name : '',
      description : '',
    };
  }

  goBack = () : void => {
    this.props.history.goBack();
  }

  onChangeName = (event : React.FormEvent<HTMLInputElement>) : void => {
    this.setState({ name : event.currentTarget.value });
  }

  onChangeDescription = (event : React.FormEvent<HTMLTextAreaElement>) : void => {
    this.setState({ description : event.currentTarget.value });
  }

  render() {
    return (
      <div className="pt-dark">
        <Button
          icon="undo"
          onClick={this.goBack}
        >
          Back
        </Button>
        <hr/>
        <div>

        <CourseMutation mutation={MUTATION} refetchQueries={[{ query: QUERY }]} >
          {(addCourse, { data }) => (
            <div>
              <FormGroup
                label="Course name"
                labelFor="course-name"
                requiredLabel={true}
              >
                <input
                  className="pt-input"
                  id="course-name"
                  type="text"
                  onChange={this.onChangeName}
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup
                label="Course description"
                labelFor="course-description"
              >
                <TextArea
                    className="pt-fill"
                    onChange={this.onChangeDescription}
                    defaultValue={this.state.description}
                />
              </FormGroup>
                <Button
                  icon="add"
                  intent={Intent.SUCCESS}
                  onClick={() => {
                    addCourse({ variables: {
                      name: this.state.name,
                      description : this.state.description,
                    } })
                      .then(this.goBack);
                  }}
                >
                  Add
                </Button>
            </div>
          )}
        </CourseMutation>
        </div>
      </div>
    );
  }
}
