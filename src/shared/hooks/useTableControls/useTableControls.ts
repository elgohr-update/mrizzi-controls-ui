import { useCallback, useReducer } from "react";
import { ActionType, createAction, getType } from "typesafe-actions";
import {
  IExtraColumnData,
  ISortBy,
  SortByDirection,
} from "@patternfly/react-table";

import { PageQuery, SortByQuery } from "api/models";

interface PaginationAction {
  page: number;
  perPage?: number;
}

const setSortBy = createAction("app-table/sortBy/change")<{
  index: number;
  fieldName: string;
  direction: "asc" | "desc";
}>();
const setPagination = createAction(
  "app-table/pagination/change"
)<PaginationAction>();

type State = Readonly<{
  changed: boolean;

  paginationQuery: PageQuery;
  sortByQuery?: SortByQuery;
  sortBy?: ISortBy;
}>;

const defaultState: State = {
  changed: false,

  paginationQuery: {
    page: 1,
    perPage: 10,
  },
  sortByQuery: undefined,
  sortBy: undefined,
};

type Action = ActionType<typeof setSortBy | typeof setPagination>;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case getType(setPagination):
      return {
        ...state,
        changed: true,
        paginationQuery: {
          page: action.payload.page,
          perPage: action.payload.perPage
            ? action.payload.perPage
            : state.paginationQuery.perPage,
        },
      };
    case getType(setSortBy):
      return {
        ...state,
        changed: true,
        sortByQuery: {
          orderBy: action.payload.fieldName,
          orderDirection: action.payload.direction,
        },
        sortBy: {
          index: action.payload.index,
          direction: action.payload.direction,
        },
      };
    default:
      return state;
  }
};

// Hook

interface HookArgs {
  columnToField: (
    _: React.MouseEvent,
    index: number,
    direction: SortByDirection,
    extraData: IExtraColumnData
  ) => string;

  sortBy?: ISortBy;
}

interface HookState {
  paginationQuery: PageQuery;
  sortByQuery?: SortByQuery;
  sortBy?: ISortBy;
  handlePaginationChange: (pagination: PaginationAction) => void;
  handleSortChange: (
    event: React.MouseEvent,
    index: number,
    direction: SortByDirection,
    extraData: IExtraColumnData
  ) => void;
}

export const useTableControls = ({
  columnToField: columnIndexToField,
  sortBy,
}: HookArgs): HookState => {
  const [state, dispatch] = useReducer(
    reducer,
    sortBy
      ? {
          ...defaultState,
          sortBy,
          sortByQuery: {
            orderBy: columnIndexToField(
              null as any,
              sortBy.index!,
              sortBy.direction === "asc"
                ? SortByDirection.asc
                : SortByDirection.desc,
              null as any
            ),
            orderDirection: sortBy.direction === "asc" ? "asc" : "desc",
          },
        }
      : defaultState
  );

  const handlePaginationChange = useCallback((pagination: PaginationAction) => {
    dispatch(setPagination(pagination));
  }, []);

  const handleSortChange = useCallback(
    (
      event: React.MouseEvent,
      index: number,
      direction: SortByDirection,
      extraData: IExtraColumnData
    ) => {
      dispatch(
        setSortBy({
          index: index,
          fieldName: columnIndexToField(event, index, direction, extraData),
          direction: direction,
        })
      );
    },
    [columnIndexToField]
  );

  return {
    paginationQuery: state.paginationQuery,
    sortByQuery: state.sortByQuery,
    sortBy: state.sortBy,
    handlePaginationChange,
    handleSortChange,
  };
};
