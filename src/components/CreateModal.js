import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { InputLabel, makeStyles, Select, TextField } from "@material-ui/core";
function CreateModal({ onClose }) {
  const { user } = UserState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedShift, setSelectedShift] = useState();
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
            Please choose the date first !!
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      let date = moment(selectedDate).format("YYYY-MM-DD");
      let t1 = moment(selectedDate).diff();
      let t2 = Date.now();
      let t3 = selectedTime.split("");
      t3.splice(2, 1, " ");
      let t4 = t3.join("").split(" ");
      let time =
        t2 +
        t1 +
        t4[0] * 1 * 60 * 60 * 1000 +
        t4[1] * 1 * 60 * 1000 +
        5 * 60 * 60 * 1000 +
        30 * 60 * 1000;
      let date2 = t1 + t2 + 24 * 60 * 60 * 1000;
      let shift = selectedShift;
      //   console.log(time, date, shift);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://appointment-booking-be.herokuapp.com/timeSlot`,
        { date: date2, shift: shift, fromTime: time },
        config
      );
      if (data.date) {
        alert("The Time slot is Created !");
      }
    } catch (error) {
      if (error) alert("Error occured while creating Time-Slots");
    }
  };
  return (
    <div className="modal">
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        Create Time Slot
      </h1>
      <div style={{ flexGrow: "1", display: "flex", justifyContent: "center" }}>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy, HH:mm"
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)}
            filterDate={(date) => date.getDay() !== 0}
            calendarContainer={MyContainer}
            isClearable
            inline
          />
          <pre style={{ textAlign: "center" }}>
            <q>
              ⚠ Even if you want to
              <br />
              create timeslots for today.
              <br /> you have to select the date!
            </q>
          </pre>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <TextField
          id="time"
          label="Select Time"
          type="time"
          dateFormat="HH"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          defaultValue="09:00"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 1800, // 30 mins
          }}
        />
        <div>
          <InputLabel htmlFor="age-native-required">Shift!</InputLabel>
          <Select
            native
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            name="shift"
            inputProps={{
              id: "age-native-required",
            }}
          >
            <option aria-label="None" value="" />
            <option value={"Mor"}>Morning</option>
            <option value={"Eve"}>Evening</option>
          </Select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button className="btn btn--alt" onClick={handleSubmit}>
          Create
        </button>
        <button className="btn btn--alt" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CreateModal;
