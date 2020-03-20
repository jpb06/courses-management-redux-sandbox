import { mountComponent } from "./CoursesPage.helper";
import { authors, courses } from "../../../../tools/mockData";
import { CLEAR_ERROR } from "../../../../src/redux/actions/util/action.types";
import { toast } from "react-toastify";

describe("CoursesPage", () => {
  it("notifies on errors when there is one", async () => {
    const errorToast = jest.spyOn(toast, "error");

    const [, store] = mountComponent({
      courses,
      authors,
      error: { message: "bad things happen" }
    });

    await new Promise(r => setTimeout(r, 100));

    const actions = store.getActions();
    const expectedActions = [{ type: CLEAR_ERROR }];
    expect(actions).toEqual(expectedActions);

    expect(errorToast).toHaveBeenCalledTimes(1);
  });
});
