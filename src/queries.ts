import graphqlTag from 'graphql-tag';

export const getCourses = graphqlTag`
  query GetCourses {
    courses {
        id
        name
        description
      }
  }
`;

export const getCourse = graphqlTag`
  query GetCourse($id : ID) {
    course(where: {
      id : $id
    }) {
      id
      name
      description
      lessons {
        id
      }
    }
  }
`;

export const createCourse = graphqlTag`
  mutation CreateCourse($name : String!, $description : String) {
    createCourse(data: {
      name : $name
      description : $description
    }) {
      id
    }
  }
`;

export const updateCourse = graphqlTag`
  mutation UpdateCourse($id : ID, $name : String!, $description : String) {
    updateCourse(
      data: {
        name: $name
        description: $description
      }
      where: {
        id: $id
      }
    ) {
      id
      name
      description
    }
  }
`;

export const deleteCourse = graphqlTag`
  mutation DeleteCourse($id : ID!) {
    deleteCourse(where: {
      id: $id
    }) {
      id
    }
  }
`;

export const getLessons = graphqlTag`
  query GetLessons {
    lessons {
      id
      phrases {
        id
        startTime
        stopTime
        originalText
        translateText
      }
    }
  }
`;

export const getLesson = graphqlTag`
  query GetLesson($id : ID) {
    lesson(where: {
      id : $id
    }) {
      id
        phrases {
          id
          startTime
          stopTime
          originalText
          translateText
        }
    }
  }
`;

export const getPhrases = graphqlTag`
  query GetPhrases {
    phrases {
      id
      startTime
      stopTime
      originalText
      translateText
    }
  }
`;

export const getPhrase = graphqlTag`
  query GetPhrase($id : ID) {
    phrase(where: {
      id : $id
    }) {
      id
      startTime
      stopTime
      originalText
      translateText
    }
  }
`;
