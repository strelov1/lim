import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

import { Mutation } from 'react-apollo';
import { CreateCourseMutation } from './__generated__/types';
import { CreateCourse as MUTATION } from './queries';

import { Button, FormGroup, Intent } from "@blueprintjs/core";

class CourseMutation extends Mutation<CreateCourseMutation> {}

interface AddCourseRouterProps {}
  
interface AddCourseProps extends RouteComponentProps<AddCourseRouterProps> {}

interface AddCoursState {
  courseName : string
}

export class AddCourse extends React.Component<AddCourseProps, AddCoursState> {

  constructor(props : AddCourseProps) {
    super(props);
    this.state = {
      courseName : ""
    }
  }

  goBack = () : void => {
    this.props.history.goBack();
  }

  onChangeName = (event : React.FormEvent<HTMLInputElement>) : void => {
    this.setState({ courseName : event.currentTarget.value });
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

        <CourseMutation mutation={MUTATION}>
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
                  onChange={ this.onChangeName }
                  value={ this.state.courseName }
                />
                <br/>
                <br/>
                <Button
                  icon="add"
                  intent={Intent.SUCCESS}
                  onClick={() => {
                    addCourse({ variables: { name: this.state.courseName } })
                      .then(this.goBack);
                  }}
                >
                  Add
                </Button>
              </FormGroup>
            </div>
          )}
        </CourseMutation>
        </div>
      </div>
    );
  }
}