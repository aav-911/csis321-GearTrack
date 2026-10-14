// @author han_ns Hans Martin
import React, {useState} from 'react';


function FormField()
{

    const [tableIsOpened, setTableIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
//                                                 opens selects option and closes table immediately; no click-away.
//                                                 optionSelected is const var name
//                                                 option is which row in the dropdown was clicked, aka the arg*/}

    const dropdownOptions = [
            {location: 'MPS Office'                            },
            {location: 'EHS 102'                               },
            {location: 'STV Closet'                            },
            {location: 'CCD Closet'                            },
            {location: 'Athletics Softball Kit'                },
            {location: 'Athletics Baseball Kit'                },
            {location: 'Athletics Office'                      },
            {location: 'Athletics'                             },
            {location: 'Sony Cam Case 3'                       },
            {location: 'Sony Cam Case 4'                       },
            {location: 'Stadium Grandstands Pole (North end)'  },
            {location: 'Stadium Grandstands Pole (South end)'  },
            {location: 'WSC 206 AV Rack' }
        ];

    const optionSelected = option => {
        setSelectedOption(option);
        setTableIsOpen(false);
        }
    return(
    <div style = {{padding : '20px',
                  backgroundColor : '#abcfeb',
                  borderRadius : '8px'}}>

    <div style = {{padding : '20px',
                  backgroundColor : '#FFFFEB'}}>

        <button onClick = {() => setTableIsOpen(!tableIsOpened)}>
                                                    {/*Sets new button to opposite of whatever when clicked*/}
            {selectedOption ? `Selected: ${selectedOption.location}` : ' Select A Location: '}
                                                    {/*Use a blank unicode char (Korean) for whitespace
                                                    //TODO fix this, doesn't work with arrows so this is
                                                    probably a temporary fix*/}
            <span style = {{ float: 'right' }}>{tableIsOpened ? '↑' : '↓'}</span>
        </button>

        {tableIsOpened && (
            <ul style = {{ maxWidth: '250px',
                           listStyle: 'none',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           padding: 0, marginTop: '10px',
                           backgroundColor: '#FFFDD6'}}>
                {dropdownOptions.map((opt, index) => (
                    <li
                        key = {index}
                        onClick = {() => optionSelected(opt)}
                        style = {{padding : '8px',
                                  cursor: 'pointer',
                                  borderBottom: '2px solid #ddd'}}
                    >
                        {opt.location}
                    </li>
                    ))}
                </ul>
                )}
          </div>
    </div>
    )
}

export default FormField;
