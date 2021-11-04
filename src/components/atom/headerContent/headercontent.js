import React from 'react'

export const HeaderContent = ({title ,length}) => {
    return <div className="headerContent">
                <div className="txt">
                    <p>{title}</p>
                </div>
                <div className="contenLength">
                    <p>{length}</p>
                </div>
            </div>
}