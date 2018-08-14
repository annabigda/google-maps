import React from 'react'
const Sidebar = ({markers, onMarkerSelected}) => {
  return (
      <nav className="bg-faded sidebar">
          <ul className="nav nav-pills flex-column">
            {markers.map(m => (
              <li key={m.id} className="nav-item">
                <div onClick={onMarkerSelected.bind(null, m.id)} className='location-sidebar'>
                   {m.title}
                </div>
              </li>
            )
            )
            }
        </ul>
      </nav>
  )
}

export default Sidebar
