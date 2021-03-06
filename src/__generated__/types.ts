/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetCoursesQuery {
  courses:  Array< {
    __typename: "Course",
    id: string,
    name: string | null,
    description: string | null,
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
    description: string | null,
    lessons:  Array< {
      __typename: "Lesson",
      id: string,
    } > | null,
  } | null,
};

export interface CreateCourseMutationVariables {
  name: string,
  description?: string | null,
};

export interface CreateCourseMutation {
  createCourse:  {
    __typename: "Course",
    id: string,
  },
};

export interface UpdateCourseMutationVariables {
  id?: string | null,
  name: string,
  description?: string | null,
};

export interface UpdateCourseMutation {
  updateCourse:  {
    __typename: "Course",
    id: string,
    name: string | null,
    description: string | null,
  } | null,
};

export interface DeleteCourseMutationVariables {
  id: string,
};

export interface DeleteCourseMutation {
  deleteCourse:  {
    __typename: "Course",
    id: string,
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

export interface GetLessonQueryVariables {
  id?: string | null,
};

export interface GetLessonQuery {
  lesson:  {
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
  } | null,
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
