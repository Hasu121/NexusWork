import React from 'react'

const Card = (props) => {
  return (
    <div className={`w-full h-fit bg-white flex flex-col border-1 rounded-md shadow-md ${props.padding ? 'p-5' : 'p-0'}`}>
      {props.children}
    </div>
  )
}

export default Card
