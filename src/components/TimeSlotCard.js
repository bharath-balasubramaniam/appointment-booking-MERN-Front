import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

function TimeSlotCard({ from, to }) {
  const [time, setTime] = useState({});
  useEffect(() => {
    let a = String(from).split("");
    let a1 = String(to).split("");
    a.splice(-2, 0, ":");
    a1.splice(-2, 0, ":");
    let b = a.join("");
    let b1 = a1.join("");
    setTime({ from: b, to: b1 });
  }, []);
  //   console.log(time);
  return (
    <div>
      <div>
        <FormControlLabel
          style={{
            border: "1px solid",
            borderRadius: "10px",
            padding: "2px 4px",
            paddingRight: "6px",
            margin: "5px",
          }}
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
              value={time.from}
            />
          }
          label={`${time.from} - ${time.to}`}
        />
      </div>
    </div>
  );
}

export default TimeSlotCard;
