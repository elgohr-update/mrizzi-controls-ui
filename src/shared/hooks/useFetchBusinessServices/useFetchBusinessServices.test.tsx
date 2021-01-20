import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchBusinessServices } from "./useFetchBusinessServices";
import { BusinessService, PageRepresentation } from "api/models";
import { BUSINESS_SERVICES } from "api/rest";

describe("useFetchBusinessServices", () => {
  it("Fetch error due to no REST API found", async () => {
    // Mock REST API
    new MockAdapter(axios).onGet(BUSINESS_SERVICES).networkError();

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBusinessServices()
    );

    const {
      businessServices: companies,
      isFetching,
      fetchError,
      fetchBusinessServices: fetchCompanies,
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
    expect(result.current.businessServices).toBeUndefined();
    expect(result.current.fetchError).not.toBeUndefined();
  });

  it("Fetch success", async () => {
    // Mock REST API
    const data: PageRepresentation<BusinessService> = {
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
      .onGet(`${BUSINESS_SERVICES}?offset=0&limit=10`)
      .reply(200, data);

    // Use hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchBusinessServices()
    );

    const {
      businessServices: companies,
      isFetching,
      fetchError,
      fetchBusinessServices: fetchCompanies,
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
    expect(result.current.businessServices).toMatchObject(data);
    expect(result.current.fetchError).toBeUndefined();
  });
});
