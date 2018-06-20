import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

import { Query } from 'react-apollo';
import { GetCoursesQuery } from './__generated__/types';
import { GetCourses as QUERY } from './queries';

import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

import { Preloader } from './Preloader';


class CoursesQuery extends Query<GetCoursesQuery> {}

interface CoursesRouterProps {}

interface CoursesProps extends RouteComponentProps<CoursesRouterProps> {}

export class CourseList extends React.Component<CoursesProps> {

  onPickedCourse = (courseId : string) : void => {
    this.props.history.push('/course/' + courseId)
  }

  render() {
    return (
      <div className="pt-dark center">
        <Button icon="add" intent={Intent.SUCCESS}>Add</Button>
        <hr/>
        <CoursesQuery query={QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <div><Preloader/></div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div>no data</div>;
            if (!data.courses) return <div>no data</div>;
          
            console.log(data);

            return (
              <div>
                {
                  data.courses.map((course, key) => { return course ? 
                    <div key={key}>
                      <Card interactive={true} elevation={Elevation.TWO} onClick={() => this.onPickedCourse(course.id)}>
                        <h5>{course.name}</h5>
                        <p>Card content</p>
                      </Card>
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
