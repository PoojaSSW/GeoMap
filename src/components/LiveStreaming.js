import React, {useState, useEffect} from "react";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
const LiveStreaming = ()=>{
  const [trafficData, setTrafficData] = useState([0]);
  const [dataExceed, setDataExceeded] = useState(false);
  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  useEffect(()=>{
    const permission = Notification.permission;
    if(permission === "granted") {
       if (trafficData?.length > 50 && !dataExceed) {
          showNotification();
          setDataExceeded(true);
          return;
        }
    } else if(permission === "default"){
       requestAndShowPermission();
    } else {
      alert("Use normal alert");
    }
  },[trafficData?.length, dataExceed]);
  const showNotification = () => {
     var title = "Limit Exceeded";
     let icon = "image-url"
     var body = "Set at a threshhold point";
     var notification = new Notification(title, { body, icon });
     notification.onclick = () => { 
            notification.close();
            window.parent.focus();
     }
  }
  const requestAndShowPermission = () => {
     Notification.requestPermission(function (permission) {
        if (permission === "granted") {
              alert("Permission Granted");
        }
     });
  }
  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if ((json.event = "data")) {
        setTrafficData(json.data.bids);
      }
    } catch (err) {
      console.log(err);
    }
  };
  ws.onclose = () => {
    console.log('Closed Connection!');
  };
  const columns = [
    { Header: 'Traffic(in the area based on long-lat markers)', accessor: 'traffic' }
  ];
  const getBids=() => {
    const data = trafficData?.map((item) => {
      return Object.assign({}, {traffic: item[1]});
    });
    return data;
  }

  return (
    <React.Fragment>
      <div className="App"><ReactTable data={getBids()} columns={columns}/></div>
    </React.Fragment>);
};

export default LiveStreaming;