import { useState, useEffect } from "react";
import { createGoalAPI } from "../api";
import { fetchPortfolio } from "../api";
import DateInput from "./DateInnput";

const NewGoal = () => {
  const [date, setDate] = useState("");
  const [capital, setCapital] = useState("");
  const [growthGoal, setGrowthGoal] = useState("");
  const [showInputField, setShowInputField] = useState(true);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const data = await fetchPortfolio();
      setPortfolio(data);
    };

    fetchPortfolioData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the form data
    console.log("Submitted Date:", date);
    console.log("Submitted Capital:", capital);
    console.log("Submitted Target Growth:", growthGoal);

    createGoalAPI(portfolio.id, capital, date, growthGoal);
    // Reset the form fields
    setDate("");
    setCapital("");
    setGrowthGoal("");
  };

  const handleCheckboxChange = (event) => {
    setShowInputField(event.target.checked);
    if(!showInputField) {
        setCapital(portfolio.capital + portfolio.profit);
    }
  };

  return (
    <div className="NewGoal">
      <h2>New Goal</h2>
      <form onSubmit={handleSubmit}>
        <DateInput date={date} setDate={setDate} />   
        <div className="initial_investment">
          <input
            type="checkbox"
            id="showInput"
            checked={showInputField}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="showInput">Current Portfolio Value</label>
        </div>
        {!showInputField && (
          <div className="initial_investment">
            <label htmlFor="capital">Initial Investment:</label>
            <input
              type="text"
              id="startingCapital"
              value={capital}
              onChange={(event) => setCapital(event.target.value)}
            />
          </div>
        )}
        <div className="growth_goal">
          <label htmlFor="growthGoal">Target Growth:</label>
          <input
            type="text"
            id="growthGoal"
            value={growthGoal}
            onChange={(event) => setGrowthGoal(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewGoal;
