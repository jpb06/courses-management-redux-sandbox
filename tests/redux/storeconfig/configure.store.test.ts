import * as Dev from "./../../../src/redux/configure.store.dev";
import * as Prod from "./../../../src/redux/configure.store.prod";
import { initialState } from "../../../src/redux/root.state";

describe("configureStore", () => {
  describe("for dev", () => {
    it("should return the store with the default initial state", async () => {
      const store = Dev.default(initialState);
      expect(store.getState()).toStrictEqual(initialState);
    });

    it("should return the store with the default initial state when passed nothing", async () => {
      const store = Dev.default();
      expect(store.getState()).toStrictEqual(initialState);
    });
  });

  describe("for prod", () => {
    it("should return the store with the default initial state", async () => {
      const store = Prod.default(initialState);
      expect(store.getState()).toStrictEqual(initialState);
    });

    it("should return the store with the default initial state when passed nothing", async () => {
      const store = Prod.default();
      expect(store.getState()).toStrictEqual(initialState);
    });
  });

  describe("switcher", () => {
    it("should return the prod store if env is 'production'", async () => {
      const configureStoreProd = jest.spyOn(Prod, "default");

      process.env.NODE_ENV = "production";

      const configureStore = require("./../../../src/redux/configure.store");
      const store = configureStore.default(initialState);

      expect(configureStoreProd).toHaveBeenCalledTimes(1);
    });
  });
});
