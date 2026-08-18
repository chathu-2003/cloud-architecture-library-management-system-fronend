import React, { useState } from "react";
import {
  Users,
  UserCheck,
  GraduationCap,
  UserPlus,
  Search,
  Trash2,
  X,
  Save,
} from "lucide-react";

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

  const stats = [
    {
      label: "Total Members",
      value: members.length,
      caption: "Registered members",
      icon: Users,
      spine: "#2F4538",
    },
    {
      label: "Active Members",
      value: members.filter((m) => m.status === "Active").length,
      caption: "Currently active",
      icon: UserCheck,
      spine: "#3E7A4B",
    },
    {
      label: "Students",
      value: members.filter((m) => m.type === "Student").length,
      caption: "Student members",
      icon: GraduationCap,
      spine: "#B08D57",
    },
  ];

  return (
    <div className="lib-members container-fluid py-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        .lib-members {
          font-family: 'Inter', sans-serif;
          color: #2B2620;
        }

        .lib-members-header-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.85rem;
          color: #1F2A22;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.2rem;
        }

        .lib-members-header-sub {
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

        .lib-member-name { font-weight: 600; color: #1F2A22; }
        .lib-member-email { color: #9C927F; font-size: 0.82rem; }

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
        }
        .lib-status::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .lib-status-active { background: #E7EFE3; color: #2F4538; }
        .lib-status-active::before { background: #3E7A4B; }
        .lib-status-inactive { background: #EFEBE3; color: #7A7160; }
        .lib-status-inactive::before { background: #A89E8B; }

        .lib-empty { text-align: center; padding: 3rem 1rem; color: #9C927F; }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="lib-members-header-title">
            <Users size={24} strokeWidth={2} color="#2F4538" />
            Members
          </h2>
          <p className="lib-members-header-sub mb-0">
            Manage registered library members
          </p>
        </div>

        <button
          className="lib-btn lib-btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <UserPlus size={16} strokeWidth={2.3} />
          Add Member
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

      {/* Add Member Form */}
      {showForm && (
        <div className="lib-panel mb-4">
          <div className="p-4">
            <h5 className="lib-panel-title mb-4">Add New Member</h5>

            <form onSubmit={handleAddMember}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="lib-label">Full Name</div>
                  <input
                    type="text"
                    name="name"
                    className="lib-input"
                    placeholder="Enter member name"
                    value={newMember.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Email Address</div>
                  <input
                    type="email"
                    name="email"
                    className="lib-input"
                    placeholder="Enter email address"
                    value={newMember.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Phone Number</div>
                  <input
                    type="tel"
                    name="phone"
                    className="lib-input"
                    placeholder="Enter phone number"
                    value={newMember.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <div className="lib-label">Member Type</div>
                  <select
                    name="type"
                    className="lib-select"
                    value={newMember.type}
                    onChange={handleChange}
                  >
                    <option value="">Select member type</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>

                <div className="col-12 d-flex gap-2 mt-2">
                  <button type="submit" className="lib-btn lib-btn-primary">
                    <Save size={16} strokeWidth={2.3} />
                    Save Member
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

      {/* Search and Filter */}
      <div className="lib-panel mb-4">
        <div className="p-4">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="lib-search-wrap">
                <Search size={16} strokeWidth={2} />
                <input
                  type="text"
                  className="lib-input"
                  placeholder="Search by name, email or membership ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                className="lib-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Members</option>
                <option value="Student">Students</option>
                <option value="Staff">Staff</option>
                <option value="Guest">Guests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="lib-panel">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="lib-panel-title mb-0">All Members</h5>
            <span className="lib-count-badge">
              {filteredMembers.length} Members
            </span>
          </div>

          <div className="table-responsive">
            <table className="lib-table">
              <thead>
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
                    <td colSpan="7" className="lib-empty">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="lib-member-name">{member.name}</div>
                        <div className="lib-member-email">{member.email}</div>
                      </td>

                      <td>
                        <span className="lib-tag">{member.membershipId}</span>
                      </td>

                      <td>{member.phone}</td>

                      <td>
                        <span className="lib-tag">{member.type}</span>
                      </td>

                      <td>
                        {member.status === "Active" ? (
                          <span className="lib-status lib-status-active">
                            Active
                          </span>
                        ) : (
                          <span className="lib-status lib-status-inactive">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          className="lib-btn lib-btn-danger"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 size={14} strokeWidth={2} />
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