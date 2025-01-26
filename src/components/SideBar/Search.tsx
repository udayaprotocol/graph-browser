
import { FC, useState, useEffect } from "react";
import { useSigma } from "@react-sigma/core";
import { Attributes } from "graphology-types";
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";
import { Select } from "antd";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NodeData } from "../../types";
import './Search.less'

const kindOptions = [
    { label: 'Project', value: 'Project' },
    { label: 'User', value: 'User' },
]

const Search : FC<{ onSearch: (nodeId: string | null) => void }> = ({ onSearch }) => {
    const sigma = useSigma();
    const [isMore, setIsMore] = useState(false)
    const [isAddress, setIsAddress] = useState(true)
    const [isKind, setIsKind] = useState(false)
    const [isTag, setIsTag] = useState(false)
    const [address, setAddress] = useState<string | null>(null)
    const [kind, setKind] = useState<string | null>(null)
    const [tag, setTag] = useState('')
    const [values, setValues] = useState<Array<{ value: string; label: string }>>([]);
    const [selected, setSelected] = useState<string | null>(null);

    // selected
    const handleAddressChange = (value: string) => {
        if (isAddress) {
            const searchString = value;            
            const valueItem = values.find((value) => value.value === searchString);
            if (valueItem) {
                setSelected(valueItem.value);
                onSearch(valueItem.value)
                setAddress(null);
            } else {
                setSelected(null);
                onSearch(null);
                setAddress(searchString);
            }
        }
    }

    const handleSearch = (value: string) => {
        console.log(`handleSearch ${value}`);
    }

    const handleKindChange = (value: string) => {
        setKind(value)
    }

    const handleMore = () => {
        setIsMore(!isMore)
    }

    const onKindTagChange = () => {
        const cur = !isKind
        setIsKind(cur)
        if(!cur){
            setKind(null)
        }
    }
    // const refreshValues = () => {
    //     const newValues: Array<{ id: string; label: string}> = [];
    //     const lcSearch = address?.toLowerCase();
    //     if(address.length > 1) {
    //         sigma.getGraph().forEachNode((key: string, attributes: Attributes): void => {
    //             console.log('node-attrs', attributes)
    //             const detail = attributes.detail
    //             console.log('detail==>', detail)
    //             if(!attributes.hidden && attributes.label && attributes.label.toLowerCase().indexOf(lcSearch) === 0) {
    //                 newValues.push({ id: key, label: attributes.label });
    //             }
    //         })
    //     }
    //     setValues(newValues);
    // }

    useEffect(() => {
        const newValues: Array<{ value: string; label: string}> = [];
        sigma.getGraph().forEachNode((key: string, attributes: Attributes): void => {
            if (attributes.label) {
                if (isKind) {
                    if (kind === attributes.category) {
                        newValues.push({ value: key, label: attributes.label });
                    }
                } else {
                    newValues.push({ value: key, label: attributes.label });
                }
            }
        })
        setValues(newValues)
    }, [isKind, kind])

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
    
    return (
        <div className="search-panel">
            <div className="search-form">
                <BsSearch size="14px" />
                <Select 
                    className="k-search"
                    suffixIcon={null}
                    value={address}
                    optionFilterProp="label"
                    onSearch={handleSearch}
                    onChange={handleAddressChange}
                    showSearch 
                    options={values}
                    placeholder="Search..." 
                />
                <div className={`tag ${isAddress ? 'active' : ''}`} onClick={() => setIsAddress(!isAddress)} >LamportID</div>
            </div>
            {
                isMore && (
                    <>
                        <div className="search-more">
                            <Select 
                                className="k-search"
                                suffixIcon={null}
                                value={kind}
                                onChange={handleKindChange}
                                options={kindOptions}
                                placeholder="Kind..." 
                            />
                            <div className={`tag ${isKind ? 'active' : ''}`} onClick={() => onKindTagChange()} >Kind</div>
                        </div>
                    </>
                )
            }
            <div className="more-btn" onClick={handleMore}>
                <BsChevronCompactDown className={`icon-more ${isMore ? 'rotateAnimation' : 'sizeChange'}`} style={{fontWeight: 500, fontSize: 24}} />
            </div>
        </div>
    )
}

export default Search;