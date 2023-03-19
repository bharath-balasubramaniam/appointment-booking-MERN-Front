import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserState } from "../context/UserProvider";

import StickyHeadTable from "./StickyTable";
const TableWrapper = styled.div`
  margin: 40px 15px;
`;

function AppointmentTable(props) {
  const { user } = UserState();
  // console.log(props);
  const [appointments, setAppointments] = React.useState([]);
//   let qDate = props.qDate;
//   let qShift = props.qShift;
  // console.log(props);
  const fetchAppointments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://appointment-app-nn8n.onrender.com/appointments",
        config
      );

      /////////////////////////////////////
      ///////////////////////////////////
      setAppointments(data);
    } catch (error) {
      alert("failed to load the appointments!");
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.qDate, props.qShift]);
  useEffect(() => {
    let items = appointments?.filter((obj) => {
      console.log("hi");
      console.log(obj.timeslot.date, props.qDate);
      if (props.qDate && props.qShift) {
        console.log("hi1");
        return (
          obj.timeslot.date === props.qDate &&
          obj.timeslot.shift[0] === props.qShift
        );
      } else if (props.qDate) {
        console.log("hi2");
        return obj.timeslot.date === props.qDate;
      } else {
        return obj;
      }
    });
    setAppointments(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.qDate, props.q]);
  return (
    <TableWrapper>
      <StickyHeadTable data={appointments} />
    </TableWrapper>
  );
}
export default AppointmentTable;
