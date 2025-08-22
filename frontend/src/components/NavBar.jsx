import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const NavBar = () => {
  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-7xl px-5 py-10 md:p-10">
        <div className="flex items-center justify-between"> 
          <h1 className="text-[36px] font-bold text-blue-500 font-mono tracking-tight">
            <span className="block sm:hidden">DDN</span>
            <span className="hidden sm:block">Dunkin Do Notes</span></h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn bg-blue-500 border-none" >
              <PlusIcon className='size-5 text-white' />
              <span className='text-white'>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar


