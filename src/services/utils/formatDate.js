function formatDateToFull(dateString,full=true) {
    if (dateString) {
      const [datePart, timePart] = dateString.split("T");
      const [year, month, day] = datePart.split("-");
      const [hour, minute] = timePart.split(":");
  
      // Convert month from "08" to "Aug" or any other short form
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const monthShort = monthNames[parseInt(month, 10) - 1];
      
      if(!full){
        const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year} `;
         return formattedDate
      }
      // Format the time as "08:34 AM/PM"
      let hourInt = parseInt(hour, 10);
      const period = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12; // Convert to 12-hour format
      const formattedTime = `${hourInt}:${minute} ${period}`;
  
      // Format the full date as "7 Aug 2024 08:34 AM"
      const formattedDate = `${parseInt(day, 10)} ${monthShort} ${year} ${formattedTime}`;
      return formattedDate;
    }
    return dateString;
  }

  export default formatDateToFull