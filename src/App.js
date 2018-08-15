import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import WikiAPI from './WikiAPI'
import './App.css'

function buildWikiUrl(title) {
    return `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintroa&titles=${title}&origin=*`
}
// Markers with lat/long
const markers = [
  {
    id: 1,
    position: {lat: 52.239499042, lng: 21.008833298},
    title: "Adam Mickiewicz Monument",
    url: buildWikiUrl('Adam_Mickiewicz_Monument,_Warsaw')
  },
  {
    id: 2,
    position: {lat: 52.2362323884, lng: 21.0174582635},
    title: "Nicolaus Copernicus Monument",
    url: buildWikiUrl('Nicolaus_Copernicus_Monument,_Warsaw')
  },
  {
    id: 3,
    position: {lat: 52.249722, lng: 20.993889},
    title: "Monument to the Ghetto Heroes",
    url: buildWikiUrl('Monument_to_the_Ghetto_Heroes')

  },
  {
    id: 4,
    position: {lat: 52.253764, lng: 20.998889},
    title: "Monument to the Fallen and Murdered in the East",
    url: buildWikiUrl('Monument_to_the_Fallen_and_Murdered_in_the_East')

  },
  {
    id: 5,
    position: {lat: 52.214722, lng: 21.028056},
    title: "Chopin Statue",
    url: buildWikiUrl('Chopin_Statue,_Warsaw')
  }
]



class Map extends React.Component {
  // Load JS from google maps https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
  componentDidMount() {
        window.initMap = this.initMap.bind(this);

        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBE_BEEs1_iQlWmtqsJP_4_1rueRYgFtQc&callback=initMap')
  }

  componentDidUpdate() {
    this.showMarkers()
  }

  // If none is selected show all of them, otherwise show only the one selected
  shouldShowMarker(m) {
    if (!this.props.selectedMarker) {
      return true
    }

    return this.props.selectedMarker === m.id;
  }

  shouldAnimateMarker(m) {
    return this.props.clickedMarker === m.id;
  }

  // Set the map and the animation
  showMarkers() {
    this.state.markers.forEach(m => {
      this.shouldShowMarker(m) ? m.setMap(this.state.map) : m.setMap(null)
      this.shouldAnimateMarker(m) ? m.setAnimation(window.google.maps.Animation.BOUNCE) : m.setAnimation(null)
    })
  }

  initMap() {
    const node = ReactDOM.findDOMNode(this)
    const coordinates = {lat: 52.239499042, lng: 21.008833298}

    const options = {
          zoom: 14,
          center: coordinates,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
          }
        }
    this.setState({map: new window.google.maps.Map(node, options), markers: markers.map(m => {
      // Create marker
      const marker = new window.google.maps.Marker(m);
      // Add on click event
      marker.addListener('click', this.props.onMarkerSelected.bind(null, m));

      return marker;
    })}, this.showMarkers)
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
    // Has the user selected anything?
    filterQuery: null,
    // Has the user clicked on any marker?
    clickedMarker: null,
    markerInfo: {}
  }

  onMarkerSelected(m) {
    this.setState(_ => ({clickedMarker: m.id}))
    if (!this.state.markerInfo[m.id] || this.state.markerInfo[m.id].error) {
      WikiAPI.getMarkerInfo(m)
      .then(data => {
        this.setState(st => {
          st.markerInfo[m.id] = data;
          return st;
        })
      })
    }
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
                    markerInfo={this.state.markerInfo[this.state.clickedMarker]}
                    onMarkerSelected={this.onMarkerSelected.bind(this)}
                    markers={this.filteredMarkers()} />
              </div>
              <div className='col-sm-4 col-xs-6 col-md-8 col-lg-10 map'>
                <Map
                    onMarkerSelected={this.onMarkerSelected.bind(this)}
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
