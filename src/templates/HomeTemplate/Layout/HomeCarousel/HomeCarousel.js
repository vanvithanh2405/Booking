import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/acitons/CarouselAction';
import img1 from './../../../../imgRap/POSTER/POSTER 1.JPG';
import img2 from './../../../../imgRap/POSTER/POSTER 2.JPG';
import img3 from './../../../../imgRap/POSTER/POSTER 3.JPG';
import img4 from './../../../../imgRap/POSTER/POSTER 4.JPG';

// Css
import './HomeCarousel.css'

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer);

    const dispatch = useDispatch();


    // sẽ tự kích hoạt khi component load ra
    useEffect(() => {
        //1 action = {type:'',data}
        //2 (phải cài middleware): callbackFunction (dispatch)

        const action = getCarouselAction()
        dispatch(action);
    }, [dispatch]);


    const contentStyle = {
        height: "600px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };


    // constructor(props) {
    //     super(props);
    //     this.next = this.next.bind(this);
    //     this.previous = this.previous.bind(this);
    //     this.carousel = React.createRef();
    //   }
    //   next() {
    //     this.carousel.next();
    //   }
    //   previous() {
    //     this.carousel.prev();
    //   }

    // const renderImg = () => {
    //     return arrImg.map((item, index) => {
    //         return <div key={index}>
    //             <div style={{...contentStyle}}>
    //                 <img src={item.hinhAnh} className="opacity-1 w-full h-full" alt={item.hinhAnh} />
    //             </div>
    //         </div>
    //     })
    // }


    return (

        <Carousel autoplay style={{ width: '100%', padding: 0, margin: 0 }} effect="fade" >
            {/* {renderImg()} */}
            {/* {SampleNextArrow()} */}
            <div style={{ contentStyle }}>
                <img src={img1} className="imgPoster opacity-1 w-full h-full" alt={img1} />
                <div className="infoPoster">
                    <h1 className="tenPhim4">IT <br/> Chú hề ma quái</h1>
                    <h4>18/10/2021</h4>
                    <div className="moTa">
                    <p>Lorem, ipsum doloe sit amet, consestetur adipiscing elit, Nec vitae aliquet non dipretium, tempus. Et nunc quis sed et, risus purus massa. </p>
                    </div>
                </div>
            </div>
            <div style={{ contentStyle }}>
                <img src={img2} className="imgPoster opacity-1 w-full h-full" alt={img2} />
                <div className="infoPoster">
                    <h1 className="tenPhim1">AquaMan</h1>
                    <h4>31/10/2021</h4>
                    <div className="moTa">
                    <p>Lorem, ipsum doloe sit amet, consestetur adipiscing elit, Nec vitae aliquet non dipretium, tempus. Et nunc quis sed et, risus purus massa. </p>
                    </div>
                </div>

            </div>
            <div style={{ contentStyle }}>
                <img src={img3} className="imgPoster opacity-1 w-full h-full" alt={img3} />
                <div className="infoPoster">
                    <h1 className="tenPhim2 bg-gradient-to-r from-gray-200 to-blue-300">Frozen</h1>
                    <h4>11/11/2021</h4>
                    <div className="moTa">
                    <p>Lorem, ipsum doloe sit amet, consestetur adipiscing elit, Nec vitae aliquet non dipretium, tempus. Et nunc quis sed et, risus purus massa. </p>
                    </div>
                </div>

            </div>
            <div style={{ contentStyle }}>
                <img src={img4} className="imgPoster opacity-1 w-full h-full" alt={img4} />
                <div className="infoPoster">
                    <h1 className="tenPhim3">Avengers <br/> Infinity War</h1>
                    <h4>20/11/2021</h4>
                    <div className="moTa">
                    <p>Lorem, ipsum doloe sit amet, consestetur adipiscing elit, Nec vitae aliquet non dipretium, tempus. Et nunc quis sed et, risus purus massa. </p>
                    </div>
                </div>

            </div>
            {/* {SamplePrevArrow()} */}
        </Carousel>

    )
}
// style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}

