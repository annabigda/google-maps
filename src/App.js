import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import './App.css'


class Map extends React.Component {
  componentDidMount() {
        window.initMap = this.initMap.bind(this);

        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBE_BEEs1_iQlWmtqsJP_4_1rueRYgFtQc&callback=initMap')
  }

  initMap() {
    const node = ReactDOM.findDOMNode(this)
    const options = {
          zoom: 4,
          center: {lat: -33, lng: 151},
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
          }
        }
    new window.google.maps.Map(node, options);
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

class MapsApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className='container-fluid map'>
            <Map />
        </div>
      </div>
    )
  }
}

export default MapsApp

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
