import React from "react";
import {
  BookOpen,
  Users,
  BookMarked,
  PlusCircle,
  UserPlus,
  ArrowLeftRight,
  Search,
  Activity,
  User,
} from "lucide-react";

/* ---------------------------------------------
   NAVBAR
--------------------------------------------- */
function Navbar() {
  return (
    <nav className="dc-navbar">
      <div className="dc-navbar-inner">
        <div className="dc-navbar-brand">DASHBOARD</div>
        <div className="dc-navbar-icons">
          <button className="dc-icon-btn" aria-label="Search">
            <Search size={17} strokeWidth={2} />
          </button>
          <button className="dc-icon-btn" aria-label="Activity">
            <Activity size={17} strokeWidth={2} />
          </button>
          <button className="dc-avatar-btn" aria-label="Profile">
            <User size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------------------
   FOOTER
--------------------------------------------- */
function Footer() {
  return (
    <footer className="dc-footer">
      <div className="dc-footer-inner">
        <span>© {new Date().getFullYear()} DC Library Management</span>
        <div className="dc-footer-links">
          <a href="/books">Books</a>
          <a href="/members">Members</a>
          <a href="/borrow">Borrow</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------
   DASHBOARD CONTENT (unchanged, simple content)
--------------------------------------------- */
function Dashboard() {
  const stats = [
    {
      label: "Total Books",
      value: 0,
      caption: "Books available in library",
      icon: BookOpen,
      spine: "#2F4538",
    },
    {
      label: "Total Members",
      value: 0,
      caption: "Registered library members",
      icon: Users,
      spine: "#B08D57",
    },
    {
      label: "Borrowed Books",
      value: 0,
      caption: "Currently borrowed books",
      icon: BookMarked,
      spine: "#7A2E2E",
    },
  ];

  const actions = [
    { label: "Add Book", href: "/books", icon: PlusCircle, primary: true },
    { label: "Add Member", href: "/members", icon: UserPlus, primary: false },
    { label: "Borrow Book", href: "/borrow", icon: ArrowLeftRight, primary: false },
  ];

  return (
    <div className="lib-dashboard container py-4">
      <div className="lib-header mb-4">
        <div className="lib-eyebrow">Library System</div>
        <h2 className="lib-title">
          <BookOpen size={26} strokeWidth={2} color="#2F4538" />
          DC Library Management
        </h2>
        <p className="lib-subtitle mb-0">
          Welcome to the Library Management System
        </p>
      </div>

      <div className="row g-4">
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

      <div className="mt-5">
        <h4 className="lib-actions-title mb-3">Quick Actions</h4>
        <div className="d-flex gap-2 flex-wrap">
          {actions.map(({ label, href, icon: Icon, primary }) => (
            <a
              key={label}
              href={href}
              className={`lib-btn ${primary ? "lib-btn-primary" : "lib-btn-outline"}`}
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   APP (Navbar + Dashboard + Footer)
--------------------------------------------- */
function App() {
  return (
    <div className="dc-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .dc-app {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #F7F3E9;
        }

        /* ---------- NAVBAR ---------- */
        .dc-navbar {
          background: linear-gradient(90deg, #171A2E 0%, #1B1F3B 100%);
          position: relative;
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        }

        .dc-navbar::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3D8BFF, #7B5CFF, #3D8BFF);
        }

        .dc-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dc-navbar-brand {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #E7E9F5;
        }

        .dc-navbar-icons {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .dc-icon-btn {
          background: transparent;
          border: none;
          color: #C7CBE8;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .dc-icon-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #ffffff;
        }

        .dc-avatar-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3D8BFF, #7B5CFF);
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ---------- MAIN CONTENT (spacer to push footer down) ---------- */
        .dc-main {
          flex: 1;
        }

        /* ---------- FOOTER ---------- */
        .dc-footer {
          background: linear-gradient(90deg, #171A2E 0%, #1B1F3B 100%);
          margin-top: 3rem;
        }

        .dc-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.6rem;
          color: #9CA0C4;
          font-size: 0.85rem;
        }

        .dc-footer-links {
          display: flex;
          gap: 1.25rem;
        }

        .dc-footer-links a {
          color: #C7CBE8;
          text-decoration: none;
        }

        .dc-footer-links a:hover {
          color: #ffffff;
        }

        /* ---------- LIBRARY DASHBOARD (unchanged styling) ---------- */
        .lib-dashboard { color: #2B2620; }

        .lib-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B08D57;
          margin-bottom: 0.35rem;
        }

        .lib-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 2.1rem;
          color: #1F2A22;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.25rem;
        }

        .lib-subtitle { color: #6B6155; font-size: 0.98rem; }

        .lib-header {
          border-bottom: 1px solid #E4DCCB;
          padding-bottom: 1.25rem;
        }

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
          font-size: 2.3rem;
          font-weight: 600;
          color: #1F2A22;
          line-height: 1.1;
          margin-bottom: 0.3rem;
        }

        .lib-card-caption { color: #9C927F; font-size: 0.86rem; margin: 0; }

        .lib-actions-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 1.3rem;
          color: #1F2A22;
        }

        .lib-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.1rem;
          border-radius: 5px;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid #2F4538;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .lib-btn-primary { background: #2F4538; color: #FBF9F4; }
        .lib-btn-primary:hover { background: #24352C; color: #FBF9F4; }
        .lib-btn-outline { background: transparent; color: #2F4538; }
        .lib-btn-outline:hover { background: #2F4538; color: #FBF9F4; }
      `}</style>

      <Navbar />
      <main className="dc-main">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;