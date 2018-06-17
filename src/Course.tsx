import * as React from 'react';
import { GetCourseQuery } from './__generated__/types';
import { GetCourse as QUERY } from './queries';
import { Query } from 'react-apollo';
import { Preloader } from './Preloader';

class CourseQuery extends Query<GetCourseQuery> {}

interface CourseProps {
  courseId : string
}

class Course extends React.Component<CourseProps> {

  render() {
    return (
      <CourseQuery query={QUERY} variables={{ id : this.props.courseId }}>
        {({ loading, data, error }) => {
          if (loading) return <div><Preloader/></div>;
          if (error) return <h1>ERROR</h1>;
          if (!data) return <div>no data</div>;
          if (!data.course) return <div>no data</div>;
          if (!data.course.lessons) return <div>no data</div>;
      
          console.log(data.course && data.course.lessons);

          return (
            <div className="pt-dark center">
            <table className="pt-html-table pt-interactive">
              <thead>
                <tr>
                  <th>Lesson</th>
                  <th>Progrss</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.course.lessons && data.course.lessons.map((lesson, key) => { return lesson ? 
                      <tr key={key}>
                        <td>{lesson.id}</td>
                        <td>10%</td>
                      </tr>
                    : null })
                }
              </tbody>
            </table>
          </div>
          );
        }}
      </CourseQuery>
    );
  }
}

export default Course;
