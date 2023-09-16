import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// const schema = z.object({
//   description: z
//     .string()
//     .min(4, { message: "Description must be at least 4 characters." }),
//   amount: z
//     .number({ invalid_type_error: "Amount is required." })
//     .min(1, { message: "Amount must be at least 1." }),
//   category: z.string().nonempty({ message: "Category is required." }),
//   email: z.string().email().min(1),
// });

// type FormData = z.infer<typeof schema>;

// const validateFormData = (inputs: unknown) => {
//   const isValidData = schema.parse(inputs);
//   return isValidData;
// };

// const Form = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm<FormData>({ resolver: zodResolver(schema) });

//   const onSubmit = (data: FormData) => console.log(data);

//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Description
//         </label>
//         <input
//           {...register("description")}
//           id="description"
//           type="text"
//           className="form-control"
//         />
//         {errors.description && (
//           <p className="text-danger">{errors.description.message}</p>
//         )}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="amount" className="form-label">
//           Amount
//         </label>
//         <input
//           {...register("amount", { valueAsNumber: true })}
//           id="amount"
//           type="number"
//           className="form-control"
//         />
//         {errors.amount && (
//           <p className="text-danger">{errors.amount.message}</p>
//         )}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="email" className="form-label">
//           Email
//         </label>
//         <input
//           {...register("email")}
//           id="email"
//           type="email"
//           className="form-control"
//         />
//         {errors.email && <p className="text-danger">{errors.email.message}</p>}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="category">Category </label> <br />
//         <select
//           className="form-control"
//           {...register("category")}
//           value={selectedValue}
//           onChange={handleChange}
//         >
//           <option value="" disabled>
//             Select an option
//           </option>
//           <option value="groceries">Groceries</option>
//           <option value="utilities">Utilities</option>
//           <option value="entertainment">Entertainment</option>
//         </select>
//         {errors.category && (
//           <p className="text-danger">{errors.category.message}</p>
//         )}
//       </div>

//       <button className="btn btn-primary" type="submit">
//         Submit
//       </button>
//     </form>
//   );
// };

interface FormData {
  description: string;
  amount: number;
  category: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setTableData((prevData) => [...prevData, data]);
    // Clear the state after form is submitted
    setFullName("");
    setDepartment("");
    setSelectedFormCategory("");
  };

  const [tableData, setTableData] = useState<FormData[]>([]);
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedFormCategory, setSelectedFormCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [total, setTotal] = useState(0);

  const handleCategoryChange = (event) => {
    setSelectedFormCategory(event.target.value);
  };

  const handleSecondSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDelete = (indexToDelete) => {
    // Create a new array without the item to delete
    const updatedTableData = tableData.filter(
      (_, index) => index !== indexToDelete
    );
    setTableData(updatedTableData);
  };

  useEffect(() => {
    let filteredData = tableData;

    if (selectedCategory !== "all") {
      filteredData = tableData.filter(
        (item) => item.category === selectedCategory
      );
    }
    //   setFilteredTableData(tableData);
    // } else {
    //   const filteredData = tableData.filter(
    //     (item) => item.category === selectedCategory
    //   );
    //   setFilteredTableData(filteredData);

    // calculate the total
    const calculatedTotal = filteredData.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    // Update both filtered data and total
    setFilteredTableData(filteredData);
    setTotal(calculatedTotal);
  }, [selectedCategory, tableData]);

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Description
          <input
            {...register("description", { required: true, minLength: 3 })}
            className="form-control"
            id="description"
            name="description"
            type="text"
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
          />
          {errors.description?.type === "required" && (
            <p className="text-danger">The description is required.</p>
          )}
          {errors.description?.type === "minLength" && (
            <p className="text-danger">
              The description must be atleast 3 characters.
            </p>
          )}
        </label>
        <br />
        <label>
          Amount
          <input
            {...register("amount", { required: true, minLength: 1 })}
            className="form-control"
            id="amount"
            name="amount"
            type="number"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          />
          {errors.amount?.type === "required" && (
            <p className="text-danger">The amount is required.</p>
          )}
          {errors.amount?.type === "minLength" && (
            <p className="text-danger">The amount must be atleast 1 digit.</p>
          )}
        </label>
        <br />
        <label>
          Category
          <select
            {...register("category", { required: true })}
            className="form-control"
            value={selectedFormCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
          </select>
          {errors.category?.type === "required" && (
            <p className="text-danger">The category is required.</p>
          )}
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <br />
      <br />
      <label>
        <select
          className="form-control"
          value={selectedCategory}
          onChange={handleSecondSelectChange}
        >
          <option value="" disabled>
            All Categories
          </option>
          <option value="groceries">Groceries</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </label>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>${data.amount}</td>

              <td>{data.category}</td>
              <td>{data.description}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}

          <tr>
            <th>Total</th>
            <td colSpan={4}>${total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Form;
