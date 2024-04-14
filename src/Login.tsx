function Login() {

  return (
    <>
      <div className="card center" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Buddget Planner</h5>
          <p className="card-text">Login to create plan for monthly budget</p>
        <a type="button" className="btn btn-primary" href="http://localhost:8080/oauth2/authorization/google">Login with Google</a>
      </div>
    </div>
    </>
  )
}

export default Login
