import React from 'react'

const Header = ({markers, onFilterSelected}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Google maps app</a>
            <form className="form-inline my-2 my-lg-0">
              <select onChange={onFilterSelected} className="form-control mr-sm-2" aria-label="Search">
                <option default value=''>Select pizzeria</option>
                {markers.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
              </select>
            </form>
        </nav>
    )
  }

export default Header
