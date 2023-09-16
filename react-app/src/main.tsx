import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { FieldValues, useForm } from "react-hook-form";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// //Handling form submission
// const App = () => {
//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     console.log("Submitted");
//   };

//   return <form onSubmit={handleSubmit}></form>;
// };

// //Accessing input fields using the ref hook
// const App = () => {
//   const nameRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();

//     if (nameRef.current) console.log(nameRef.current.value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input ref={nameRef} type="text" />
//     </form>
//   );
// };

// //MANAGING FORM STATE USING THE STATE HOOK

// const App = () => {
//   const [name, setName] = useState("");

//   return (
//     <form>
//       <input
//         type="text"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       />
//     </form>
//   );
// };

//MANAGING FORM STATE USING REACT HOOK FORM

// const App = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data: FieldValues) => {
//     console.log("Submitting the form", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("name")} type="text" />
//     </form>
//   );
// };

//VALIDATION USING HTML5 ATTRIBUTES

// const App = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const onSubmit = (data: FieldValues) => {
//     console.log("Submitting the form", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("name", { required: true })} type="text" />
//       {errors.name?.type === "required" && <p>Name is required.</p>}
//     </form>
//   );
// };

// //DISABLING THE SUBMIT BUTTON

// const App = () => {
//   const {
//     formState: { isValid },
//   } = useForm<FormData>();

//   return (
//     <form>
//       <button disabled={!isValid}>Submit</button>
//     </form>
//   );
// };

// //SCHEMA-BASED VALIDATION WITH ZOD

// import { FieldValues, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const schema = z.object({
//   name: z.string().min(3),
//   amount: z.number().min(0.01),
// });

// type FormData = z.infer<typeof schema>;

// const App = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: zodResolver(schema) });

//   const onSubmit = (data: FieldValues) => {
//     console.log("Submitting the form", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("name")} type="text" />
//       {errors.name && <p>{errors.name.message}</p>}

//       <input {...register("amount")} type="number" />
//       {errors.amount && <p>{errors.amount.message}</p>}
//     </form>
//   );
// };
