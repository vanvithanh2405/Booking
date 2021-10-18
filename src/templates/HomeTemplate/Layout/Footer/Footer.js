/* eslint-disable jsx-a11y/alt-text */
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { SendOutlined } from '@ant-design/icons';
import logoWhite from './../../../../imgRap/LOGO/LogoR2-mini.png'

import './Footer.scss'
export default function Footer() {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));

    console.log('arrHeThongRap', arrHeThongRap)


    return (
        <footer className="footer bg-black relative border-b-2 border-black ">
            <div className="container mx-auto px-6">

                <div className="sm:flex sm:mt-8">
                    <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-medium text-white mt-4 mb-2">our production.</span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">About Edge</a></span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">Latest Video</a></span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">Studio Tour</a></span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">Press & News</a></span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">Help (FAQ)</a></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-medium text-white mt-4 md:mt-0 mb-2">about.</span>
                            <span className="my-2 mx-auto"><a href="#" className="text-white text-md hover:text-blue-500">Create your feature presentation the modern way & without effort</a></span>
                            <span className="my-2 " >
                                <a href="#" className="text-white grid grid-cols-3  space-y-1 text-md hover:text-blue-500">
                                    {arrHeThongRap.map((hThongRap, index) => {
                                        return <div key={index}>
                                            <img src={hThongRap.logo} style={{ width: '35px' }} />
                                        </div>
                                    })}
                                </a>
                            </span>

                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-medium text-white  mt-4 md:mt-0 mb-2">film news.</span>
                            <span className="my-2"><a href="#" className="text-white  text-md hover:text-blue-500">Subscribe to Leitmotif newsletter this day</a></span>
                            <div className="p-1 rounded border mt-4">
                                <div className="input-group">
                                    <input type="email" placeholder="your email" aria-describedby="button-addon1" className="form-control border-0 shadow-0" />
                                    <div className="input-group-append">
                                        <button id="button-addon1" type="submit" className="btn btn-link"><i className="fa fa-paper-plane" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6">
                <div className=" flex flex-col items-end">
                    <div className="sm:w-2/3 text-right py-6 mx-3">
                        <p className="text-sm text-white font-semibold mb-2">
                            © 2021 by Duy Khanh and Vi Thanh. All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}
