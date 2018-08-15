import React from 'react'

const MarkerInfo = ({markerInfo}) => {
  return (
    <div className='card bg-faded'>
      <div className='card-body'>
          {markerInfo.text ?
            <article className='card-text'>{markerInfo.text}</article>

          : <div className='alert alert-danger'>An error occurred please click again</div>
          }
        </div>
    </div>
  )
}
const Sidebar = ({markers, onMarkerSelected, markerInfo}) => {
  return (
      <nav className="bg-faded sidebar">
          <ul className="nav nav-pills flex-column">
            {markers.map(m => (
              <li key={m.id} className="nav-item">
                <button onClick={onMarkerSelected.bind(null, m)} className='btn btn-primary'>
                   {m.title}
                </button>
              </li>
            ))}
        </ul>
        {markerInfo ? <MarkerInfo markerInfo={markerInfo} />  : null}
      </nav>
  )
}

export default Sidebar
