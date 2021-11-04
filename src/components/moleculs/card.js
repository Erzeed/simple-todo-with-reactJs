import React from 'react'
import {Buttom} from '../atom/button/button'
export const Card = ({onClickCard,id,titleCard,content,createdate,deadline,onClickDel,onClickMove}) => {
    return <div className="card" onClick={onClickCard} key={id} id={id}>
                <div className="judul">
                    <p>{titleCard}</p>
                </div>
                <div className="cardContent">
                    <p>{content}</p>
                </div>
                <div className="footer">
                    <div className="date">
                        <div className="create">
                            <p>{createdate}</p>
                        </div>
                        <div className="deadline">
                            <p>{deadline}</p>
                        </div>
                    </div>
                    <div className="action">
                        <div className="delete">
                            <Buttom onClick={onClickDel} />
                        </div>
                        <div className="move">
                            <Buttom onClick={onClickMove} />
                        </div>
                    </div>
                </div>
            </div>
}