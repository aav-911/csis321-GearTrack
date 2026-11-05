import React, {useState, useEffect} from 'react';
import { supabase } from './supabaseClient.js';

function FormField()
{
    const [tableIsOpened, setTableIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    // empty array initialization
    const [dropdownOptions, setDropdownOptions] = useState([]);

    // react variable states, initialized with empty strings.
    const [equipmentName, setEquipmentName] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');

    // useEffect is background processes / brains that don't run dependant on / with the rendering
    useEffect(() => {

        // asynchronous so jsx doesnt wait for supabase
        async function loadLocationsFromSupabase() {
            const { data, error } = await supabase
                .from('Equipment')
                .select('Location');

            if (error) {
                console.log('Loading error:  ', error.message);
            } else if (data) {

                // only use one of each location. data.map only gets item locations, .filter removes null / empty
                const uniqueLocations = [...new Set(data.map(item => item.Location))]
                    .filter(loc => loc)
                    .map(loc => ({ location: loc }))

                    // sort alphabetically
                    .sort((a, b) => a.location.localeCompare(b.location));

                setDropdownOptions(uniqueLocations);
            }
        }
        loadLocationsFromSupabase();
    }, []);

    const optionSelected = option => {
        setSelectedOption(option);
        setTableIsOpen(false);
    }

    // button for confirm / push
    const handleConfirm = async () => {
            if (!equipmentName || !make || !model || !selectedOption) {
                alert('Missing one or more field');
                return;
            }

            // console checking for status of supabase
            const response = await supabase
                .from('Equipment')
                .insert([
                    {
                        Equipment: equipmentName,
                        Make: make,
                        Model: model,
                        Location: selectedOption.location,
                        Status: 'Functional'
                    }
                ]);

            console.log("Supabase Insert Response:", response);

            if (response.error) {
                alert('Error adding item: ' + response.error.message);
            } else {
                alert('Equipment successfully added to Equipment Table');
                setEquipmentName('');
                setMake('');
                setModel('');
                setSelectedOption(null);
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
            <div>
                <input
                    type="text"
                    placeholder="Equipment Name"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* make name */}
            <div>
                <input
                    type="text"
                    placeholder="Make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* model name */}
            <div>
                <input
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    style={{padding: '6px', width: '100%', boxSizing: 'border-box'}}
                />
            </div>

            {/* location dropdown */}
            {/* pos relative centres the dropdown under the box */}
            <div style={{position: 'relative'}}>
                <button

                    // toggles state of table open,
                    onClick = {() => setTableIsOpen(!tableIsOpened)}
                    style={{width: '100%', padding: '6px', textAlign: 'left'}}
                >
                    {/* toggles between ^ and v depending on state */}
                    {selectedOption ? `Selected: ${selectedOption.location}` : ' Select A Location: '}
                    <span style = {{ float: 'right' }}>{tableIsOpened ?  '↑' : '↓'} </span>
                </button>

                {/* only rendert when true */}
                {tableIsOpened && (
                    <ul style = {{ position: 'absolute', width: '100%', maxHeight: '150px', overflowY: 'auto',
                                   listStyle: 'none',
                                   padding: 0, marginTop: '4px',
                                   backgroundColor: '#FFFDD6',
                                   border: '1px solid #ccc',
                                   // z index is to high layer, TODO change / make sure enoguh
                                   zIndex: 10}}>
                        {dropdownOptions.map((opt, index) => (

                            // creating list item for each location in dropdownOptions
                            <li
                                key = {index}
                                onClick = {() => optionSelected(opt)}
                                style = {{padding : '8px',
                                          cursor: 'pointer',
                                          borderBottom: '1px solid #ddd'}}
                            >
                                {opt.location}
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