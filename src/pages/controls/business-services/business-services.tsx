import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ButtonVariant,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  PageSection,
  Title,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  IActions,
  ICell,
  IExtraColumnData,
  IExtraData,
  IRowData,
  sortable,
  SortByDirection,
} from "@patternfly/react-table";
import { AddCircleOIcon } from "@patternfly/react-icons";

import { BusinessService, PageQuery, SortByQuery } from "api/models";

import {
  AppPlaceholder,
  ConditionalRender,
  AppTableWithControls,
  SearchInput,
} from "shared/components";
import { useTableControls, useFetchBusinessServices } from "shared/hooks";

const columns: ICell[] = [
  { title: "Name", transforms: [sortable] },
  { title: "Description" },
  { title: "Owner", transforms: [sortable] },
];

const columnIndexToField = (
  _: React.MouseEvent,
  index: number,
  direction: SortByDirection,
  extraData: IExtraColumnData
) => {
  switch (index) {
    case 0:
      return "name";
    case 2:
      return "owner";
    default:
      throw new Error("Invalid column index=" + index);
  }
};

const BUSINESS_SERVICE_FIELD = "businessService";

const getRow = (rowData: IRowData): BusinessService => {
  return rowData[BUSINESS_SERVICE_FIELD];
};

const itemsToRow = (items: BusinessService[]) => {
  return items.map((item) => ({
    [BUSINESS_SERVICE_FIELD]: item,
    cells: [
      {
        title: item.name,
      },
      {
        title: item.description,
      },
      {
        title: item.owner ? `${item.owner.name} ${item.owner.surname}` : "",
      },
    ],
  }));
};

export const BusinessServices: React.FC = () => {
  const [filterText, setFilterText] = useState("");

  const {
    businessServices,
    isFetching,
    fetchError,
    fetchBusinessServices,
  } = useFetchBusinessServices(true);

  const {
    paginationQuery,
    sortByQuery,
    sortBy,
    handlePaginationChange,
    handleSortChange,
  } = useTableControls({ columnToField: columnIndexToField });

  const reloadTable = useCallback(
    (filterText: string, pagination: PageQuery, sortBy?: SortByQuery) => {
      fetchBusinessServices({ filterText }, pagination, sortBy);
    },
    [fetchBusinessServices]
  );

  useEffect(() => {
    reloadTable(filterText, paginationQuery, sortByQuery);
  }, [filterText, paginationQuery, sortByQuery, reloadTable]);

  const actions: IActions = [
    {
      title: "Edit",
      onClick: (
        event: React.MouseEvent,
        rowIndex: number,
        rowData: IRowData,
        extraData: IExtraData
      ) => {
        const row: BusinessService = getRow(rowData);
        console.log(row);
      },
    },
    {
      title: "Delete",
      onClick: (
        event: React.MouseEvent,
        rowIndex: number,
        rowData: IRowData,
        extraData: IExtraData
      ) => {
        const row: BusinessService = getRow(rowData);
        console.log(row);
      },
    },
  ];

  const handleOnSearch = (filterText: string) => {
    setFilterText(filterText);
    handlePaginationChange({ page: 1 });
  };

  const handleOnCreateNew = () => {
    console.log("Create new");
  };

  return (
    <PageSection>
      <ConditionalRender
        when={isFetching && !(businessServices || fetchError)}
        then={<AppPlaceholder />}
      >
        <AppTableWithControls
          count={businessServices ? businessServices.meta.count : 0}
          items={businessServices ? businessServices.data : []}
          itemsToRow={itemsToRow}
          pagination={paginationQuery}
          sortBy={sortBy}
          handlePaginationChange={handlePaginationChange}
          handleSortChange={handleSortChange}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          loadingVariant="skeleton"
          fetchError={fetchError}
          filtersApplied={false}
          toolbar={
            <>
              <ToolbarGroup>
                <ToolbarItem>
                  <SearchInput onSearch={handleOnSearch} placeholder="Filter" />
                </ToolbarItem>
              </ToolbarGroup>
              <ToolbarGroup variant="button-group">
                <ToolbarItem>
                  <Button
                    type="button"
                    aria-label="new-company"
                    variant={ButtonVariant.primary}
                    onClick={handleOnCreateNew}
                  >
                    Create new
                  </Button>
                </ToolbarItem>
              </ToolbarGroup>
            </>
          }
          noDataState={
            <EmptyState variant={EmptyStateVariant.small}>
              <EmptyStateIcon icon={AddCircleOIcon} />
              <Title headingLevel="h2" size="lg">
                No entities available
              </Title>
              <EmptyStateBody>
                Start importing entities going to the <strong>Versions</strong>{" "}
                menu.
              </EmptyStateBody>
            </EmptyState>
          }
        />
      </ConditionalRender>
    </PageSection>
  );
};
