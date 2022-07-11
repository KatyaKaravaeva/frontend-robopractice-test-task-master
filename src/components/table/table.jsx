import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/table.css";

const Table = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [sortTableName, setSortTableName] = useState(false);
  const [sortTableColumn, setSortTableColumn] = useState(null)

  const { table } = useSelector((state) => state.table);

  const getTime = (timeEnd, timeStart, timeNow) => {
    let getDate = (string) =>
      new Date(
        timeNow + "T" + string.split("-")[0] + ":" + string.split("-")[1]
      );
    let different = getDate(timeEnd) - getDate(timeStart);

    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    return hours + ":" + minutes;
  };

  const checkSearch = () => {
    let tableSort;

    sortTableName
      ? (tableSort = table.slice().sort(sortArrayByName))
      : (tableSort = table);

    return tableSort.map((row, index) => {
      if (
        row.Fullname.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1
      ) {
        if (
          index <= pagination.limit * pagination.page &&
          index >= pagination.limit * (pagination.page - 1)
        )
          return (
            <tr key={row.id}>
              <td>{row.Fullname}</td>
              {recieveTable(row.Days)}
            </tr>
          );
      }
      return <></>;
    });
  };

  const sortArrayByName = (x, y) => {
    return x.Fullname.localeCompare(y.Fullname);
  };

  const sortArrayByColumn = (x,y) => {
    
  }

  const recieveTable = (days) => {
    let layout = [];
    let totalHours = 0;
    let totalMin = 0;
    
    for (let day = 1; day <= 31; ++day) {
      let flag = false;
      days.map((time, index) => {
        if (Number(time.Date.split("-").pop()) == day) {
          flag = true;
          let timeRecieve = getTime(time.End, time.Start, time.Date);
          totalHours += Number(timeRecieve.split(":")[0]);
          totalMin += Number(timeRecieve.split(":")[1]);
          return layout.push(<td key={index}> {timeRecieve}</td>);
        }
      });
      if (!flag) {
        layout.push(<td>0</td>);
      }
    }
    if (totalMin > 60) {
      let hours = Math.trunc(totalMin / 60);
      let total = totalHours + hours + ":" + (totalMin - 60 * hours);
      layout.push(<td>{total}</td>);
    }
    return layout;
  };

  const changeLimitPagination = (target) => {
    setPagination({
      ...pagination,
      limit: Number(target.value),
    });
  };

  const changePageCount = (valPage) => {
    setPagination({
      ...pagination,
      page: pagination.page + valPage,
    });
  };
  return (
    <>
      <input
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <td>
              <button
                onClick={() =>
                  sortTableName
                    ? setSortTableName(false)
                    : setSortTableName(true)
                }
              >
                <div>User</div>
              </button>
            </td>
            {[...Array(31)].map((x, ind) => (
              <td key={ind}>
                <div>{++ind}</div>
              </td>
            ))}
            <td>
              <div>Monthly</div>
            </td>
          </tr>
        </thead>
        <tbody>{checkSearch()}</tbody>
      </table>
      <div className="pagination">
        <div className="pagination-select">
          <p>Rows per page:</p>
          <select onChange={(e) => changeLimitPagination(e.target)}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="pagination-page">
          <p>
            {pagination.limit * (pagination.page - 1) + 1} -{" "}
            {pagination.limit * pagination.page} of {table.length}
          </p>
          <button
            className={`button-left ${pagination.page > 1 ? "" : "disabled"}`}
            onClick={() => (pagination.page > 1 ? changePageCount(-1) : "")}
          >
            <span></span>
          </button>
          <button
            className={`button-right ${pagination.page < Math.ceil(table.length / pagination.limit)
                ? " "
                : "disabled"
              }`}
            onClick={() =>
              pagination.page < Math.ceil(table.length / pagination.limit)
                ? changePageCount(1)
                : ""
            }
          >
            <span></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;