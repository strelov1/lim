import * as React from 'react';
import { GetCourseQuery } from './__generated__/types';
import { GetCourse as QUERY } from './queries';
import { Query } from 'react-apollo';
import { Preloader } from './Preloader';
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

class CourseQuery extends Query<GetCourseQuery> {}

interface CourseRouterProps {
  courseId : string
}

interface CourseProps extends RouteComponentProps<CourseRouterProps> {}


class Course extends React.Component<CourseProps> {

  onPickedLesson(lessonId : string) : void {
    this.props.history.push('/lesson/' + lessonId);
  }

  goBack = () : void => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="pt-dark">
        <Button
          icon="undo"
          onClick={this.goBack}
          className="pt-dark">
          Back
        </Button>
        <hr/>
        <CourseQuery query={QUERY} variables={{ id : this.props.match.params.courseId }}>
          {({ loading, data, error }) => {
            if (loading) return <div><Preloader/></div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div>no data</div>;
            if (!data.course) return <div>no data</div>;
            if (!data.course.lessons) return <div>no data</div>;
        
            console.log(data.course && data.course.lessons);

            return (
              <div className="pt-dark center">
                {
                  data.course.lessons && data.course.lessons.map((lesson, key) => { return lesson ? 
                    <div key={key}>
                      <Card interactive={true} elevation={Elevation.FOUR} onClick={() => this.onPickedLesson(lesson.id)}>
                        <h5>{lesson.id}</h5>
                        <p>Card content</p>
                      </Card>
                    </div>
                    : null })
                }
              </div>
            );
          }}
        </CourseQuery>
      </div>
    );
  }
}

export default Course;
