// import React, { useState } from "react";

// function Borrow() {
//   const [borrowRecords, setBorrowRecords] = useState([
//     {
//       id: 1,
//       book: "Atomic Habits",
//       member: "Kasun Perera",
//       borrowDate: "2026-08-15",
//       dueDate: "2026-08-22",
//       returnDate: "",
//       status: "Borrowed",
//     },
//     {
//       id: 2,
//       book: "Clean Code",
//       member: "Nimali Fernando",
//       borrowDate: "2026-08-10",
//       dueDate: "2026-08-17",
//       returnDate: "2026-08-16",
//       status: "Returned",
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");

//   const [newBorrow, setNewBorrow] = useState({
//     book: "",
//     member: "",
//     borrowDate: "",
//     dueDate: "",
//   });

//   const books = [
//     "Clean Code",
//     "The Pragmatic Programmer",
//     "Atomic Habits",
//     "Introduction to Algorithms",
//     "Java Programming",
//     "Database Systems",
//     "Cloud Computing",
//   ];

//   const members = [
//     "Kasun Perera",
//     "Nimali Fernando",
//     "Amal Silva",
//     "Chamara Perera",
//     "Tharushi Fernando",
//   ];

//   const handleChange = (e) => {
//     setNewBorrow({
//       ...newBorrow,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleBorrowBook = (e) => {
//     e.preventDefault();

//     if (
//       !newBorrow.book ||
//       !newBorrow.member ||
//       !newBorrow.borrowDate ||
//       !newBorrow.dueDate
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }

//     if (newBorrow.dueDate < newBorrow.borrowDate) {
//       alert("Due date cannot be before the borrow date.");
//       return;
//     }

//     const newRecord = {
//       id: borrowRecords.length + 1,
//       book: newBorrow.book,
//       member: newBorrow.member,
//       borrowDate: newBorrow.borrowDate,
//       dueDate: newBorrow.dueDate,
//       returnDate: "",
//       status: "Borrowed",
//     };

//     setBorrowRecords([...borrowRecords, newRecord]);

//     setNewBorrow({
//       book: "",
//       member: "",
//       borrowDate: "",
//       dueDate: "",
//     });

//     setShowForm(false);
//   };

//   const handleReturnBook = (id) => {
//     const today = new Date().toISOString().split("T")[0];

//     setBorrowRecords(
//       borrowRecords.map((record) =>
//         record.id === id
//           ? {
//               ...record,
//               returnDate: today,
//               status: "Returned",
//             }
//           : record
//       )
//     );
//   };

//   const filteredRecords = borrowRecords.filter((record) => {
//     const matchesSearch =
//       record.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.member.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       filterStatus === "All" ||
//       record.status === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   const totalBorrowed = borrowRecords.filter(
//     (record) => record.status === "Borrowed"
//   ).length;

//   const totalReturned = borrowRecords.filter(
//     (record) => record.status === "Returned"
//   ).length;

//   const totalRecords = borrowRecords.length;

//   return (
//     <div className="container-fluid py-4">

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold mb-1">
//             Borrow & Return
//           </h2>

//           <p className="text-muted mb-0">
//             Manage borrowed and returned books
//           </p>
//         </div>

//         <button
//           className="btn btn-dark"
//           onClick={() => setShowForm(!showForm)}
//         >
//           + Borrow Book
//         </button>
//       </div>

//       {/* Statistics */}
//       <div className="row g-4 mb-4">

//         {/* Total Records */}
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-body">
//               <h6 className="text-muted">
//                 Total Transactions
//               </h6>

//               <h2 className="fw-bold">
//                 {totalRecords}
//               </h2>

//               <p className="text-muted mb-0">
//                 Borrowing records
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Borrowed */}
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-body">
//               <h6 className="text-muted">
//                 Currently Borrowed
//               </h6>

//               <h2 className="fw-bold text-warning">
//                 {totalBorrowed}
//               </h2>

//               <p className="text-muted mb-0">
//                 Books currently borrowed
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Returned */}
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm">
//             <div className="card-body">
//               <h6 className="text-muted">
//                 Returned Books
//               </h6>

//               <h2 className="fw-bold text-success">
//                 {totalReturned}
//               </h2>

//               <p className="text-muted mb-0">
//                 Successfully returned
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Borrow Form */}
//       {showForm && (
//         <div className="card border-0 shadow-sm mb-4">

//           <div className="card-body p-4">

//             <h5 className="fw-bold mb-4">
//               Borrow a Book
//             </h5>

//             <form onSubmit={handleBorrowBook}>

//               <div className="row g-3">

//                 {/* Book */}
//                 <div className="col-md-6">

//                   <label className="form-label fw-semibold">
//                     Select Book
//                   </label>

//                   <select
//                     name="book"
//                     className="form-select"
//                     value={newBorrow.book}
//                     onChange={handleChange}
//                   >

//                     <option value="">
//                       Select a book
//                     </option>

//                     {books.map((book, index) => (
//                       <option key={index} value={book}>
//                         {book}
//                       </option>
//                     ))}

//                   </select>

//                 </div>

//                 {/* Member */}
//                 <div className="col-md-6">

//                   <label className="form-label fw-semibold">
//                     Select Member
//                   </label>

//                   <select
//                     name="member"
//                     className="form-select"
//                     value={newBorrow.member}
//                     onChange={handleChange}
//                   >

//                     <option value="">
//                       Select a member
//                     </option>

//                     {members.map((member, index) => (
//                       <option key={index} value={member}>
//                         {member}
//                       </option>
//                     ))}

//                   </select>

//                 </div>

//                 {/* Borrow Date */}
//                 <div className="col-md-6">

//                   <label className="form-label fw-semibold">
//                     Borrow Date
//                   </label>

//                   <input
//                     type="date"
//                     name="borrowDate"
//                     className="form-control"
//                     value={newBorrow.borrowDate}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 {/* Due Date */}
//                 <div className="col-md-6">

//                   <label className="form-label fw-semibold">
//                     Due Date
//                   </label>

//                   <input
//                     type="date"
//                     name="dueDate"
//                     className="form-control"
//                     value={newBorrow.dueDate}
//                     onChange={handleChange}
//                   />

//                 </div>

//                 {/* Buttons */}
//                 <div className="col-12">

//                   <button
//                     type="submit"
//                     className="btn btn-dark me-2"
//                   >
//                     Confirm Borrow
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowForm(false)}
//                   >
//                     Cancel
//                   </button>

//                 </div>

//               </div>

//             </form>

//           </div>

//         </div>
//       )}

//       {/* Search & Filter */}
//       <div className="card border-0 shadow-sm mb-4">

//         <div className="card-body">

//           <div className="row g-3">

//             {/* Search */}
//             <div className="col-md-8">

//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by book or member..."
//                 value={searchTerm}
//                 onChange={(e) =>
//                   setSearchTerm(e.target.value)
//                 }
//               />

//             </div>

//             {/* Status Filter */}
//             <div className="col-md-4">

//               <select
//                 className="form-select"
//                 value={filterStatus}
//                 onChange={(e) =>
//                   setFilterStatus(e.target.value)
//                 }
//               >

//                 <option value="All">
//                   All Transactions
//                 </option>

//                 <option value="Borrowed">
//                   Borrowed
//                 </option>

//                 <option value="Returned">
//                   Returned
//                 </option>

//               </select>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Borrow Records */}
//       <div className="card border-0 shadow-sm">

//         <div className="card-body">

//           <div className="d-flex justify-content-between align-items-center mb-3">

//             <h5 className="fw-bold mb-0">
//               Borrowing Records
//             </h5>

//             <span className="badge bg-dark">
//               {filteredRecords.length} Records
//             </span>

//           </div>

//           <div className="table-responsive">

//             <table className="table table-hover align-middle">

//               <thead className="table-light">

//                 <tr>
//                   <th>#</th>
//                   <th>Book</th>
//                   <th>Member</th>
//                   <th>Borrow Date</th>
//                   <th>Due Date</th>
//                   <th>Return Date</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {filteredRecords.length === 0 ? (

//                   <tr>

//                     <td
//                       colSpan="8"
//                       className="text-center py-5 text-muted"
//                     >
//                       No borrowing records found.
//                     </td>

//                   </tr>

//                 ) : (

//                   filteredRecords.map((record, index) => (

//                     <tr key={record.id}>

//                       {/* Number */}
//                       <td>
//                         {index + 1}
//                       </td>

//                       {/* Book */}
//                       <td>
//                         <div className="fw-semibold">
//                           {record.book}
//                         </div>
//                       </td>

//                       {/* Member */}
//                       <td>
//                         {record.member}
//                       </td>

//                       {/* Borrow Date */}
//                       <td>
//                         {record.borrowDate}
//                       </td>

//                       {/* Due Date */}
//                       <td>
//                         {record.dueDate}
//                       </td>

//                       {/* Return Date */}
//                       <td>
//                         {record.returnDate || (
//                           <span className="text-muted">
//                             Not returned
//                           </span>
//                         )}
//                       </td>

//                       {/* Status */}
//                       <td>

//                         {record.status === "Borrowed" ? (

//                           <span className="badge bg-warning text-dark">
//                             Borrowed
//                           </span>

//                         ) : (

//                           <span className="badge bg-success">
//                             Returned
//                           </span>

//                         )}

//                       </td>

//                       {/* Action */}
//                       <td>

//                         {record.status === "Borrowed" ? (

//                           <button
//                             className="btn btn-sm btn-success"
//                             onClick={() =>
//                               handleReturnBook(record.id)
//                             }
//                           >
//                             Return
//                           </button>

//                         ) : (

//                           <span className="text-success fw-semibold">
//                             Completed
//                           </span>

//                         )}

//                       </td>

//                     </tr>

//                   ))

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Borrow;