import React from 'react'


export const Buttom = ({onClick , title , loading}) => {
    if(loading) {
        return <button className='disable'>Loading...</button>
    }
    return <button onClick={onClick}>{title}</button>
}
