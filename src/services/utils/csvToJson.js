const csvToJson = (csv) => {
  const productkeys = {

    name: "",
    stockQuantity: 0,
    price: 0,
    brand: "",
    category: "",
    mrp: 0,
    skucode: "",
    type: "",
    description: "",
    itemId: 0,
    volume: 0,
    unit: "",
    size: 0,
    stock: 0,
    gst: 0,
   
    brand: "",
    type: "",

   
   
  };
  // Split CSV into rows
  const rows = csv.split("\n").filter((row) => row.trim() !== ""); // Remove empty rows
  

  if (rows.length <= 1) return []; // No data rows

  // Extract headers
  const headers = rows[0].split(",").map((header) => header.trim());
  

  // Map CSV rows to JSON objects
  return rows
    .slice(1)
    .map((row) => {
      const values = row.split(",").map((value) => value.trim());

      // Create JSON object from headers and values
      const jsonObject = headers.reduce((obj, header, index) => {
        const value = values[index];
        // Only include keys with non-empty values
        if (value && value !== "") {
          obj[header] =
            typeof productkeys[header] === "number" ? +value : value;
        }
        return obj;
      }, {});

      // Include the object only if it has at least one key
      return Object.keys(jsonObject).length > 0 ? jsonObject : null;
    })
    .filter((item) => item !== null); // Remove null entries
};

export default csvToJson;
