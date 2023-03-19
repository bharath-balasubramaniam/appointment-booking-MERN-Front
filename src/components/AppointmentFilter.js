import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserState } from "../context/UserProvider";

import StickyHeadTable from "./StickyTable";
const TableWrapper = styled.div`
  margin: 40px 15px;
`;

function AppointmentFilter(props) {
  const { user } = UserState();
  // console.log(props);
  const [appointments, setAppointments] = React.useState([]);

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
      let items = data?.filter((obj) => {
        if (props.qDate && props.qShift) {
          return (
            obj.timeslot.date === props.qDate &&
            obj.timeslot.shift[0] === props.qShift
          );
        } else if (props.qDate) {
          return obj.timeslot.date === props.qDate;
        } else {
          return obj;
        }
      });
      setAppointments(items);
      ///////////////////////////////////
    } catch (error) {
      alert("failed to load the appointments!");
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.qDate, props.qShift]);

  return (
    <TableWrapper>
      <StickyHeadTable data={appointments} />
    </TableWrapper>
  );
}
export default AppointmentFilter;
