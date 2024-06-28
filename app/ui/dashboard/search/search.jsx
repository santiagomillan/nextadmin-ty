"use client"
import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const Search = ({placeholder}) => {
  const searchParams = useSearchParams();
  const {replace} = useRouter()
  const pathname = usePathname()

  const handleSearch = (e)=>{
     const params = new URLSearchParams(searchParams);
     params.set('q', e.target.value)
     replace(`${pathname}?${params}`)
  }


 

  // params.set("test", "value")

  
  // console.log(pathname)
  // console.log(params)
    return (
      <div className={styles.container}>
        <MdSearch/>
        <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch}/>
      </div>
    )
}

export default Search
