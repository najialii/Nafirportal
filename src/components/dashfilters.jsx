import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const Filters = ({ title, onSearch, onFilterChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-gray-300">
      {title && <h1 className="text-xl font-semibold text-gray-700 mb-4">{title}</h1>}

      <div className="flex flex-wrap items-center gap-4">
        <Search
          placeholder="Search by name or location"
          onSearch={onSearch}
          className="w-80 transition-all duration-300 hover:border-gray-300"
          enterButton
        />

        <Select
          defaultValue="all"
          className="w-44 transition-all duration-300 hover:border-gray-300"
          onChange={onFilterChange}
          bordered={false}
          dropdownStyle={{ borderRadius: "8px" }}
        >
          <Option value="all">All Activities</Option>
          <Option value="upcoming">Upcoming</Option>
          <Option value="past">Past</Option>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
