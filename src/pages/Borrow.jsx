import React, { useState } from "react";
import {
  ArrowLeftRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  Search,
  Undo2,
  X,
  Save,
} from "lucide-react";

function Borrow() {
  const [borrowRecords, setBorrowRecords] = useState([
    {
      id: 1,
      book: "Atomic Habits",
      member: "Kasun Perera",
      borrowDate: "2026-08-15",
      dueDate: "2026-08-22",
      returnDate: "",
      status: "Borrowed",
    },
    {
      id: 2,
      book: "Clean Code",
      member: "Nimali Fernando",
      borrowDate: "2026-08-10",
      dueDate: "2026-08-17",
      returnDate: "2026-08-16",
      status: "Returned",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [newBorrow, setNewBorrow] = useState({
    book: "",
    member: "",
    borrowDate: "",
    dueDate: "",
  });

  const books = [
    "Clean Code",
    "The Pragmatic Programmer",
    "Atomic Habits",
    "Introduction to Algorithms",
    "Java Programming",
    "Database Systems",
    "Cloud Computing",
  ];

  const members = [
    "Kasun Perera",
    "Nimali Fernando",
    "Amal Silva",
    "Chamara Perera",
    "Tharushi Fernando",
  ];

  const handleChange = (e) => {
    setNewBorrow({
      ...newBorrow,
      [e.target.name]: e.target.value,
    });
  };

  const handleBorrowBook = (e) => {
    e.preventDefault();

    if (
      !newBorrow.book ||
      !newBorrow.member ||
      !newBorrow.borrowDate ||
      !newBorrow.dueDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (newBorrow.dueDate < newBorrow.borrowDate) {
      alert("Due date cannot be before the borrow date.");
      return;
    }

    // prevent the same book being borrowed twice at once while still out
    const alreadyBorrowed = borrowRecords.some(
      (record) =>
        record.book === newBorrow.book && record.status === "Borrowed"
    );

    if (alreadyBorrowed) {
      alert(`"${newBorrow.book}" is already borrowed and not yet returned.`);
      return;
    }

    const newRecord = {
      id: Date.now(),
      book: newBorrow.book,
      member: newBorrow.member,
      borrowDate: newBorrow.borrowDate,
      dueDate: newBorrow.dueDate,
      returnDate: "",
      status: "Borrowed",
    };

    setBorrowRecords([...borrowRecords, newRecord]);

    setNewBorrow({
      book: "",
      member: "",
      borrowDate: "",
      dueDate: "",
    });

    setShowForm(false);
  };

  const handleReturnBook = (id) => {
    const today = new Date().toISOString().split("T")[0];

    setBorrowRecords(
      borrowRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              returnDate: today,
              status: "Returned",
            }
          : record
      )
    );
  };

  const filteredRecords = borrowRecords.filter((record) => {
    const matchesSearch =
      record.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.member.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || record.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalBorrowed = borrowRecords.filter(
    (record) => record.status === "Borrowed"
  ).length;

  const totalReturned = borrowRecords.filter(
    (record) => record.status === "Returned"
  ).length;

  const totalRecords = borrowRecords.length;

  const stats = [
    {
      label: "Total Transactions",
      value: totalRecords,
      caption: "Borrowing records",
      icon: ClipboardList,
      spine: "#2F4538",
    },
    {
      label: "Currently Borrowed",
      value: totalBorrowed,
      caption: "Books currently borrowed",
      icon: Clock,
      spine: "#B08D57",
    },
    {
      label: "Returned Books",
      value: totalReturned,
      caption: "Successfully returned",
      icon: CheckCircle2,
      spine: "#3E7A4B",
    },
  ];

  return (
    <div className="lib-borrow container-fluid py-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        .lib-borrow {
          font-family: 'Inter', sans-serif;
          color: #2B2620;
        }

        .lib-borrow-header-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.85rem;
          color: #1F2A22;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.2rem;
        }

        .lib-borrow-header-sub {
          color: #8A7F6E;
          font-size: 0.95rem;
        }

        .lib-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.1rem;
          border-radius: 5px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #2F4538;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .lib-btn-primary {
          background: #2F4538;
          color: #FBF9F4;
        }
        .lib-btn-primary:hover { background: #24352C; }

        .lib-btn-outline {
          background: transparent;
          color: #6B6155;
          border-color: #D8CFBC;
        }
        .lib-btn-outline:hover {
          background: #F1EBDB;
          color: #2B2620;
        }

        .lib-btn-return {
          background: transparent;
          color: #3E7A4B;
          border-color: #C9DFC9;
          padding: 0.32rem 0.7rem;
          font-size: 0.8rem;
        }
        .lib-btn-return:hover {
          background: #3E7A4B;
          color: #FBF9F4;
        }

        /* ---- stat cards ---- */
        .lib-card {
          position: relative;
          background: #FBF9F4;
          border: 1px solid #E4DCCB;
          border-radius: 6px;
          padding: 1.35rem 1.35rem 1.35rem 1.6rem;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .lib-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(43, 38, 32, 0.08);
        }
        .lib-card-spine {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 6px;
        }
        .lib-card-icon {
          width: 34px; height: 34px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.85rem;
        }
        .lib-card-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #8A7F6E;
          margin-bottom: 0.2rem;
        }
        .lib-card-value {
          font-family: 'Fraunces', serif;
          font-size: 2.1rem;
          font-weight: 600;
          color: #1F2A22;
          line-height: 1.1;
          margin-bottom: 0.3rem;
        }
        .lib-card-caption { color: #9C927F; font-size: 0.86rem; margin: 0; }

        /* ---- panel ---- */
        .lib-panel {
          background: #FBF9F4;
          border: 1px solid #E4DCCB;
          border-radius: 8px;
        }

        .lib-panel-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: #1F2A22;
        }

        .lib-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #6B6155;
          margin-bottom: 0.3rem;
        }

        .lib-input, .lib-select {
          width: 100%;
          background: #FFFEFB;
          border: 1px solid #DDD4C0;
          border-radius: 5px;
          padding: 0.55rem 0.75rem;
          font-size: 0.92rem;
          color: #2B2620;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .lib-input:focus, .lib-select:focus { border-color: #B08D57; }
        .lib-input::placeholder { color: #B3A996; }

        .lib-search-wrap { position: relative; }
        .lib-search-wrap svg {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: #B3A996;
        }
        .lib-search-wrap input { padding-left: 2.2rem; }

        .lib-count-badge {
          background: #2F4538;
          color: #FBF9F4;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
        }

        .lib-table { width: 100%; border-collapse: collapse; }

        .lib-table thead th {
          text-align: left;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #8A7F6E;
          padding: 0.6rem 0.9rem;
          border-bottom: 1px solid #E4DCCB;
          background: #F4EFE3;
        }

        .lib-table tbody td {
          padding: 0.8rem 0.9rem;
          border-bottom: 1px solid #EFE9D9;
          font-size: 0.92rem;
          vertical-align: middle;
        }

        .lib-table tbody tr:hover { background: #F7F3E9; }

        .lib-book-title { font-weight: 600; color: #1F2A22; }
        .lib-muted { color: #B3A996; }

        .lib-status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.22rem 0.65rem;
          border-radius: 20px;
        }
        .lib-status::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .lib-status-borrowed { background: #F5E9DD; color: #8A5A2B; }
        .lib-status-borrowed::before { background: #B08D57; }
        .lib-status-returned { background: #E7EFE3; color: #2F4538; }
        .lib-status-returned::before { background: #3E7A4B; }

        .lib-completed {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #3E7A4B;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .lib-empty { text-align: center; padding: 3rem 1rem; color: #9C927F; }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="lib-borrow-header-title">
            <ArrowLeftRight size={24} strokeWidth={2} color="#2F4538" />
            Borrow &amp; Return
          </h2>
          <p className="lib-borrow-header-sub mb-0">
            Manage borrowed and returned books
          </p>
        </div>

        <button
          className="lib-btn lib-btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <ArrowLeftRight size={16} strokeWidth={2.3} />
          Borrow Book
        </button>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        {stats.map(({ label, value, caption, icon: Icon, spine }) => (
          <div className="col-md-4" key={label}>
            <div className="lib-card">
              <div className="lib-card-spine" style={{ background: spine }} />
              <div className="lib-card-icon" style={{ background: `${spine}1A` }}>
                <Icon size={18} color={spine} strokeWidth={2} />
              </div>
              <div className="lib-card-label">{label}</div>
              <div className="lib-card-value">{value}</div>
              <p className="lib-card-caption">{caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Borrow Form */}
      {showForm && (
        <div className="lib-panel mb-4">
          <div className="p-4">
            <h5 className="lib-panel-title mb-4">Borrow a Book</h5>

            <form onSubmit={handleBorrowBook}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="lib-label">Select Book</div>
                  <select
                    name="book"
                    className="lib-select"
                    value={newBorrow.book}
                    onChange={handleChange}
                  >
                    <option value="">Select a book</option>
                    {books.map((book, index) => (
                      <option key={index} value={book}>
                        {book}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Select Member</div>
                  <select
                    name="member"
                    className="lib-select"
                    value={newBorrow.member}
                    onChange={handleChange}
                  >
                    <option value="">Select a member</option>
                    {members.map((member, index) => (
                      <option key={index} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Borrow Date</div>
                  <input
                    type="date"
                    name="borrowDate"
                    className="lib-input"
                    value={newBorrow.borrowDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Due Date</div>
                  <input
                    type="date"
                    name="dueDate"
                    className="lib-input"
                    value={newBorrow.dueDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 d-flex gap-2 mt-2">
                  <button type="submit" className="lib-btn lib-btn-primary">
                    <Save size={16} strokeWidth={2.3} />
                    Confirm Borrow
                  </button>

                  <button
                    type="button"
                    className="lib-btn lib-btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    <X size={16} strokeWidth={2.3} />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="lib-panel mb-4">
        <div className="p-4">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="lib-search-wrap">
                <Search size={16} strokeWidth={2} />
                <input
                  type="text"
                  className="lib-input"
                  placeholder="Search by book or member..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                className="lib-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Transactions</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Records */}
      <div className="lib-panel">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="lib-panel-title mb-0">Borrowing Records</h5>
            <span className="lib-count-badge">
              {filteredRecords.length} Records
            </span>
          </div>

          <div className="table-responsive">
            <table className="lib-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="lib-empty">
                      No borrowing records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record, index) => (
                    <tr key={record.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="lib-book-title">{record.book}</div>
                      </td>

                      <td>{record.member}</td>

                      <td>{record.borrowDate}</td>

                      <td>{record.dueDate}</td>

                      <td>
                        {record.returnDate || (
                          <span className="lib-muted">Not returned</span>
                        )}
                      </td>

                      <td>
                        {record.status === "Borrowed" ? (
                          <span className="lib-status lib-status-borrowed">
                            Borrowed
                          </span>
                        ) : (
                          <span className="lib-status lib-status-returned">
                            Returned
                          </span>
                        )}
                      </td>

                      <td>
                        {record.status === "Borrowed" ? (
                          <button
                            className="lib-btn lib-btn-return"
                            onClick={() => handleReturnBook(record.id)}
                          >
                            <Undo2 size={14} strokeWidth={2} />
                            Return
                          </button>
                        ) : (
                          <span className="lib-completed">
                            <CheckCircle2 size={15} strokeWidth={2} />
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Borrow;