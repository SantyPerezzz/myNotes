function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Welcome to Notes App</h1>
      <p className="lead">Manage your notes easily and efficiently.</p>
      <a href="/notes" className="btn btn-primary mt-3">
        View Notes
      </a>
    </div>
  );
}

export default Home;
