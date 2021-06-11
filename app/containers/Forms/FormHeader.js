
import { lineBreak } from 'acorn';
import React, { useState, useEffect } from 'react';

import { FORM_HEADER } from '../../utils/constants'

export const FormHeader=(props)=>{

    let linkBreak = Object.keys(FORM_HEADER).indexOf(props.selectedHeader);

    return(
        <div>  
            {Object.entries(FORM_HEADER).map(([key,value],index) => ( 
                // props.selectedHeader === key? (<p style={{color:"Blue",display: "inline",margin: "00px 20px 00px 00px"}}>{key}</p>) : (<p style={{display: "inline",margin: "00px 20px 00px 00px"}}>{key}</p>)
                index>=linkBreak? (index===linkBreak ? 
                    (<p style={{color:"Blue",display: "inline",margin: "00px 20px 00px 00px"}}>{key}</p>) : 
                    (<p style={{display: "inline",margin: "00px 20px 00px 00px"}}>{key}</p>)) : 
                    (<p style={{display: "inline",margin: "00px 20px 00px 00px"}}><a href={value}>{key}</a></p>)
            ))}
        </div>
    )
}

export default FormHeader; 
