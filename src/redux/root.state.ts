import Course from "../types/course.type";
import Author from "../types/author.type";
import { ApplicationError } from "../types/application.error.type";

export interface RootState {
  readonly courses: Array<Course>;
  readonly authors: Array<Author>;
  readonly error: ApplicationError | null;
  readonly apiCallsInProgress: number;
}

const initialState: RootState = {
  authors: [],
  courses: [],
  error: null,
  apiCallsInProgress: 0
};

export { initialState };
