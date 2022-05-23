import React from "react";
import { useState, useEffect } from "react";
import { Table as AntTable, SpinProps } from "antd";

const Table = (props) => {
  const {
    columns,
    rowKey,
    fetchApi,
    queryParams = {},
    refreshOutside,
    handleTableList,
    pagination: pagi = {},
    rowSelection,
  } = props;
  const [refreshInside, setRefreshInside] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pagi.noPagination ? 0 : 5,
    total: 0,
    pageSizeOptions: ["5", "10", "20"],
    showQuickJumper: true,
    showSizeChanger: true,
    position: ["none", pagi.noPagination ? "none" : "bottomRight"],
    ...pagi,
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // 内部刷新
  const handleRefresh = () => {
    setRefreshInside(!refreshInside);
  };

  // 父组件修改页码后更新参数
  useEffect(() => {
    setPagination({
      ...pagination,
      current: queryParams.pageNum,
    });
  }, [queryParams]);

  // 请求表格列表数据
  useEffect(() => {
    const getList = async () => {
      const pagiParam = {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      };
      let params = { ...queryParams };
      if (!pagi.hidePagination) {
        Object.assign(params, pagiParam);
      }

      setLoading(true);
      try {
        let rows = [];
        let { data } = await fetchApi(params, { noLoading: true });
        if (!pagi.hidePagination) {
          // 有分页
          const { list, pageNum, pageSize, total } = data;
          rows = handleTableList ? handleTableList(list) : list;
          setPageData({ pageNum, pageSize, total });
        } else {
          // 无分页
          rows = handleTableList ? handleTableList(data) : data;
        }
        setTableData(rows);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getList();
  }, [fetchApi, refreshInside, refreshOutside]);

  // 分页操作
  const onPageChange = (pageNum, pageSize) => {
    setPagination({
      ...pagination,
      current: pageNum,
      pageSize,
    });
    // 刷新表格
    handleRefresh();
  };

  // 分页数据更新
  const setPageData = ({ pageNum, pageSize, total }) => {
    setPagination({
      ...pagination,
      current: pageNum,
      pageSize,
      total,
    });
  };

  return (
    <AntTable
      columns={columns}
      rowKey={rowKey}
      dataSource={tableData}
      loading={loading}
      rowSelection={rowSelection}
      pagination={{
        ...pagination,
        onChange: onPageChange,
      }}
    />
  );
};

export default Table;
