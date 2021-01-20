import React, { useCallback, useEffect } from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  PageSection,
  Title,
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
} from "shared/components";
import { useTableControls, useFetchBusinessServices } from "shared/hooks";

const columns: ICell[] = [
  { title: "Name", transforms: [sortable] },
  { title: "Description" },
  { title: "Owner" },
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
        title: item.owners.join(", "),
      },
    ],
  }));
};

export const BusinessServices: React.FC = () => {
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
    (pagination: PageQuery, sortBy?: SortByQuery) => {
      fetchBusinessServices(pagination, sortBy);
    },
    [fetchBusinessServices]
  );

  useEffect(() => {
    reloadTable(paginationQuery, sortByQuery);
  }, [paginationQuery, sortByQuery, reloadTable]);

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
