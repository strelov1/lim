import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Mutation, Query } from 'react-apollo';
import { UpdateCourseMutation, GetCourseQuery } from './__generated__/types';
import { updateCourse as MUTATION, getCourse as QUERY } from './queries';

import { Button, FormGroup, TextArea, Intent, Card, Elevation } from '@blueprintjs/core';

import { preloader as Preloader } from './Preloader';

class CourseQuery extends Query<GetCourseQuery> {}

class EditCourseMutation extends Mutation<UpdateCourseMutation> {}

interface EditCourseRouterProps {
  courseId : string;
}

interface EditCourseProps extends RouteComponentProps<EditCourseRouterProps> {}

interface EditCoursState {
  name : string;
  description : string;
}

export class EditCourse extends React.Component<EditCourseProps, EditCoursState> {

  constructor(props : EditCourseProps) {
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

        <CourseQuery query={QUERY} variables={{ id : this.props.match.params.courseId }}>
          {({ loading, data, error }) => {
            if (loading) return <div><Preloader/></div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div>no data</div>;
            if (!data.course) return <div>no data</div>;

            return (
              <div className="pt-dark center">
               <Card interactive={true} elevation={Elevation.FOUR}>
                  <EditCourseMutation mutation={MUTATION}>
                    {(saveCourse, {}) => (
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
                            defaultValue={data.course.name}
                          />
                        </FormGroup>
                        <FormGroup
                          label="Course description"
                          labelFor="course-description"
                        >
                          <TextArea
                              className="pt-fill"
                              onChange={this.onChangeDescription}
                              defaultValue={data.course.description}
                          />
                        </FormGroup>
                          <br/>
                          <Button
                            icon="saved"
                            intent={Intent.SUCCESS}
                            onClick={() => {
                              saveCourse({ variables: {
                                id: this.props.match.params.courseId,
                                name: this.state.name ? this.state.name : data.course.name,
                                description: this.state.description ?
                                  this.state.description :
                                  data.course.description,
                              } }).then(this.goBack);
                            }}
                          >
                            Save
                          </Button>
                      </div>
                    )}
                   </EditCourseMutation>
                  </Card>
              </div>
            );
          }}
        </CourseQuery>

        </div>
      </div>
    );
  }
}
