import { LOAD_AUTHORS_FAILURE } from "../../../../src/redux/actions/util/action.types";
import { notice } from "../../../../src/redux/actions/util/generic.actions";

describe("ActionWithPayload", () => {
  it("should create a LOAD_AUTHORS_FAILURE action", () => {
    //arrange
    const expectedAction = {
      type: LOAD_AUTHORS_FAILURE
    };

    //act
    const createdAction = notice(LOAD_AUTHORS_FAILURE);

    //assert
    expect(createdAction).toEqual(expectedAction);
  });
});
