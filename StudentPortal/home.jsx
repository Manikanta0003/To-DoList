export default function Home({ setIsLoggedIn }) {
  return (
    <div className="home-container">
      <h1>Welcome, Student 👋</h1>

      <div className="card">
        <p><strong>Name:</strong> Rahul Kumar</p>
        <p><strong>Branch:</strong> CSE</p>
        <p><strong>Semester:</strong> 4</p>
        <p><strong>CGPA:</strong> 8.5</p>
        <p><strong>Attendance:</strong> 92%</p>
      </div>

      <button className="logout" onClick={() => setIsLoggedIn(false)}>
        Logout
      </button>
    </div>
  );
}
