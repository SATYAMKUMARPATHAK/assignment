import React, { useState, useEffect } from "react";
import axios from "axios";

// A custom component to display each ticket
const Ticket = ({ ticket }) => {
  // A function to return a color based on the ticket priority
  const getColor = (priority) => {
    switch (priority) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      case 5:
        return "blue";
      default:
        return "white";
    }
  };

  return (
    <div className="ticket" style={{ backgroundColor: '#fafafa' }}>
      <div className="ticket-header">
        <div class="id">
          {ticket.id}
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <p className="title">{ticket.title}</p>
      <p>{ticket.tag.join(", ")}</p>
    </div>
  );
};

var groupByStatus = function (tickets) {
  // An empty object to store the grouped tickets
  var groupedTickets = {};

  // Loop through each ticket in the tickets array
  for (var i = 0; i < tickets.length; i++) {
    // Get the current ticket and its status
    var ticket = tickets[i];
    var status = ticket.status;

    // Check if the groupedTickets object has a property with the same name as the status
    if (groupedTickets.hasOwnProperty(status)) {
      // If yes, push the ticket to the existing array of tickets with that status
      groupedTickets[status].push(ticket);
    } else {
      // If no, create a new property with the status name and assign an array with the ticket as its first element
      groupedTickets[status] = [ticket];
    }
  }

  // Return the groupedTickets object
  return groupedTickets;
};

// Invoke the function with the jsonData.tickets array as an argument and store the result in a variable called data

// A custom component to display a list of tickets
const TicketList = () => {
  // A state variable to store the tickets data
  const [tickets, setTickets] = useState([]);

  // A useEffect hook to fetch the data from the API
  useEffect(() => {
    // The API endpoint
    const url = "https://api.quicksell.co/v1/internal/frontend-assignment";

    // A function to fetch the data using Axios
    const fetchData = async () => {
      try {
        // Send a GET request to the API and store the response
        const response = await axios.get(url);

        // Extract the tickets data from the response
        
        response.data.tickets = groupByStatus(response.data.tickets);
        
        console.log(response.data.tickets);

        const data =  Object.entries(response.data.tickets);;

        // Update the state variable with the tickets data

        setTickets(data);
      } catch (error) {
        // Handle the error if any
        console.error(error);
      }
    };

    // Invoke the function to fetch the data
    fetchData();
  }, []); // Pass an empty dependency array to run only once

  return (
    <div className="ticket-bucket">
      {/* Map over the tickets array and render each ticket */}
      { tickets && tickets.map((item) => (
        <div>
        <div className="label">{item[0]}</div>
        <div>
          {item[1].map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
