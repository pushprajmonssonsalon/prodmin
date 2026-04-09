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

export const formatDate = (dateStr, ind = false, month = false) => {
  if (!dateStr) return ""

  if (ind) {
    const date = dateStr.split("-")
    const dd = date[2]
    const mm = date[1]
    const yyyy = date[0]
    return `${dd}/${mm}/${yyyy}`
  }
  if (month) {
    // Full year
    const date = new Date(dateStr);  // Current date


    // Convert month from "08" to "Aug" or any other short form
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
  else {
    const date = new Date(dateStr);  // Current date
    const dd = String(date.getDate()).padStart(2, '0');       // Day with leading zero
    const mm = String(date.getMonth() + 1).padStart(2, '0');  // Month with leading zero (getMonth() returns 0-11)
    const yyyy = date.getFullYear();                          // Full year

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate
  }

}
  export default formatDateToFull