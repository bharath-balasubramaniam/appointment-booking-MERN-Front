import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    position: "relative",
    left: "37%",
  },
}));
function InfoModal({ info, onClose }) {
  //   console.log(info);
  const classes = useStyles();
  return (
    <div className="modal">
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        Appointment Information
      </h1>
      <div>
        <Avatar alt="pic.png" src={info.user.pic} className={classes.large} />
      </div>
      <div className="modal-wrapper">
        <p className="info-title">
          Name : <span className="info"> {info.user.name}</span>
        </p>
        <p className="info-title">
          E-mail : <span className="info"> {info.user.email}</span>
        </p>
        <p className="info-title">
          Mobile no : <span className="info"> {info.user.contact}</span>
        </p>
        <p className="info-title">
          Last Appointment : <span className="info">{info.timeslot.date}</span>
        </p>
        <p className="info-title">
          Last Time-Slot :<span className="info">{info.timeslot.fromTime}</span>
        </p>
        <p className="info-title">
          Previous Appointments :{" "}
          <span className="info">
            {"⚠  Features will be added in future ⚠"}
          </span>
        </p>
        <button className="btn btn--alt" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
