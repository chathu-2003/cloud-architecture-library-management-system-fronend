import React, { useState } from "react";

function Members() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      phone: "0771234567",
      membershipId: "MEM001",
      type: "Student",
      status: "Active",
    },
    {
      id: 2,
      name: "Nimali Fernando",
      email: "nimali@gmail.com",
      phone: "0712345678",
      membershipId: "MEM002",
      type: "Student",
      status: "Active",
    },
    {
      id: 3,
      name: "Amal Silva",
      email: "amal@gmail.com",
      phone: "0759876543",
      membershipId: "MEM003",
      type: "Staff",
      status: "Inactive",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterType, setFilterType] = useState("All");

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  // Add new member
  const handleAddMember = (e) => {
    e.preventDefault();

    if (
      !newMember.name ||
      !newMember.email ||
      !newMember.phone ||
      !newMember.type
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newMemberData = {
      id: members.length + 1,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      membershipId: `MEM${String(members.length + 1).padStart(3, "0")}`,
      type: newMember.type,
      status: "Active",
    };

    setMembers([...members, newMemberData]);

    setNewMember({
      name: "",
      email: "",
      phone: "",
      type: "",
    });

    setShowForm(false);
  };

  // Delete member
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (confirmDelete) {
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "All" || member.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Members</h2>

          <p className="text-muted mb-0">
            Manage registered library members
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Member
        </button>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">

        {/* Total Members */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <h6 className="text-muted">
                Total Members
              </h6>

              <h2 className="fw-bold">
                {members.length}
              </h2>

              <p className="text-muted mb-0">
                Registered members
              </p>

            </div>
          </div>
        </div>

        {/* Active Members */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <h6 className="text-muted">
                Active Members
              </h6>

              <h2 className="fw-bold text-success">
                {
                  members.filter(
                    (member) => member.status === "Active"
                  ).length
                }
              </h2>

              <p className="text-muted mb-0">
                Currently active
              </p>

            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <h6 className="text-muted">
                Students
              </h6>

              <h2 className="fw-bold">
                {
                  members.filter(
                    (member) => member.type === "Student"
                  ).length
                }
              </h2>

              <p className="text-muted mb-0">
                Student members
              </p>

            </div>
          </div>
        </div>

      </div>

      {/* Add Member Form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-4">
              Add New Member
            </h5>

            <form onSubmit={handleAddMember}>

              <div className="row g-3">

                {/* Name */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter member name"
                    value={newMember.name}
                    onChange={handleChange}
                  />

                </div>

                {/* Email */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={newMember.email}
                    onChange={handleChange}
                  />

                </div>

                {/* Phone */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={newMember.phone}
                    onChange={handleChange}
                  />

                </div>

                {/* Member Type */}
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Member Type
                  </label>

                  <select
                    name="type"
                    className="form-select"
                    value={newMember.type}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select member type
                    </option>

                    <option value="Student">
                      Student
                    </option>

                    <option value="Staff">
                      Staff
                    </option>

                    <option value="Guest">
                      Guest
                    </option>

                  </select>

                </div>

                {/* Buttons */}
                <div className="col-12">

                  <button
                    type="submit"
                    className="btn btn-dark me-2"
                  >
                    Save Member
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* Search and Filter */}
      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}
            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email or membership ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

            {/* Filter */}
            <div className="col-md-4">

              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >

                <option value="All">
                  All Members
                </option>

                <option value="Student">
                  Students
                </option>

                <option value="Staff">
                  Staff
                </option>

                <option value="Guest">
                  Guests
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Members Table */}
      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              All Members
            </h5>

            <span className="badge bg-dark">
              {filteredMembers.length} Members
            </span>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>#</th>

                  <th>Member</th>

                  <th>Membership ID</th>

                  <th>Phone</th>

                  <th>Type</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredMembers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5 text-muted"
                    >
                      No members found.
                    </td>

                  </tr>

                ) : (

                  filteredMembers.map((member, index) => (

                    <tr key={member.id}>

                      {/* Number */}
                      <td>
                        {index + 1}
                      </td>

                      {/* Member */}
                      <td>

                        <div className="fw-semibold">
                          {member.name}
                        </div>

                        <small className="text-muted">
                          {member.email}
                        </small>

                      </td>

                      {/* Membership ID */}
                      <td>

                        <span className="badge bg-light text-dark border">
                          {member.membershipId}
                        </span>

                      </td>

                      {/* Phone */}
                      <td>
                        {member.phone}
                      </td>

                      {/* Type */}
                      <td>

                        <span className="badge bg-light text-dark border">
                          {member.type}
                        </span>

                      </td>

                      {/* Status */}
                      <td>

                        {member.status === "Active" ? (

                          <span className="badge bg-success">
                            Active
                          </span>

                        ) : (

                          <span className="badge bg-secondary">
                            Inactive
                          </span>

                        )}

                      </td>

                      {/* Action */}
                      <td>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(member.id)
                          }
                        >
                          Delete
                        </button>

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

export default Members;