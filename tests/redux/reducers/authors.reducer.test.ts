import { authorsReducer } from "../../../src/redux/reducers/authors.reducer";
import { LOAD_AUTHORS_SUCCESS } from "../../../src/redux/actions/util/action.types";
import { action } from "../../../src/redux/actions/util/generic.actions";
import Author from "../../../src/types/author.type";

const initialState: Array<Author> = [
  {
    id: 1,
    name: "Super bro"
  },
  {
    id: 2,
    name: "Ultracool man"
  }
];

describe("Authors reducer actions", () => {
  it("Should return all authors when passed LOAD_AUTHORS_SUCCESS", () => {
    const updatedState = initialState.concat({
      id: 3,
      name: "Another cool guy"
    });

    const coursesAction = action(LOAD_AUTHORS_SUCCESS, updatedState);
    const newState = authorsReducer(initialState, coursesAction);

    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual("Super bro");
    expect(newState[1].name).toEqual("Ultracool man");
    expect(newState[2].name).toEqual("Another cool guy");
  });
});
