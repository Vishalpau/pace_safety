import { lineBreak } from 'acorn';
import React, { useState, useEffect } from 'react';

import { INITIAL_NOTIFICATION_FORM,EVIDENCE_FORM,INVESTIGATION_FORM,ROOT_CAUSE_ANALYSIS,INITIAL_NOTIFICATION } from '../../utils/constants'

export const FormSideBar=(props)=>{

    let lt = ">>"
    let linkBreak = Object.keys(props.listOfItems).indexOf(props.selectedItem);
    return(
        <div>  
            {Object.entries(props.listOfItems).map(([key,value],index) => (  
                index>=linkBreak? (index===linkBreak ? (<h1 style={{color:"Blue"}}>| {lt} {key}</h1>) : (<h1>{key}</h1>)) : (<h1><a href={value}>{key}</a></h1>)
            ))}
        </div>
    )
}

export default FormSideBar; 
