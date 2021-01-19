import { AxiosPromise } from "axios";
import { APIClient } from "axios-config";

import {
  BussinessService,
  PageQuery,
  PageRepresentation,
  SortByQuery,
} from "./models";

export const BUSSINESS_SERVICES = "/bussiness-services";

export const getBussinessServices = (
  pagination: PageQuery,
  sortBy?: SortByQuery,
  filters?: Map<string, string | string[]>
): AxiosPromise<PageRepresentation<BussinessService>> => {
  let sortByQuery: string | undefined = undefined;
  if (sortBy) {
    sortByQuery = `${sortBy.orderBy}:${sortBy.orderDirection}`;
  }

  const query: string[] = [];

  //
  const params = {
    ...filters,
    offset: (pagination.page - 1) * pagination.perPage,
    limit: pagination.perPage,
    sort_by: sortByQuery,
  };
  Object.keys(params).forEach((key) => {
    const value = (params as any)[key];
    if (value !== undefined) {
      query.push(`${key}=${value}`);
    }
  });

  //
  filters?.forEach((value, key) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.push(`${key}=${v}`));
    } else {
      query.push(`${key}=${value}`);
    }
  });

  return APIClient.get(`${BUSSINESS_SERVICES}?${query.join("&")}`);
};
