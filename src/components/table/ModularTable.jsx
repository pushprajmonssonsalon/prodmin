const ModularTable = ({ section }) => {
 

  return (
    <>
     <div className="flex my-10 items-center justify-center">
        <span className="text-3xl font-bold text-black">{section.title}</span>
      </div>

      {/* Table */}
      <table className="styled-table">
        <thead>
          <tr>
            {section.columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.data.map((item, index) => {
            const totalSum = item.categories?.reduce(
              (acc, curr) => acc + curr.sumTotal,
              0
            );

            return (
              <tr key={index}>
                {section.columns.map((col, colIdx) => {
                  // If it's the "TOTAL" column, show the calculated totalSum
                  if (col.valueKey === "totalSum") {
                    return <td key={colIdx} className="font-bold">{totalSum}</td>;
                  }

                  // If the column is a child category (e.g., "Hair", "Spa"), find the category in the item's categories
                  if (col.child) {
                    const category = item.categories?.find(
                      (cat) => cat.category.toUpperCase() === col.valueKey.toUpperCase()
                    );
                    return <td key={colIdx}>{category?.sumTotal || 0}</td>;
                  }

                  // Apply transformation function if it exists
                  if (col.transform) {
                    return <td key={colIdx}>{col.transform(item[col.valueKey])}</td>;
                  }

                  // Otherwise, render the data directly from the item
                  return <td key={colIdx}>{item[col.valueKey] || "-"}</td>;
                })}
              </tr>
            );
          })}
          {section.footer &&
            section.footer.map((footerItem, idx) => (
              <tr key={idx}>
                <td className="font-bold text-black">{footerItem.label}</td>
                <td className="font-bold text-black">{footerItem.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ModularTable;
