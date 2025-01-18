
import { FC, useState } from "react";
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";
import './Search.less'

const Search : FC = () => {
    const [isMore, setIsMore] = useState(false)
    const [isAddress, setIsAddress] = useState(true)
    const [isKind, setIsKind] = useState(false)
    const [isTag, setIsTag] = useState(false)


    const handleMore = () => {
        setIsMore(!isMore)
    }

    return (
        <div className="search-panel">
            <div className="search-form">
                <BsSearch size="14px" />
                <input className="search-input" placeholder="Search..." />
                <div className={`tag ${isAddress ? 'active' : ''}`} onClick={() => setIsAddress(!isAddress)} >Address</div>
            </div>
            {
                isMore && (
                    [
                        <div className="search-more">
                            {/* <BsSearch size="14px" /> */}
                            <input className="search-input" placeholder="Kind..." />
                            <div className={`tag ${isKind ? 'active' : ''}`} onClick={() => setIsKind(!isKind)} >Kind</div>
                        </div>,
                        <div className="search-more">
                            {/* <BsSearch size="14px" /> */}
                            <input className="search-input" placeholder="Tag..." />
                            <div className={`tag ${isTag ? 'active' : ''}`} onClick={() => setIsTag(!isTag)}>Tag</div>
                        </div>
                    ]
                )
            }
            <div className="more-btn" onClick={handleMore}>
                <BsChevronCompactDown className={`icon-more ${isMore ? 'rotateAnimation' : 'sizeChange'}`} style={{fontWeight: 500, fontSize: 24}} />
            </div>
        </div>
    )
}

export default Search;