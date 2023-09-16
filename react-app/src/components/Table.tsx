import Form from "./Form";

function Table({ tableData }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.fullName}</td>
              <td>{data.department}</td>
              <td>{data.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
