import React from 'react'

const MarkerInfo = ({markerInfo}) => {
  return (
    <div role="contentinfo" className='card bg-faded'>
      <div role="contentinfo" className='card-body'>
          {markerInfo.text ?
            <article className='card-text'>{markerInfo.text}</article>

          : <div aria-errormessage="An error occurred please click again" className='alert alert-danger'>An error occurred please click again</div>
          }
        </div>
    </div>
  )
}
const Sidebar = ({markers, onMarkerSelected, markerInfo}) => {
  return (
      <nav className="bg-faded sidebar">
          <ul role="menu" className="nav nav-pills flex-column">
            {markers.map(m => (
              <li role="menuitem" key={m.id} className="nav-item">
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
