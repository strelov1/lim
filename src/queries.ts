import gql from 'graphql-tag';

export const GetCourses = gql`
  query GetCourses {
    courses {
        id
        name
        description
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
      description
      lessons {
        id
      }
    }
  }
`;

export const CreateCourse = gql`
  mutation CreateCourse($name : String!, $description : String) {
    createCourse(data: {
      name : $name
      description : $description
    }) {
      id
    }
  }
`;

export const UpdateCourse = gql`
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

export const DeleteCourse = gql`
  mutation DeleteCourse($id : ID!) {
    deleteCourse(where: {
      id: $id
    }) {
      id
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