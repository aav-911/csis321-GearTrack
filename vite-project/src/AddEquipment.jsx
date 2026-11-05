import React, {useState, useEffect} from 'react';
import { supabase } from './supabaseClient.js';

function FormField()
{
    // preloading / initializing each form field
    const [equipmentName, setEquipmentName] = useState('');
    const [makeInput, setMakeInput] = useState('');
    const [modelVal, setModelVal] = useState('');
    const [locationInput, setLocationInput] = useState('');

    // states for storing previous equipment options
    const [equipmentList, setEquipmentList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [locationList, setLocationList] = useState([]);

    // states for toggleing menus / text boxes
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    const [makeOpen, setMakeOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);

    // useEffect is background processes / brains that don't run dependant on / with the rendering
    useEffect(() => {

        // asynchronous so jsx doesnt wait for supabase
        async function fetchAllPastData() {
            const { data, error } = await supabase.from('Equipment').select('Equipment, Make, Model, Location');

            if (error) {
                console.log('Loading error:  ', error.message);
            } else if (data) {

                // filter out doubles, remove empties, sort alphabetically.
                setEquipmentList([...new Set(data.map(i => i.Equipment))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setMakeList([...new Set(data.map(i => i.Make))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setModelList([...new Set(data.map(i => i.Model))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
                setLocationList([...new Set(data.map(i => i.Location))].filter(Boolean).sort((a,b) => a.localeCompare(b)));
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

    // button for confirm / push
    const handleConfirm = async () => {
        // check for all fields !empty
        if (!equipmentName || !makeInput || !modelVal || !locationInput) {
            alert('Missing one or more field');
            return;
        }

        // add equipment else
        const response = await supabase
            .from('Equipment')
            .insert([
                {
                    Equipment: equipmentName,
                    Make: makeInput,
                    Model: modelVal,
                    Location: locationInput,
                    Status: 'Functional'
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
            <div style={{position: 'relative'}}>
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
            <div style={{position: 'relative'}}>
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
                                   backgroundColor: '#FFFDD6',
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
            <div style={{position: 'relative'}}>
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
            <div style={{position: 'relative'}}>
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

            {/*  Confirm button */}
            <div>
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