import React, {useState, useEffect} from 'react';
import { supabase } from './supabaseClient.js';

function FormField()
{
    // preloading / initializing each form field
    const [equipmentName, setEquipmentName] = useState('');
    const [makeInput, setMakeInput] = useState('');
    const [modelVal, setModelVal] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [groupingInput, setGroupingInput] = useState('');
    const [idTagInput, setIdTagInput] = useState('');
    const [countInput, setCountInput] = useState('1');
    const [ownerInput, setOwnerInput] = useState('');
    const [serialNumInput, setSerialNumInput] = useState('');
    const [statusInput, setStatusInput] = useState('Functional');
    const [notesInput, setNotesInput] = useState('');

    // states for storing previous equipment options
    const [equipmentList, setEquipmentList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [groupingList, setGroupingList] = useState([]);
    const [ownerList, setOwnerList] = useState([]);
    const [statusList, setStatusList] = useState([]);

    // states for toggleing menus / text boxes
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    const [makeOpen, setMakeOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [groupingOpen, setGroupingOpen] = useState(false);
    const [ownerOpen, setOwnerOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    // useEffect is background processes / brains that don't run dependant on / with the rendering
    useEffect(() => {

        // asynchronous so jsx doesnt wait for supabase
        async function fetchAllPastData() {
            const { data, error } = await supabase
                .from('Equipment')
                .select('Equipment, Make, Model, Location, Grouping, Owner, Status');

            if (error) {
                console.log('Loading error:  ', error.message);
            } else if (data) {

                // filter out doubles, remove empties, sort alphabetically.
                setEquipmentList([...new Set(data.map(i => i.Equipment))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setMakeList([...new Set(data.map(i => i.Make))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setModelList([...new Set(data.map(i => i.Model))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setLocationList([...new Set(data.map(i => i.Location))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setGroupingList([...new Set(data.map(i => i.Grouping))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setOwnerList([...new Set(data.map(i => i.Owner))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setStatusList([...new Set(data.map(i => i.Status))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
            }
        }
        fetchAllPastData();
    }, []);

    // filter
    const filteredEquipment = equipmentList.filter(item =>
        item.toLowerCase().includes(equipmentName.toLowerCase())
    );

    // filter
    const filteredMakes = makeList.filter(item =>
        item.toLowerCase().includes(makeInput.toLowerCase())
    );

    // filter
    const filteredModels = modelList.filter(item =>
        item.toLowerCase().includes(modelVal.toLowerCase())
    );

    // filter. copy / pasted, so TODO check for errors
    const filteredLocations = locationList.filter(item =>
        item.toLowerCase().includes(locationInput.toLowerCase())
    );

    // filter. copy / pasted, so TODO check for errors
    const filteredGroupings = groupingList.filter(item =>
        item.toLowerCase().includes(groupingInput.toLowerCase())
    );

    // filter. copy / pasted, so TODO check for errors
    const filteredOwners = ownerList.filter(item =>
        item.toLowerCase().includes(ownerInput.toLowerCase())
    );

    // filter. copy / pasted, so TODO check for errors
    const filteredStatuses = statusList.filter(item =>
        item.toLowerCase().includes(statusInput.toLowerCase())
    );

    // button for confirm / push
    const handleConfirm = async () => {
        // check for all fields !empty
        if (!equipmentName || !makeInput || !modelVal || !locationInput || !groupingInput || !idTagInput || !ownerInput) {
            alert('Missing one or more field');
            return;
        }

        // close all dropdowns when form submitted
        setEquipmentOpen(false);
        setMakeOpen(false);
        setModelOpen(false);
        setLocationOpen(false);
        setGroupingOpen(false);
        setOwnerOpen(false);
        setStatusOpen(false);

        // add equipment else
        const response = await supabase
            .from('Equipment')
            .insert([
                {
                    Equipment: equipmentName,
                    Make: makeInput,
                    Model: modelVal,
                    Location: locationInput,
                    Grouping: groupingInput,
                    "ID Tag": idTagInput,
                    Count: parseInt(countInput, 10) || 1,
                    Owner: ownerInput,
                    "Serial Number": serialNumInput,
                    Status: statusInput,
                    Notes: notesInput
                }
            ]);

            // console checking for status of supabase
            console.log("Supabase Insert Response:", response);

            // handle adding error
        if (response.error) {
            alert('Error adding item: ' + response.error.message);
        } else {
            alert('Equipment successfully added to Supabase!');

            // reset for new add after add works
            setEquipmentName('');
            setMakeInput('');
            setModelVal('');
            setLocationInput('');
            setGroupingInput('');
            setIdTagInput('');
            setCountInput('1');
            setOwnerInput('');
            setSerialNumInput('');
            setStatusInput('Functional');
            setNotesInput('');
        }
    };

    return(

    //bg
    <div style = {{padding : '20px',
                  backgroundColor : '#ABC',
                  borderRadius : '8px'}}>
        {/*  box around the text boxes and dropdowns */}
        <div style = {{padding : '20px',
                      backgroundColor : '#FFFFEB',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '15px',
                      alignItems: 'start'}}>

            {/* Equipment name */}
            {/* pos relative centres the dropdown under the box */}
            {/* TODO change box colour to match box bg colour of off-white / yellow?  */}
            {/* onBlur checks focus, closes dropdowns if true, ie curser outside of textbox */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setEquipmentOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Equipment Name"
                    value={equipmentName}
                    onChange={(e) => {
                        setEquipmentName(e.target.value);
                        setEquipmentOpen(true);
                    }}
                    onFocus={() => setEquipmentOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {equipmentOpen && filteredEquipment.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredEquipment.map((item, index) => (

                            // creating list item for each location in dropdownOptions
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setEquipmentName(item);
                                    setEquipmentOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* make name */}
            {/* pos relative centres the dropdown under the box */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMakeOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Make"
                    value={makeInput}
                    onChange={(e) => {
                        setMakeInput(e.target.value);
                        setMakeOpen(true);
                    }}
                    onFocus={() => setMakeOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {makeOpen && filteredMakes.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredMakes.map((item, index) => (

                            // creating list item for each location in dropdownOptions
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setMakeInput(item);
                                    setMakeOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* model name */}
            {/* pos relative centres the dropdown under the box */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setModelOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Model"
                    value={modelVal}
                    onChange={(e) => {
                        setModelVal(e.target.value);
                        setModelOpen(true);
                    }}
                    onFocus={() => setModelOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {modelOpen && filteredModels.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredModels.map((item, index) => (

                            // creating list item for each location in dropdownOptions
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setModelVal(item);
                                    setModelOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* location dropdown */}
            {/* pos relative centres the dropdown under the box */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setLocationOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Location"
                    value={locationInput}
                    onChange={(e) => {
                        setLocationInput(e.target.value);
                        setLocationOpen(true);
                    }}
                    onFocus={() => setLocationOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {locationOpen && filteredLocations.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredLocations.map((item, index) => (

                            // creating list item for each location in dropdownOptions
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setLocationInput(item);
                                    setLocationOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Grouping */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setGroupingOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Grouping"
                    value={groupingInput}
                    onChange={(e) => {
                        setGroupingInput(e.target.value);
                        setGroupingOpen(true);
                    }}
                    onFocus={() => setGroupingOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {groupingOpen && filteredGroupings.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredGroupings.map((item, index) => (
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setGroupingInput(item);
                                    setGroupingOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ID Tag */}
            <div>
                <input
                    type="text"
                    placeholder="ID Tag"
                    value={idTagInput}
                    onChange={(e) => setIdTagInput(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* Count */}
            <div>
                <input
                    type="number"
                    min="1"
                    placeholder="Count"
                    value={countInput}
                    onChange={(e) => setCountInput(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* Owner */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOwnerOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Owner"
                    value={ownerInput}
                    onChange={(e) => {
                        setOwnerInput(e.target.value);
                        setOwnerOpen(true);
                    }}
                    onFocus={() => setOwnerOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {ownerOpen && filteredOwners.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredOwners.map((item, index) => (
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setOwnerInput(item);
                                    setOwnerOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Serial Number */}
            <div>
                <input
                    type="text"
                    placeholder="Serial Number"
                    value={serialNumInput}
                    onChange={(e) => setSerialNumInput(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* Status */}
            <div
                style={{position: 'relative'}}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setStatusOpen(false); }}
            >
                <input
                    type="text"
                    placeholder="Status"
                    value={statusInput}
                    onChange={(e) => {
                        setStatusInput(e.target.value);
                        setStatusOpen(true);
                    }}
                    onFocus={() => setStatusOpen(true)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />

                {/* only rendert when true */}
                {statusOpen && filteredStatuses.length > 0 && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #ccc',
                                   zIndex: 10}}>
                        {filteredStatuses.map((item, index) => (
                            <li
                                key = {index}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick = {() => {
                                    setStatusInput(item);
                                    setStatusOpen(false);
                                }}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Notes */}
            <div style={{gridColumn: '1 / -1'}}>
                <textarea
                    placeholder="Notes (Max 250 characters)"
                    value={notesInput}
                    maxLength={250}
                    onChange={(e) => setNotesInput(e.target.value)}
                    rows={3}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box', resize: 'vertical'}}
                />
                <div style={{fontSize: '12px', color: '#777', textAlign: 'right'}}>
                    {notesInput.length}/250 chars
                </div>
            </div>

            {/*  Confirm button */}
            <div style={{gridColumn: '1 / -1'}}>
                <button
                    onClick={handleConfirm}

                    // stupid line wrapping
                    style={{padding: '8px 15px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%'}}
                >
                    Confirm & Save
                </button>
            </div>

          </div>
    </div>
    )
}

export default FormField;