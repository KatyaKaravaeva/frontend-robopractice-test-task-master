import { data } from "../../api/api";
import {tableActionType} from "../types/tableTypes"

export const getTableData = () => {
  return async (dispatch) => {
    try {
      const responceData = await data.fetchData();
      dispatch({type: tableActionType.GET_TABLE_DATA, payload: responceData});
    } catch (e) {
      console.log(e);
    }
  };
};
