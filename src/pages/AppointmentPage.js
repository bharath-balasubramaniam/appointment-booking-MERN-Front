import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  Select,
} from "@material-ui/core";
// import { NoEncryption } from "@material-ui/icons";
import AppointmentFilter from "../components/AppointmentFilter";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
function AppointmentPage() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [shift, setShift] = useState("");
  const handleChange = (event) => {
    const name = event.target.name;
    setShift({
      [name]: event.target.value,
    });
  };
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
            You can filter the Appointments!
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      <div
        className="search-wrapper"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="search-part-left" style={{ marginTop: "2rem" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy, HH:mm"
            maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
            filterDate={(date) => date.getDay() !== 0}
            calendarContainer={MyContainer}
            isClearable
            inline
          />
          <pre style={{ textAlign: "center" }}>
            <q>
              ⚠ Even if you're looking for
              <br /> today's appointmets.
              <br /> you have to select the date!
            </q>
          </pre>
        </div>
        <div
          className="search-part-right"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-native-required">Shift!</InputLabel>
            <Select
              native
              value={shift.shift}
              onChange={handleChange}
              name="shift"
              inputProps={{
                id: "age-native-required",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Mor"}>Morning</option>
              <option value={"Eve"}>Evening</option>
            </Select>

            <FormHelperText>Optional !</FormHelperText>
            {/* <button
              style={{
                padding: "12px 15px",
                color: "black",
                backgroundColor: "rgb(240,181,104)",
                marginTop: "7px",
                border: "none",
                borderRadius: "7px",
              }}
            >
              Get Appointments
            </button> */}
          </FormControl>
        </div>
      </div>
      <AppointmentFilter
        qDate={moment(selectedDate).format("YYYY-MM-DD")}
        qShift={shift.shift}
      />
    </>
  );
}

export default AppointmentPage;
