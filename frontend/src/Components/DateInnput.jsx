import React from "react";

const DateInput = ({ date, setDate }) => {
    return (
      <div className="date">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
    );
};

export default DateInput;