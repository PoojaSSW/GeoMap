import React, {useEffect, useRef} from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Modal from 'react-modal';
import "./App.css";
import LiveStreaming from "./components/LiveStreaming";
import MapDetails from "./components/MapDetails";
import CreateMarker from "./components/CreateMarker";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Constant from "./constants/constant";
mapboxgl.accessToken = 'pk.eyJ1IjoicGJzcyIsImEiOiJjbDlpMDdwc3AwaHVyM3d1anU1ZXNsNXEwIn0.ou1OaZ4uo1Xs0tGJzrUjPQ'

Modal.setAppElement("#root")
export default function App() {

const [modalIsOpen, setIsOpen] = React.useState(false);
const [formData, setFormData] = React.useState({});
const [showStreaming, setStreaming] = React.useState(false);
const [showAddModal, setAddModal] = React.useState(false);
const [geoData, setGeoData] = React.useState(Constant.geojson);
const map = useRef(null);

useEffect(() => {
  if (map.current) {
    for (const feature of geoData.features) {
      const el = document.createElement('div');
      el.className = 'marker';
      const markers= new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map.current);
      markers.getElement().addEventListener('click', showModal.bind(this, feature), true);
    }
    return;
  }
   map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-96, 37.8],
      zoom: 3
    });
});
const showModal = (obj, eve) => {
  setIsOpen(true);
  setFormData(obj);
};
const closeModal = () =>{
  setIsOpen(false);
  setStreaming(false);
}
const closeAddModal = ()=> {
  setAddModal(false);
  setIsOpen(true);
}

const onToggle = (key) => {
  key==="live" ? setStreaming(true) : setStreaming(false);
}

const onAdd = () => {
  setAddModal(true);
  setIsOpen(false);
}

const onChangeData =(newdata) => {
  setIsOpen(false);
  alert("Marker Object has been saved successfully!!");
  return Object.assign(formData, {properties: newdata?.properties, details: newdata?.details});

}
const onDelete= (deletedData) => {
  setIsOpen(false);
  geoData.features.splice(geoData.features.findIndex(i=>i.id=== deletedData.id), 1)
  alert("Marker Object has been removed successfully!!");
  setGeoData(geoData);
}
const createObjData=(updatedObj)=> {
  Object.assign(updatedObj, {id: geoData.features.length+1})
  geoData.features.push(updatedObj);
   try {
      setGeoData(geoData);
      setAddModal(false);
      setIsOpen(false);
      alert("Marker Object has been added successfully!!");
    } catch (err) {
      console.log(err);
    }
}
const sectionCls = showStreaming ? "section-cls" : "";

return (<div>
  <div className="map-container" id="map"/>
  <Modal isOpen={modalIsOpen} closeModal= {closeModal}>
      <div className="main-wrapper">
          <div className="left-section-wrapper">
            <div style={!showStreaming? Constant.getStyles : {}} className= "common-wrapper" onClick={onToggle.bind(this,"summary")}>Summary</div>
            <div style={showStreaming? Constant.getStyles: {}} className= "common-wrapper" onClick={onToggle.bind(this,"live")}>Live Streaming</div>
          </div>
           <div className={`right-section-wrapper ${sectionCls}`}>
              {formData && !showStreaming && <div className="form-data-wrapper">
                  <MapDetails data= {formData} submitData={onChangeData.bind(this)} closeModal={closeModal} onAdd={onAdd} handleDeleteObj={onDelete.bind(this)}/>
                </div>}
              {showStreaming && <div className="stream-data">
                  <LiveStreaming/>
              </div>}
           </div>
          {!showStreaming && <div className="btn-wrapper">
              <button className="buttons" style={Constant.cancelStyles} onClick={closeModal}>Close</button>
              <button className="buttons" style={{width: "150px"}} onClick={onAdd}>Add New Marker</button> 
          </div>}
      </div>
  </Modal>   
  <Modal isOpen={showAddModal} closeModal= {closeModal}>
    <CreateMarker closeAddModal={closeAddModal} geoData= {geoData?.features} createObjData= {createObjData.bind(this)}/>
  </Modal> 
  </div>);
}