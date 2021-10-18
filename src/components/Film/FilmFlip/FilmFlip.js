import React from 'react'
import './FilmFlip.css'
import { PlayCircleOutlined, CaretRightOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { history } from './../../../App'

export default function FilmFlip(props) {

    const { item } = props

    return (
        <div className="flip-card mt-10 ">
            <div className="flip-card-inner">
                <div className="flip-card-front ">

                    <img src={item.hinhAnh} alt="Avatar" style={{ width: 200, height: 300 }} className="" />
                </div>
                <div className="flip-card-back " style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }} >
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} className="" />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div>
                            <div className="cursor-pointer" ><CaretRightOutlined style={{ fontSize: '100px', marginBottom: '50px' }} /> </div>
                        </div>
                        <div className="bg-white px-3 py-2.5" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <div className="text-lg mt-2 font-bold text-black">
                                {item.tenPhim.length > 23 ? <span>{item.tenPhim.slice(0, 23)} ...</span> : <span>{item.tenPhim}</span>}
                            </div>
                            <button onClick={() => {
                                history.push(`/detail/${item.maPhim}`);
                            }} className=" px-4 py-2  text-center cursor-pointer bg-black text-white text-success-50 font-bold ">
                                Mua Vé
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )

}
