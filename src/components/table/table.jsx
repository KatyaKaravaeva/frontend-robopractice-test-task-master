import React from "react";
import { useSelector } from "react-redux";

const Table = () => {

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

  return (
    <table>
      <thead>
        <tr>
          <td>User</td>
          {[...Array(31)].map((x, ind) => <td>{++ind}</td>)}
          <td>Monthly</td>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr key={row.id}>
            <td>{row.Fullname}</td>
            {row.Days.map((time) => (
              <td>{getTime(time.End, time.Start, time.Date)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
