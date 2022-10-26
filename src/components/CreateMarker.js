import React, {useState} from "react";
import PropTypes from "prop-types";
import "../App.css";
import Constant from "../constants/constant";

const CreateMarker = ({
 closeAddModal,
 geoData,
 createObjData
})=>{

const initialValues = {
  geometry: {
    type: "Point",
    coordinates: [geoData?.geometry?.lat, geoData?.geometry?.long]
  },
  properties: {
    title: geoData?.properties?.title,
    location: geoData?.properties?.location
  },
  details: {
    contact: geoData?.details?.contact,
    website: geoData?.details?.website,
  },
  type: geoData?.type
};

const [values, setValues] = useState(initialValues);
const [dropdownVal, setDropdown]= useState("feature");

const handleInputChange =(data,e) => {
  e.preventDefault();
  const { name, value } = e.target;
  if (data.coordinates) Object.assign(data.coordinates,{[name] : value})
  else Object.assign(data,{[name] : value})
  setValues({
    ...values
  });
}
 
const createData =(data, e)=> {
  e.preventDefault();
  Object.assign(data.geometry, {coordinates: [parseInt(data?.geometry?.coordinates?.latitude), parseInt(data?.geometry?.coordinates?.longitude)]});
  createObjData && createObjData(data);
}
const onSelectDrpdown =(eve)=>{
  Object.assign(values, {type: eve.target?.value});
  setDropdown(eve.target?.value);
  setValues({
      ...values
  });
}
return  (
  <form>
     <React.Fragment>
        <div className="label-header">Create New Marker</div>
        <div className="marker-header"> Type</div>
        <select id = "dropdown" className="drpdown" onChange={onSelectDrpdown}>
            <option value="feature">Feature</option>
            <option value="entertainment">Entertainment</option>
        </select>
        <div className="title marker-header">Title</div>
        <input type="text" className ="input-cls" placeholder="Enter Title" name="title" value={values?.properties?.title} onChange={handleInputChange.bind(this, values?.properties)}/>
        <div className="location marker-header">Location</div>
        <input type="text" className ="input-cls" placeholder="Enter Location" name="location" value={values?.properties?.location} onChange={handleInputChange.bind(this, values?.properties)}/>
        <div className="latitude marker-header">Latitude</div>
        <input type="number" className ="input-cls" placeholder="Enter Latitude" name="latitude" value={values?.geometry?.latitude} onChange={handleInputChange.bind(this, values?.geometry)}/>
        <div className="longitude marker-header">Longitude</div>
        <input type="number" className ="input-cls" placeholder="Enter Longitude" name="longitude" value={values?.geometry?.longitude} onChange={handleInputChange.bind(this, values?.geometry)}/>
        {dropdownVal==="entertainment" &&
           <div>
            <div className="contact marker-header">Contact</div>
             <input className ="input-cls" type="number" name="contact" placeholder="Enter Contact" value={values?.details?.contact} onChange={handleInputChange.bind(this, values?.details)}/>
              <div className="website marker-header">Website</div>
             <input className ="input-cls" type="text" name="website" placeholder="Enter Website" value={values?.details?.website} onChange={handleInputChange.bind(this, values?.details)}/>
          </div>
        }
      </React.Fragment>
      <div className="btn-wrapper">
        <button className="buttons" style={Constant.cancelStyles} onClick={closeAddModal}>Close</button>
        <button className="buttons" onClick={createData.bind(this,values)}>Create</button>
      </div>
  </form>
 )};
CreateMarker.propTypes= {
  closeAddModal: PropTypes.func,
  geoData: PropTypes.object,
  createObjData: PropTypes.func

};

export default CreateMarker;
