/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetCoursesQuery {
  courses:  Array< {
    __typename: "Course",
    id: string,
    name: string | null,
  } | null >,
};

export interface GetCourseQueryVariables {
  id?: string | null,
};

export interface GetCourseQuery {
  course:  {
    __typename: "Course",
    id: string,
    name: string | null,
    lessons:  Array< {
      __typename: "Lesson",
      id: string,
      phrases:  Array< {
        __typename: "Phrase",
        id: string,
        startTime: number | null,
        stopTime: number | null,
        originalText: string | null,
        translateText: string | null,
      } > | null,
    } > | null,
  } | null,
};

export interface GetLessonsQuery {
  lessons:  Array< {
    __typename: "Lesson",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      startTime: number | null,
      stopTime: number | null,
      originalText: string | null,
      translateText: string | null,
    } > | null,
  } | null >,
};

export interface GetPhrasesQuery {
  phrases:  Array< {
    __typename: "Phrase",
    id: string,
    startTime: number | null,
    stopTime: number | null,
    originalText: string | null,
    translateText: string | null,
  } | null >,
};

export interface GetPhraseQueryVariables {
  id?: string | null,
};

export interface GetPhraseQuery {
  phrase:  {
    __typename: "Phrase",
    id: string,
    startTime: number | null,
    stopTime: number | null,
    originalText: string | null,
    translateText: string | null,
  } | null,
};
