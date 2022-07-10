import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/table.css";

const Table = () => {
  const [search, setSearch] = useState("");

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

  const checkSearch = (row) => {
    if (row.Fullname.indexOf(search) !== -1){
      return ( <tr key={row.id}>
        <td>{row.Fullname}</td>
        {recieveTable(row.Days)}
      </tr>)
    }
    return <></>
  };

  const recieveTable = (days) => {
    let layout = [];
    let totalHours = 0;
    let totalMin = 0;
    for (let day = 1; day <= 31; ++day) {
      let flag = false;
      days.map((time) => {
        if (Number(time.Date.split("-").pop()) == day) {
          flag = true;
          let timeRecieve = getTime(time.End, time.Start, time.Date);
          totalHours += Number(timeRecieve.split(":")[0]);
          totalMin += Number(timeRecieve.split(":")[1]);
          return layout.push(<td> {timeRecieve}</td>);
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

  return (
    <>
      <input
        placeholder="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <td>User</td>
            {[...Array(31)].map((x, ind) => (
              <td>{++ind}</td>
            ))}
            <td>Monthly</td>
          </tr>
        </thead>
        <tbody>{table.map((row) => checkSearch(row))}</tbody>
      </table>
    </>
  );
};

export default Table;
