import React, { useState, useEffect } from "react";
import SlotNavbar from "../components/SlotNavbar";
import styled from "styled-components";
import DatePicker, { CalendarContainer } from "react-datepicker";
import Brightness5TwoToneIcon from "@material-ui/icons/Brightness5TwoTone";
import NightsStayTwoToneIcon from "@material-ui/icons/NightsStayTwoTone";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import "react-datepicker/dist/react-datepicker.css";
import TimeSlotCard from "../components/TimeSlotCard";
import moment from "moment";
const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  @media only screen and (max-width: 560px) {
    flex-direction: column;
  }
`;
const UserHome = () => {
  const { user } = UserState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [morShift, setMorShift] = useState([]);
  const [eveShift, setEveShift] = useState([]);
  useEffect(() => {
    fetchTimeslots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  useEffect(() => {
    setTimeout(() => {
      let mor = slots.filter((obj) => obj.fromTime <= 1200);
      setMorShift(mor);
      let eve = slots.filter((obj) => obj.toTime >= 1200);
      setEveShift(eve);
    }, 1000);
  }, [slots]);
  const MyContainer = ({ className, children }) => {
    return (
      <div
        style={{
          padding: "16px",
          background: "rgb(240,181,104)",
          color: "#fff",
        }}
      >
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0", fontWeight: "600" }}>
            You can filter the Time-slots!
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  // console.log(morShift, eveShift);
  const fetchTimeslots = async () => {
    try {
      let date = moment(selectedDate).format("YYYY-MM-DD");
      // let date = "2022-02-19";
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://appointment-booking-be.herokuapp.com/timeSlot?date=${date}`,
        config
      );
      ////////////////////////
      ///////////////////////
      setSlots(data);
    } catch (error) {
      alert("failed to load the time-slots");
    }
  };
  // console.log(slots);
  return (
    <>
      <SlotNavbar />
      <Div>
        <div
          className="left-ts"
          style={{ flexGrow: "1", display: "flex", justifyContent: "center" }}
        >
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy, HH:mm"
              minDate={new Date().getTime() - 5 * 24 * 60 * 60 * 1000}
              maxDate={new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)}
              filterDate={(date) => date.getDay() !== 0}
              calendarContainer={MyContainer}
              isClearable
              inline
            />
            <pre style={{ textAlign: "left" }}>
              <q>
                ⚠ Even if you're looking for
                <br /> today's timeslots.
                <br /> you have to select the date!
              </q>
            </pre>
          </div>
        </div>
        <div className="right-ts" style={{ flexGrow: "2" }}>
          <div style={{ minHeight: "50vh" }}>
            <div className="shift-mor" style={{ display: "flex", gap: "10px" }}>
              <Brightness5TwoToneIcon
                style={{
                  margin: "0.3rem",
                  fontSize: "3rem",
                  color: "rgb(240,181,104)",
                }}
              />
              <div className="shift-mor-h">
                <h3 style={{ margin: "3px 0  0 0" }}>Morning</h3>
                <p style={{ margin: "0" }}>9:00 AM to 12:00 AM</p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {morShift.map((obj, index) => (
                <TimeSlotCard key={index} from={obj.fromTime} to={obj.toTime} />
              ))}
            </div>
          </div>
          <div style={{ minHeight: "50vh" }}>
            <div className="shift-eve" style={{ display: "flex", gap: "10px" }}>
              <NightsStayTwoToneIcon
                style={{
                  margin: "0.3rem",
                  fontSize: "3rem",
                  color: "rgb(240,181,104)",
                }}
              />
              <div className="shift-eve-h">
                <h3 style={{ margin: "3px 0  0 0" }}>Evening</h3>
                <p style={{ margin: "0" }}>5:00 PM to 9:00 PM</p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {eveShift.map((obj, index) => (
                <TimeSlotCard key={index} from={obj.fromTime} to={obj.toTime} />
              ))}
            </div>
          </div>
        </div>
      </Div>
    </>
  );
};

export default UserHome;
