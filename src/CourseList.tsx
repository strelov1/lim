import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

import { Query, Mutation } from 'react-apollo';
import { GetCoursesQuery, DeleteCourseMutation } from './__generated__/types';
import { GetCourses as QUERY, DeleteCourse as MUTATION } from './queries';

import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

import { Preloader } from './Preloader';

class CourseMutation extends Mutation<DeleteCourseMutation> {}

class CoursesQuery extends Query<GetCoursesQuery> {}

interface CoursesRouterProps {}

interface CoursesProps extends RouteComponentProps<CoursesRouterProps> {}

export class CourseList extends React.Component<CoursesProps> {

  handlePickedCourse = (courseId : string) : void => {
    this.props.history.push('/course/' + courseId);
  }
  
  handleAddCourse = () : void => {
    this.props.history.push('/create/course');
  }

  handleEditourse = (courseId : string) : void => {
    this.props.history.push('/edit/course/' + courseId);
  }

  render() {
    return (
      <div className="pt-dark center">
        <Button icon="add" intent={Intent.SUCCESS} onClick={this.handleAddCourse}>Add</Button>
        <hr/>
        <CoursesQuery query={QUERY}>
          {({ loading, data, error, refetch }) => {
            if (loading) return <div><Preloader/></div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div>no data</div>;
            if (!data.courses) return <div>no data</div>;
          
            return (
              <div>
                {
                  data.courses.map((course, key) => { return course ? 
                    <div key={key}>
                      <Card interactive={true} elevation={Elevation.TWO}>
                        <h5 onClick={() => this.handlePickedCourse(course.id)}>{course.name}</h5>
                        <p>{ course.description }</p>
                        <CourseMutation mutation={ MUTATION }
                         refetchQueries={[{ query: QUERY }]}
                        >
                          {(deleteCourse, {}) => (
                            <div>
                              <div className="pt-button-group pt-minimal">
                                <Button
                                  icon="edit" intent={Intent.PRIMARY} 
                                  onClick={() => this.handleEditourse(course.id)}>
                                  Edit
                                </Button>
                                <Button
                                  icon="trash" intent={Intent.DANGER} 
                                  onClick={() => deleteCourse({ variables: { id : course.id } }).then(refetch)}>
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </CourseMutation>
                      </Card>
                      <br/>
                    </div>
                    : null })
                }
              </div>
            );
          }}
        </CoursesQuery>
      </div>
    );
  }
}
