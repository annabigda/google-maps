import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './App.css'

const markers = [
  {
    id: 1,
    position: {lat: 50.67344699999999, lng: 17.956394000000046},
    title: "Lulu - Pizza Nocna"
  },
  {
    id: 2,
    position: {lat: 50.6733677, lng: 17.959553400000004},
    title: "Pizzeria Oregano"
  },
  {
    id: 3,
    position: {lat: 50.6694291, lng: 17.923537200000055},
    title: "Telepizza"
  },
  {
    id: 4,
    position: {lat: 50.665512, lng: 17.924893},
    title: "Rewolwer"
  },
  {
    id: 5,
    position: {lat: 50.666865, lng: 17.920578},
    title: "Rzymskie Wakacje"
  }
]



class Map extends React.Component {
  componentDidMount() {
        window.initMap = this.initMap.bind(this);

        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBE_BEEs1_iQlWmtqsJP_4_1rueRYgFtQc&callback=initMap')
  }
  componentDidUpdate() {
    this.showMarkers()
  }

  shouldShowMarker(m) {
    if (!this.props.selectedMarker) {
      return true
    }

    return this.props.selectedMarker === m.id;
  }

  shouldAnimateMarker(m) {
    return this.props.clickedMarker === m.id;
  }


  showMarkers() {
    this.state.markers.forEach(m => {
      this.shouldShowMarker(m) ? m.setMap(this.state.map) : m.setMap(null)
      this.shouldAnimateMarker(m) ? m.setAnimation(window.google.maps.Animation.BOUNCE) : m.setAnimation(null)
    })
  }

  initMap() {
    const node = ReactDOM.findDOMNode(this)
    const coordinates = {lat: 50.675107, lng: 17.921298}
    const options = {
          zoom: 14,
          center: coordinates,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
          }
        }
    this.setState({map: new window.google.maps.Map(node, options), markers: markers.map(m => new window.google.maps.Marker(m))}, this.showMarkers)
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
    filterQuery: null,
    clickedMarker: null
  }

  onMarkerSelected(clickedMarker) {
    this.setState({clickedMarker})
  }

  onFilterSelected(e) {
    const filterQuery = parseInt(e.target.value, 10);
    this.setState({filterQuery})
  }

  filteredMarkers() {
    return markers
      .filter(m => !this.state.filterQuery || this.state.filterQuery === m.id)
  }

  render() {
    return (
      <div className="app">
        <Header
          onFilterSelected={this.onFilterSelected.bind(this)}
          markers={markers}/>
          <div className='container-fluid main-container'>
            <div className='row'>
              <div className='col-sm-4 col-xs-6 col-md-4 col-lg-2'>
                <Sidebar
                    onMarkerSelected={this.onMarkerSelected.bind(this)}
                    markers={this.filteredMarkers()} />
              </div>
              <div className='col-sm-4 col-xs-6 col-md-8 col-lg-10 map'>
                <Map
                   clickedMarker={this.state.clickedMarker}
                   selectedMarker={this.state.filterQuery}/>
              </div>
            </div>
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
