import React, {useState} from "react";
import PropTypes from "prop-types";
import "../css/MapDetails.css";
import "../App.css";
import {isEmpty} from "lodash";

const MapDetails = ({
 data,
 submitData,
 handleDeleteObj
})=>{

const initialValues = {
  properties: {
    title: data?.properties?.title,
    location: data?.properties?.location,
    address: data?.properties?.address
  },
  details: {
    contact: data?.details?.contact,
    website: data?.details?.website,
  }
};
const [values, setValues] = useState(initialValues);
const getTime =(time, time1) => {
    const d = new Date(parseInt(time));
    const d1 = new Date(parseInt(time1));

    let hrs = d.getHours();
    let m = d.getMinutes();
    let hrs1 = d1.getHours();
    let m1 = d1.getMinutes();
        // Condition to add zero before minute
    let min = m < 10 ? `0${m}` : m;
    let min1 = m1 < 10 ? `0${m1}` : m1;
    const currTime = hrs >= 12 ? `${hrs - 12}:${min} pm` : `${hrs}:${min} am`;
    const currTime1 = hrs1 >= 12 ? `${hrs1 - 12}:${min1} pm` : `${hrs1}:${min1} am`;
    return currTime + " - " + currTime1;
}
const handleSubmit =(event)=> {
  event.preventDefault();
  submitData && submitData(values);
}
const handleInputChange =(obj,e) => {
  const { name, value } = e.target;
  Object.assign(obj,{[name] : value})
  setValues({
    ...values
  });
}
const handleDelete=(data)=> {
  handleDeleteObj && handleDeleteObj(data);
}

return  (
  <React.Fragment>
    <div className="form-data-wrapper">
        <div className="label-header">Marker Details</div>
        <div className="title marker-header">Title</div>
        <input className ="input-cls" type="text" name="title" value={values?.properties?.title} onChange={handleInputChange.bind(this, values.properties)}/>
        <div className="location marker-header">Location</div>
         <input className ="input-cls" type="text" name="location" value={values?.properties?.location} onChange={handleInputChange.bind(this, values.properties)}/>
        <div className="address marker-header">Address</div>
         <input className ="input-cls" type="text" name="address" value={values?.properties?.address} onChange={handleInputChange.bind(this, values.properties)}/>
         {data?.type==="entertainment" && !isEmpty(data?.details) && 
         <div>
            <div className="contact marker-header">Contact</div>
             <input className ="input-cls" type="string" name="contact" value={values?.details?.contact} onChange={handleInputChange.bind(this, values.details)}/>
            <div className="time marker-header">Timings</div>
             <label className="label-cls">{getTime(data.details.time?.split("-")[0], data.details.time?.split("-")[1])}</label>
              <div className="website marker-header">Website</div>
             <input className ="input-cls" type="text" name="website" value={values?.details?.website} onChange={handleInputChange.bind(this, values.details)}/>
          </div>}
     </div>
     <button className="buttons" type="submit" onClick={handleSubmit}>Save</button>
     <button className="buttons" type="submit" onClick={handleDelete.bind(this, data)}>Delete</button>
  </React.Fragment>
 )};

MapDetails.propTypes= {
  data: PropTypes.object,
  submitData: PropTypes.func,
  handleDeleteObj: PropTypes.func
};

export default MapDetails;