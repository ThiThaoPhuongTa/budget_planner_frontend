import { Link } from "react-router-dom"

function Login() {

  return (
    <>
      <div className="card center mx-auto bg-base-200/90 shadow-xl" style={{ width: "18rem" }}>
        <div className="card-body items-center text-center">
          <h5 className="card-title">Buddget Planner</h5>
          <p className="card-text">Login to create plan for monthly budget</p>
          <div className="card-actions">
            <Link className="btn btn-primary" to="http://localhost:8080/oauth2/authorization/google">Login with Google</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
