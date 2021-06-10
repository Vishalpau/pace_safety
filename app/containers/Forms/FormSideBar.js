import React from 'react';


const FormSideBar = (props) =>{
    let form_link = props.form_name
    let link_splitted = form_link.split('/')
    let form_name = link_splitted[link_splitted.length-2]

   
    return(
        <div>
            { <h1 style= {{color: "Blue"}} >Environment affecteds</h1> ? form_name === "environment-affected" : <h1>Environment affected</h1>}
            <h1>Environment affected</h1>
            <h1>Equipment affected</h1>
            <h1>Incident details</h1>
            <h1>Peoples affected</h1>
            <h1>Reporting and notification</h1>
        </div>
    )
}

export default FormSideBar