
import { FC } from "react";
import { BsSearch } from "react-icons/bs";

const Search : FC = () => {
    return (
        <div className="search">
            <BsSearch />
            <input className="search-input" placeholder="Search..." />
            <div className="tag">address</div>
        </div>
    )
}

export default Search;