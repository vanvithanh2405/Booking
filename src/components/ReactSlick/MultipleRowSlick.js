import React, { useState } from "react";
import { useDispatch } from 'react-redux'
// import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
// import FilmFlip from "../Film/FilmFlip/FilmFlip";
import {  LeftOutlined, RightOutlined  } from '@ant-design/icons';
// Css MultipleRowSlick
import styleSlick from './MultipleRowSlick.module.css';
import './MultipleRowSlick.scss';
import Film from "../Film/Film";



function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
        className="slick-arrow ArrowCustom"
        style={{...style, right: -60}}
        onClick={onClick}
    >
        <RightOutlined className={'ArrowRight'} style={{fontSize:'4rem'}}/>
    </div>
);
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
        className="slick-arrow ArrowCustom"
        style={{...style,left: -65}}
        onClick={onClick}
    >
        <LeftOutlined  className={'ArrowLeft'} style={{fontSize:'4rem'}}/>
    </div>
);
}


const MultipleRows = (props) => {


  const [phimDangChieu, setPhimDangChieu] = useState(true);
  const [phimSapChieu, setPhimSapChieu] = useState(false);

  // const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)
  const dispatch = useDispatch();

  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className="mt-2" key={index}>
        {/* <FilmFlip item={item} /> */}
        <Film item={item} />

      </div>
    })
  }

  // let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

  // let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';


  var settings = {
    className: "center variable-width",
    centerPadding: "0px",
    centerMode: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    rows: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "1px",
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          rows: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "0px",
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: false,
          prevArrow: false,
          rows: 1,
        }
      },
      {
        breakpoint: 450,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
          rows: 1,
        }
      },
    ]
  };

  return (
    <div className="text-left">
      <button type="button" className={phimDangChieu ? `active_Film` : `none_active_Film`} onClick={() => {
        const action = { type: SET_FILM_DANG_CHIEU }
        dispatch(action);
        setPhimDangChieu(true);
        setPhimSapChieu(false);
      }}>Phim Đang Chiếu</button>
      <button type="button" className={!phimSapChieu ? `none_active_Film` : `active_Film`} onClick={() => {
        const action = { type: SET_FILM_SAP_CHIEU }
        dispatch(action);
        setPhimSapChieu(true);
        setPhimDangChieu(false);
      }}>Phim Sắp Chiếu</button>
      <Slider {...settings}>
        {renderFilm()}
      </Slider>
    </div>
  );
}


export default MultipleRows;