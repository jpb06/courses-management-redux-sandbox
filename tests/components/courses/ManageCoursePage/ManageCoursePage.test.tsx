import { act } from "react-dom/test-utils";
import { mountComponent, defaultStoreState } from "./ManageCoursePage.helper";

describe("ManageCoursePage", () => {
  it("Sets an error when attempting to save an empty title field", () => {
    const [wrapper] = mountComponent("", defaultStoreState);

    wrapper.find("form").simulate("submit");
    //console.log(wrapper.debug());
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("The title field is required");
  });

  it("Changes state when handleChange is called on an input", async () => {
    const [wrapper] = mountComponent("", defaultStoreState);

    const textInput = wrapper.find('TextInput[id="title"]').props() as any;
    act(() =>
      textInput.handleChange({
        currentTarget: {
          name: "title",
          value: "yolo"
        }
      })
    );
    wrapper.update();

    expect(wrapper.find('TextInput[id="title"]').prop("value")).toEqual("yolo");
  });

  it("Changes state when handleChange is called on the authors select", async () => {
    const [wrapper] = mountComponent("", defaultStoreState);

    const textInput = wrapper.find('SelectInput[id="authorId"]').props() as any;
    act(() =>
      textInput.handleChange({
        currentTarget: {
          name: "authorId",
          value: "1"
        }
      })
    );
    wrapper.update();

    expect(wrapper.find('SelectInput[id="authorId"]').prop("value")).toEqual(1);
  });

  it("Changes state when handleChange is called on the authors select with no value", async () => {
    const [wrapper] = mountComponent("", defaultStoreState);

    const textInput = wrapper.find('SelectInput[id="authorId"]').props() as any;
    act(() =>
      textInput.handleChange({
        currentTarget: {
          name: "authorId",
          value: ""
        }
      })
    );
    wrapper.update();

    expect(wrapper.find('SelectInput[id="authorId"]').prop("value")).toEqual(
      ""
    );
  });
});
