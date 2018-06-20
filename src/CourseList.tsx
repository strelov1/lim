import * as React from 'react';
import { GetCoursesQuery } from './__generated__/types';
import { GetCourses as QUERY } from './queries';
import { Query } from 'react-apollo';
import { Preloader } from './Preloader';
import { RouteComponentProps } from "react-router-dom";

class CoursesQuery extends Query<GetCoursesQuery> {}

interface CoursesRouterProps {}

interface CoursesProps extends RouteComponentProps<CoursesRouterProps> {}

export class CourseList extends React.Component<CoursesProps> {

  onPickedCourse = (courseId : string) : void => {
    this.props.history.push('/course/' + courseId)
  }

  render() {
    return (
      <div>
        <CoursesQuery query={QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <div><Preloader/></div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div>no data</div>;
            if (!data.courses) return <div>no data</div>;
          
            console.log(data);

            return (
              <div className="pt-dark center">
                <table className="pt-html-table pt-interactive">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Description</th>
                      <th>Progrss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.courses.map((course, key) => { return course ? 
                          <tr key={key} onClick={() => this.onPickedCourse(course.id)}>
                            <td>{course.name}</td>
                            <td>Lorem Ipsum is simply dummy text of the printing.</td>
                            <td>10%</td>
                          </tr>
                        : null })
                    }
                  </tbody>
                </table>
              </div>
            );
          }}
        </CoursesQuery>
      </div>
    );
  }
}
