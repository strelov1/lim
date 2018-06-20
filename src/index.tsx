import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { CourseList } from './CourseList';
import { Lesson } from './Lesson';
import { Course } from './Course';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const httpLink = createHttpLink({
  uri: 'http://localhost:4466',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={CourseList} />
        <Route path="/course/:courseId" component={Course} />
        <Route path="/lesson/:lessonId" component={Lesson} />
      </div>
    </Router>
  </ApolloProvider>
);

render(WrappedApp, document.getElementById('root'));