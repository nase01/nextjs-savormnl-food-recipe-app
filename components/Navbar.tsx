'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter  } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false);
  
  return (
    <nav className="flex-center fixed top-0 z-50 w-full border-b-2 
      border-orange bg-orange py-5 text-white">
      <div className="flex-between mx-auto w-full max-w-screen-2xl 
      px-6 xs:px-8 sm:px-16">
        <Link className="flex gap-1 align-middle" href="/">
          <Image
            src='/logo.png'
            width={36}
            height={36}
            alt='logo'
          />
					<h2 className="mt-1 text-2xl">SavorMNL</h2>
				</Link>
        {session?.user? (
          <div className='flex relative text-black-300'> 
            <div className='flex'>
              <Image
                src={session?.user?.image || '/user-svgrepo-com.svg'}
                width={36}
                height={36}
                className='avatar-img border-orange hover:border-white  cursor-pointer'
                alt='user'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

              {toggleDropdown && (
                <div className='absolute right-0 top-full mt-1 w-full  rounded-lg bg-white min-w-[250px] flex flex-col gap-2'>
                  <div className='p-4 flex flex-between w-full gap-2 border-b-2 border-b-gray-100'>
                    <Image
                      src={session?.user?.image || '/user-svgrepo-com.svg'}
                      width={48}
                      height={48}
                      className='avatar-img'
                      alt='user'
                    />
                    <div className="w-full align-middle">
                      <div className='text-lg line-clamp-1'>{session?.user?.name}</div>
                      <div className='text-sm -mt-2 text-grey-200 line-clamp-1'>{session?.user?.email} </div>
                    </div>
                  </div>
                  <div className='pb-3 px-4'>
                    <button
                      type='button'
                      onClick={() => {
                        router.push('/favorites');
                        setToggleDropdown(false)
                      }}
                      className='hover:text-orange font-medium my-3 flex gap-2'
                    >
                      <Image
                        src={'/hearth-svgrepo-com.svg'}
                        width={20}
                        height={20}
                        alt='hearth'
                      />
                      My Favorites
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                      }}
                      className='hover:text-orange font-medium my-1 flex gap-2'
                    >
                      <Image
                        src={'/sign-out-svgrepo-com.svg'}
                        width={20}
                        height={20}
                        alt='hearth'
                      />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
            status === "loading" ? (
              <div className="w-[36px] h-[36px] rounded-full bg-gray-300 animate-pulse cursor-pointer"></div>
            ) : (
              <Button type="button" className="h-[36px] rounded-full" variant="outline" onClick={() => signIn() } >Sign-In</Button>
            )
        )}
      </div>
    </nav>
  )
}

export default Navbar