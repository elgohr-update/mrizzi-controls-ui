import { useCallback, useReducer } from "react";
import { AxiosError } from "axios";
import { ActionType, createAsyncAction, getType } from "typesafe-actions";

import { getBusinessServices } from "api/rest";
import {
  PageRepresentation,
  BusinessService,
  PageQuery,
  SortByQuery,
} from "api/models";

export const {
  request: fetchRequest,
  success: fetchSuccess,
  failure: fetchFailure,
} = createAsyncAction(
  "useFetchBusinessServices/fetch/request",
  "useFetchBusinessServices/fetch/success",
  "useFetchBusinessServices/fetch/failure"
)<void, PageRepresentation<BusinessService>, AxiosError>();

type State = Readonly<{
  isFetching: boolean;
  businessServices?: PageRepresentation<BusinessService>;
  fetchError?: AxiosError;
  fetchCount: number;
}>;

const defaultState: State = {
  isFetching: false,
  businessServices: undefined,
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
        businessServices: action.payload,
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
  businessServices?: PageRepresentation<BusinessService>;
  isFetching: boolean;
  fetchError?: AxiosError;
  fetchCount: number;
  fetchBusinessServices: (
    filters: {
      filterText?: string;
    },
    page: PageQuery,
    sortBy?: SortByQuery
  ) => void;
}

export const useFetchBusinessServices = (
  defaultIsFetching: boolean = false
): IState => {
  const [state, dispatch] = useReducer(reducer, defaultIsFetching, initReducer);

  const fetchBusinessServices = useCallback(
    (
      filters: { filterText?: string },
      page: PageQuery,
      sortBy?: SortByQuery
    ) => {
      dispatch(fetchRequest());

      getBusinessServices(filters, page, sortBy)
        .then(({ data }) => {
          const list = data._embedded["business-service"];
          const total = data.total_count;

          dispatch(
            fetchSuccess({
              data: list,
              meta: {
                count: total,
              },
            })
          );
        })
        .catch((error: AxiosError) => {
          dispatch(fetchFailure(error));
        });
    },
    []
  );

  return {
    businessServices: state.businessServices,
    isFetching: state.isFetching,
    fetchError: state.fetchError,
    fetchCount: state.fetchCount,
    fetchBusinessServices,
  };
};

export default useFetchBusinessServices;
