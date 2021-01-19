import { useCallback, useReducer } from "react";
import { AxiosError } from "axios";
import { ActionType, createAsyncAction, getType } from "typesafe-actions";

import { getBussinessServices } from "api/rest";
import {
  PageRepresentation,
  BussinessService,
  PageQuery,
  SortByQuery,
} from "api/models";

export const {
  request: fetchRequest,
  success: fetchSuccess,
  failure: fetchFailure,
} = createAsyncAction(
  "useFetchBussinessServices/fetch/request",
  "useFetchBussinessServices/fetch/success",
  "useFetchBussinessServices/fetch/failure"
)<void, PageRepresentation<BussinessService>, AxiosError>();

type State = Readonly<{
  isFetching: boolean;
  bussinessServices?: PageRepresentation<BussinessService>;
  fetchError?: AxiosError;
  fetchCount: number;
}>;

const defaultState: State = {
  isFetching: false,
  bussinessServices: undefined,
  fetchError: undefined,
  fetchCount: 0,
};

type Action = ActionType<
  typeof fetchRequest | typeof fetchSuccess | typeof fetchFailure
>;

const initReducer = (isFetching: boolean): State => {
  return {
    ...defaultState,
    isFetching,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case getType(fetchRequest):
      return {
        ...state,
        isFetching: true,
      };
    case getType(fetchSuccess):
      return {
        ...state,
        isFetching: false,
        fetchError: undefined,
        bussinessServices: action.payload,
        fetchCount: state.fetchCount + 1,
      };
    case getType(fetchFailure):
      return {
        ...state,
        isFetching: false,
        fetchError: action.payload,
        fetchCount: state.fetchCount + 1,
      };
    default:
      return state;
  }
};

export interface IState {
  bussinessServices?: PageRepresentation<BussinessService>;
  isFetching: boolean;
  fetchError?: AxiosError;
  fetchCount: number;
  fetchBussinessServices: (
    page: PageQuery,
    sortBy?: SortByQuery,
    filters?: Map<string, string | string[]>
  ) => void;
}

export const useFetchBussinessServices = (
  defaultIsFetching: boolean = false
): IState => {
  const [state, dispatch] = useReducer(reducer, defaultIsFetching, initReducer);

  const fetchBussinessServices = useCallback(
    (
      page: PageQuery,
      sortBy?: SortByQuery,
      filters?: Map<string, string | string[]>
    ) => {
      dispatch(fetchRequest());

      getBussinessServices(page, sortBy, filters)
        .then(({ data }) => {
          dispatch(fetchSuccess(data));
        })
        .catch((error: AxiosError) => {
          dispatch(fetchFailure(error));
        });
    },
    []
  );

  return {
    bussinessServices: state.bussinessServices,
    isFetching: state.isFetching,
    fetchError: state.fetchError,
    fetchCount: state.fetchCount,
    fetchBussinessServices,
  };
};

export default useFetchBussinessServices;
