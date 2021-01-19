import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchBussinessServices } from "./useFetchBussinessServices";
import { BussinessService, PageRepresentation } from "api/models";
import { BUSSINESS_SERVICES } from "api/rest";

describe("useFetchBussinessServices", () => {
  it("Fetch error due to no REST API found", async () => {
    // Mock REST API
    new MockAdapter(axios).onGet(BUSSINESS_SERVICES).networkError();

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBussinessServices()
    );

    const {
      bussinessServices: companies,
      isFetching,
      fetchError,
      fetchBussinessServices: fetchCompanies,
    } = result.current;

    expect(isFetching).toBe(false);
    expect(companies).toBeUndefined();
    expect(fetchError).toBeUndefined();

    // Init fetch
    act(() => fetchCompanies({ page: 2, perPage: 50 }));
    expect(result.current.isFetching).toBe(true);

    // Fetch finished
    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.bussinessServices).toBeUndefined();
    expect(result.current.fetchError).not.toBeUndefined();
  });

  it("Fetch success", async () => {
    // Mock REST API
    const data: PageRepresentation<BussinessService> = {
      meta: {
        offset: 0,
        limit: 0,
        count: 0,
      },
      links: {
        first: "",
        previous: "",
        last: "",
        next: "",
      },
      data: [],
    };

    new MockAdapter(axios)
      .onGet(`${BUSSINESS_SERVICES}?offset=0&limit=10`)
      .reply(200, data);

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBussinessServices()
    );

    const {
      bussinessServices: companies,
      isFetching,
      fetchError,
      fetchBussinessServices: fetchCompanies,
    } = result.current;

    expect(isFetching).toBe(false);
    expect(companies).toBeUndefined();
    expect(fetchError).toBeUndefined();

    // Init fetch
    act(() => fetchCompanies({ page: 1, perPage: 10 }));
    expect(result.current.isFetching).toBe(true);

    // Fetch finished
    await waitForNextUpdate();
    expect(result.current.isFetching).toBe(false);
    expect(result.current.bussinessServices).toMatchObject(data);
    expect(result.current.fetchError).toBeUndefined();
  });
});
