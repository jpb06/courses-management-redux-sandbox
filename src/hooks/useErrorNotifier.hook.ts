import React from "react";
import { useReduxSelector, useReduxDispatch } from "./redux.hooks";
import { toast } from "react-toastify";
import { notice } from "../redux/actions/util/generic.actions";
import { CLEAR_ERROR } from "../redux/actions/util/action.types";

const useErrorNotifier = () => {
  const error = useReduxSelector(state => state.error);
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    if (error) {
      toast.error(`An error occured: ${error.message}`, { autoClose: false });
      dispatch(notice(CLEAR_ERROR));
    }
  }, [error]);
};

export default useErrorNotifier;
