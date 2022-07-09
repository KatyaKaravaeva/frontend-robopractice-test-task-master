import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostService from "../api/api";
import { getTableData } from "../store/actionCreators/tableCreators";
import Table from "../components/table/table";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTableData())
  }, []);
  return (<Table/>);
};
