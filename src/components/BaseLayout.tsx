import { useEffect, useState } from "react";
import { me, logout } from "../client/auth";
import { useNavigate } from "react-router-dom";
import { User } from "../domain/user";

function BaseLayout({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate();
  
  useEffect(() => {
    me().then(user => setUser(user))
  }, [])

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <p className="read-the-docs">
            Hello, {user?.name}
          </p>
        </div>
        <div>
          <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
        </div>
      </div>
      <div className='mx-auto col-md-6 col-12 bg-light shadow rounded p-4'>
        {children}
      </div>
    </>
  )
}

export default BaseLayout;