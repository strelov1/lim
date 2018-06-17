import gql from 'graphql-tag';

export const GetCourses = gql`
  query GetCourses {
    courses {
        id
        name
      }
  }
`;

export const GetCourse = gql`
  query GetCourse($id : ID) {
    course(where: {
      id : $id
    }) {
      id
      name
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
  }
`;

export const GetLessons = gql`
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

export const GetLesson = gql`
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

export const GetPhrases = gql`
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

export const GetPhrase = gql`
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
