import { Table } from "antd";

const Tables = ({
  columns,
  dataSource,
  loading,
  pagination,
  rowKey = "id",
  ...props
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="_id"
      pagination={false}
      bordered
      size="large"
      scroll={{ x: "max-content" }}
      className="custom-table"
      style={{ background: "white",  overflow: "hidden", color: "gray" }}
    />
  );
};

export default Tables;
  