import { BsSearch, BsX } from 'react-icons/bs'
import './SearchInput.less'

const SearchInput = ({ value, onChange }) => {

  return (
    <div className="search">
      <div className='icon-search'>
        <BsSearch size="16px" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
      />
      { value && 
        <div className="icon-close">
          <BsX size="20px" onClick={() => onChange({ target: { value: '' } })} /> 
        </div>
    }
    </div>
  )
}

export default SearchInput