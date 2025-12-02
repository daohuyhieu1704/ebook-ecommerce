import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsRefetch,
  selectSearchParams,
  selectSelectedRows,
  selectStatusFilter,
  setSelectedRows,
} from "../../features/layout/layoutSlice";
import { TableCustom } from "./TableLayout.style";

interface dataProps {
  columns: object[];
  dataSource: object[];
  pageSize?: number;
  tableHeightProp?: number;
  checkbox?: boolean;
  bordered?: boolean;
  loading: boolean;
  total?: number;
  setOffset?: any;
  onRow?: any;
  hasBtnCol?: any;
  rowClassName?: any;
  size?: "middle" | "small";
  expandable?: any;
  $userRole?: string; // [NEW] Thêm prop này để nhận Role
}

export const TableLayout = ({
  columns,
  dataSource,
  pageSize = 15,
  tableHeightProp,
  checkbox,
  loading,
  bordered,
  total,
  setOffset,
  onRow,
  rowClassName,
  size = "middle",
  expandable,
  $userRole, // [NEW] Destructure prop
}: dataProps) => {
  const [tableHeight, setTableHeight] = useState<number>();
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const filter = useAppSelector(selectStatusFilter);
  const searchParams = useAppSelector(selectSearchParams);
  const isRefetch = useAppSelector(selectIsRefetch);
  const [dataRender, setDataRender] = useState(dataSource);

  const handleResize = () => {
    setTableHeight(
      tableHeightProp ? tableHeightProp : window?.innerHeight - 214
    );
  };
  const colForSearch = Object.entries(columns);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    // Logic filter giữ nguyên
  }, [searchParams, filter]);

  useEffect(() => {
    setDataRender(dataSource);
  }, [dataSource]);

  useEffect(() => {
    window?.addEventListener("resize", handleResize);
  }, [tableHeightProp]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object[]) => {
      dispatch(setSelectedRows(selectedRows));
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    selectedRowKeys: selectedRows.map((item: any) => item.key),
  };

  return (
    <TableCustom
      $userRole={$userRole} // [NEW] Truyền role xuống Styled Component
      rowClassName={rowClassName}
      onRow={onRow}
      bordered={bordered}
      loading={loading}
      rowSelection={
        checkbox
          ? {
              type: "checkbox",
              ...rowSelection,
            }
          : undefined
      }
      columns={columns}
      dataSource={dataRender}
      pagination={{
        total,
        defaultPageSize: pageSize,
        hideOnSinglePage: true,
        onChange: (page, pageSize) => setOffset((page - 1) * pageSize),
      }}
      scroll={{
        y: tableHeight,
      }}
      size={size}
      expandable={expandable}
    />
  );
};

export default TableLayout;
