import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchTableDataRequest, PointData } from "./myTableSlice";
import styles from "./MyTable.module.css";
import { useAppDispatch } from "../../app/hooks";

export function MyTable() {
  const tableData = useSelector((state: RootState) => state.myTable.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTableDataRequest());
  }, [dispatch]);

  if (tableData.length === 0) {
    return <div>Loading data...</div>;
  }
  return (
    <div className={styles.table}>
      <table className={styles.tableData}>
        <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Hit</th>
            <th>Calc time</th>
            <th>Current time</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((pointData: PointData, index: number) => (
            <tr key={index} className={pointData.hit ? styles.hitYes : styles.hitNo}>
              <td>{pointData.x}</td>
              <td>{pointData.y}</td>
              <td>{pointData.r}</td>
              <td>{pointData.hit ? "Yes" : "No"}</td>
              <td>{pointData.execTime} ns</td>
              <td>{pointData.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
