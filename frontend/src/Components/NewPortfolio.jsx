import { useState } from "react";
import { createPortfolioAPI } from "../api";

const NewPortfolio = () => {
    const [date, setDate] = useState('');
    const [capital, setCapital] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Process the form data
        console.log('Submitted Date:', date);
        console.log('Submitted Capital:', capital);
    
        createPortfolioAPI(capital, date);
        // Reset the form fields
        setDate('');
        setCapital('');
    };

    return(
        <div className="NewPortfolio">
            <h2>New Portfolio</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <div>
                    <label htmlFor="capital">Initial Investment:</label>
                    <input
                    type="text"
                    id="startingCapital"
                    value={capital}
                    onChange={(event) => setCapital(event.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    );
}

export default NewPortfolio;