import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { CourseList } from './CourseList';
import { Lesson } from './Lesson';
import { Course } from './Course';
import { AddCourse } from './AddCourse';
import { EditCourse } from './EditCourse';

import registerServiceWorker from './registerServiceWorker';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ?
  'https://eu1.prisma.sh/ilya-strelov-74971b/lim/dev' :
  'http://localhost:4466',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const wrappedApp = (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact={true} path="/" component={CourseList} />
        <Route path="/course/:courseId" component={Course} />
        <Route path="/create/course" component={AddCourse} />
        <Route path="/edit/course/:courseId" component={EditCourse} />
        <Route path="/lesson/:lessonId" component={Lesson} />
      </div>
    </Router>
  </ApolloProvider>
);

render(wrappedApp, document.getElementById('root'));
registerServiceWorker();
