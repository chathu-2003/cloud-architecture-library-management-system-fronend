import React from "react";

function Dashboard() {
  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Library Dashboard</h2>
        <p className="text-muted">
          Welcome to the Library Management System
        </p>
      </div>

      <div className="row g-4">
        {/* Total Books */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Books</h6>
              <h2 className="fw-bold">0</h2>
              <p className="mb-0 text-muted">
                Books available in library
              </p>
            </div>
          </div>
        </div>

        {/* Total Members */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Members</h6>
              <h2 className="fw-bold">0</h2>
              <p className="mb-0 text-muted">
                Registered library members
              </p>
            </div>
          </div>
        </div>

        {/* Borrowed Books */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Borrowed Books</h6>
              <h2 className="fw-bold">0</h2>
              <p className="mb-0 text-muted">
                Currently borrowed books
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3">Quick Actions</h4>

        <div className="d-flex gap-2 flex-wrap">
          <a href="/books" className="btn btn-dark">
            Add Book
          </a>

          <a href="/members" className="btn btn-outline-dark">
            Add Member
          </a>

          <a href="/borrow" className="btn btn-outline-dark">
            Borrow Book
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;