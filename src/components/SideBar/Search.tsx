
import { FC, useState, useEffect } from "react";
import { useSigma } from "@react-sigma/core";
import { Attributes } from "graphology-types";
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import { NodeData } from "../../types";
import './Search.less'

const Search : FC<{ onSearch: (nodeId: string | null) => void }> = ({ onSearch }) => {
    const sigma = useSigma();
    const [isMore, setIsMore] = useState(false)
    const [isAddress, setIsAddress] = useState(true)
    const [isKind, setIsKind] = useState(false)
    const [isTag, setIsTag] = useState(false)
    const [address, setAddress] = useState('')
    const [kind, setKind] = useState('')
    const [tag, setTag] = useState('')
    const [values, setValues] = useState<Array<{ id: string; label: string }>>([]);
    const [selected, setSelected] = useState<string | null>(null);


    const defaultProps = {
        options: values,
        getOptionLabel: (option: { id: string; label: string}) => option.label,
    };

    const handleMore = () => {
        setIsMore(!isMore)
    }

    const refreshValues = () => {
        const newValues: Array<{ id: string; label: string}> = [];
        const lcSearch = address?.toLowerCase();
        if(address.length > 1) {
            sigma.getGraph().forEachNode((key: string, attributes: Attributes): void => {
                if(!attributes.hidden && attributes.label && attributes.label.toLowerCase().indexOf(lcSearch) === 0) {
                    newValues.push({ id: key, label: attributes.label });
                }
            })
        }
        setValues(newValues);
    }

    useEffect(() => refreshValues(), [address,kind,tag]);

    useEffect(() => {
        if(!selected) return;
        sigma.getGraph().setNodeAttribute(selected, "highlighted", true);
        const nodeDisplayData = sigma.getNodeDisplayData(selected);
        if(nodeDisplayData) {
            sigma.getCamera().animate(
                { ...nodeDisplayData, ratio: 0.05 },
                {
                    duration: 600,
                }
            )
        }
        return () => {
            sigma.getGraph().setNodeAttribute(selected, "highlighted", false);
        }
    }, [selected])
    
    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value;
        const valueItem = values.find((value) => value.label === searchString);
        if(valueItem) {
            const nodeElement = document.querySelector(`[data-node-id="${valueItem.id}"]`);
            setAddress(valueItem.label);
            setValues([]);
            setSelected(valueItem.id);
            onSearch(valueItem.id)
        } else {
            setSelected(null);
            onSearch(null);
            setAddress(searchString);
        }
    }

    return (
        <div className="search-panel">
            <div className="search-form">
                <BsSearch size="14px" />
                <input type="search" value={address} onChange={onAddressChange}  className="search-input" placeholder="Search..." list="nodes" />
                {/* <Autocomplete
                    {...defaultProps}
                    value={address}
                    onChange={(event: any, newValue: NodeData | null) => {
                        setAddress(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                    )}
                /> */}
                <div className={`tag ${isAddress ? 'active' : ''}`} onClick={() => setIsAddress(!isAddress)} >Address</div>
                <datalist id="nodes">
                    {values.map((value: { id: string; label: string }) => (
                    <option key={value.id} value={value.label}>
                        {value.label}
                    </option>
                    ))}
                </datalist>
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