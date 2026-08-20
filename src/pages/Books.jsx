import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  X,
  Save,
} from "lucide-react";

function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      isbn: "9780132350884",
      status: "Available",
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      category: "Programming",
      isbn: "9780135957059",
      status: "Available",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Development",
      isbn: "9780735211292",
      status: "Borrowed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
  });

  // search + filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.category ||
      !newBook.isbn
    ) {
      alert("Please fill all fields.");
      return;
    }

    const book = {
      id: Date.now(),
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
      isbn: newBook.isbn,
      status: "Available",
    };

    setBooks([...books, book]);

    setNewBook({
      title: "",
      author: "",
      category: "",
      isbn: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? {
              ...book,
              status:
                book.status === "Available" ? "Borrowed" : "Available",
            }
          : book
      )
    );
  };

  // unique category list derived from current data + form options,
  // so the filter dropdown always reflects real categories
  const categoryOptions = useMemo(() => {
    const base = [
      "Programming",
      "Database",
      "Networking",
      "Cloud Computing",
      "Self Development",
      "Business",
      "Science",
      "Other",
    ];
    const fromBooks = books.map((b) => b.category);
    return Array.from(new Set([...base, ...fromBooks]));
  }, [books]);

  // filtered list based on search term + category
  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        term === "" ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.toLowerCase().includes(term);

      const matchesCategory =
        categoryFilter === "All Categories" ||
        book.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, categoryFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All Categories");
  };

  return (
    <div className="lib-books container-fluid py-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        .lib-books {
          font-family: 'Inter', sans-serif;
          color: #2B2620;
        }

        .lib-books-header-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.85rem;
          color: #1F2A22;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.2rem;
        }

        .lib-books-header-sub {
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

        .lib-btn-danger {
          background: transparent;
          color: #7A2E2E;
          border-color: #E3C9C9;
          padding: 0.32rem 0.65rem;
          font-size: 0.8rem;
        }
        .lib-btn-danger:hover {
          background: #7A2E2E;
          color: #FBF9F4;
        }

        .lib-btn-status {
          background: transparent;
          color: #2F4538;
          border-color: #C9D6CC;
          padding: 0.32rem 0.65rem;
          font-size: 0.8rem;
        }
        .lib-btn-status:hover {
          background: #2F4538;
          color: #FBF9F4;
        }

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
        .lib-input:focus, .lib-select:focus {
          border-color: #B08D57;
        }
        .lib-input::placeholder { color: #B3A996; }

        .lib-search-wrap {
          position: relative;
        }
        .lib-search-wrap svg {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: #B3A996;
        }
        .lib-search-wrap input {
          padding-left: 2.2rem;
        }

        .lib-count-badge {
          background: #2F4538;
          color: #FBF9F4;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
        }

        .lib-clear-link {
          background: none;
          border: none;
          color: #B08D57;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }
        .lib-clear-link:hover {
          text-decoration: underline;
        }

        .lib-table {
          width: 100%;
          border-collapse: collapse;
        }

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

        .lib-table tbody tr:hover {
          background: #F7F3E9;
        }

        .lib-book-title {
          font-weight: 600;
          color: #1F2A22;
        }

        .lib-tag {
          display: inline-block;
          font-size: 0.76rem;
          padding: 0.22rem 0.6rem;
          border-radius: 20px;
          background: #F1EBDB;
          color: #6B5A3A;
          border: 1px solid #E4DCCB;
        }

        .lib-status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.22rem 0.65rem;
          border-radius: 20px;
          border: none;
          cursor: pointer;
        }

        .lib-status::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .lib-status-available {
          background: #E7EFE3;
          color: #2F4538;
        }
        .lib-status-available::before { background: #3E7A4B; }

        .lib-status-borrowed {
          background: #F5E9DD;
          color: #8A5A2B;
        }
        .lib-status-borrowed::before { background: #B08D57; }

        .lib-actions {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .lib-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #9C927F;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="lib-books-header-title">
            <BookOpen size={24} strokeWidth={2} color="#2F4538" />
            Books
          </h2>
          <p className="lib-books-header-sub mb-0">
            Manage all books in the library
          </p>
        </div>

        <button
          className="lib-btn lib-btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} strokeWidth={2.3} />
          Add Book
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && (
        <div className="lib-panel mb-4">
          <div className="p-4">
            <h5 className="lib-panel-title mb-4">Add New Book</h5>

            <form onSubmit={handleAddBook}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="lib-label">Book Title</div>
                  <input
                    type="text"
                    name="title"
                    className="lib-input"
                    placeholder="Enter book title"
                    value={newBook.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Author</div>
                  <input
                    type="text"
                    name="author"
                    className="lib-input"
                    placeholder="Enter author name"
                    value={newBook.author}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Category</div>
                  <select
                    name="category"
                    className="lib-select"
                    value={newBook.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="Programming">Programming</option>
                    <option value="Database">Database</option>
                    <option value="Networking">Networking</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Self Development">Self Development</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <div className="lib-label">ISBN</div>
                  <input
                    type="text"
                    name="isbn"
                    className="lib-input"
                    placeholder="Enter ISBN number"
                    value={newBook.isbn}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 d-flex gap-2 mt-2">
                  <button type="submit" className="lib-btn lib-btn-primary">
                    <Save size={16} strokeWidth={2.3} />
                    Save Book
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

      {/* Search */}
      <div className="lib-panel mb-4">
        <div className="p-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="lib-search-wrap">
                <Search size={16} strokeWidth={2} />
                <input
                  type="text"
                  className="lib-input"
                  placeholder="Search books by title, author or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                className="lib-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || categoryFilter !== "All Categories") && (
              <div className="col-12">
                <button
                  type="button"
                  className="lib-clear-link"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="lib-panel">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="lib-panel-title mb-0">All Books</h5>
            <span className="lib-count-badge">
              {filteredBooks.length} / {books.length} Books
            </span>
          </div>

          <div className="table-responsive">
            <table className="lib-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="lib-empty">
                      {books.length === 0
                        ? "No books available."
                        : "No books match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="lib-book-title">{book.title}</div>
                      </td>

                      <td>{book.author}</td>

                      <td>
                        <span className="lib-tag">{book.category}</span>
                      </td>

                      <td>{book.isbn}</td>

                      <td>
                        <button
                          type="button"
                          className={
                            book.status === "Available"
                              ? "lib-status lib-status-available"
                              : "lib-status lib-status-borrowed"
                          }
                          onClick={() => handleToggleStatus(book.id)}
                          title="Click to toggle status"
                        >
                          {book.status}
                        </button>
                      </td>

                      <td>
                        <div className="lib-actions">
                          <button
                            className="lib-btn lib-btn-danger"
                            onClick={() => handleDelete(book.id)}
                          >
                            <Trash2 size={14} strokeWidth={2} />
                            Delete
                          </button>
                        </div>
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

export default Books;