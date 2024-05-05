import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, me } from "../client/auth";
import { User } from "../domain/user";
import BaseButton, { Variant } from "./BaseButton";

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
      <div className='flex justify-between'>
          <p>
            Hello, {user?.name}
          </p>
          <BaseButton handleClick={handleLogout} variant={Variant.Secondary}>Logout</BaseButton>
      </div>
      <div className='mt-2 mx-auto xl:w-1/2 w-full bg-base-200/90 shadow-lg rounded-box p-4'>
        {children}
      </div>
    </>
  )
}

export default BaseLayout;