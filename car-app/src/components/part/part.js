import React from 'react';
import './part.scss'

function Part(props) {
  console.log(props);
  if (props.model) {
    return (<>
      <div className="component-part">
        <h1 className="component-title">
          {props.model.label}
        </h1>
      </div>
    </>);
  } else {
    return (<></>);
  }
}

export default Part;