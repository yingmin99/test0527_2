
import React, { useEffect, useState } from "react";
import '../../App.css';
import WtgCards from '../commons/Cards/Wtg_Cards';
import WMainImage from './Sections/W_MainImage';
import WGridCards from './W_GridCards';

import { WTG_MAIN_IMAGE_URL } from '../../Config';

import { Row } from 'antd';


export default function Wtg() {


    const [gongdata, setGongdata] = useState([])
    const [MainShopImage, setMainShopImage] = useState(null)
    // const [CurrentPage, setCurrentPage] = useState(0)


    useEffect(() => {


        const endpoint = `http://openapi.seoul.go.kr:8088/50736e737373656f3130314b45746458/json/ListPublicReservationInstitution/1/25/%EA%B0%95%EC%9D%98%EC%8B%A4`;

        fetchGongs(endpoint)
console.log(endpoint)

    }, [])




    const fetchGongs = (endpoint) => {
        console.log(endpoint)
        fetch(endpoint)

            .then(response => response.json())
            .then(response => {

                //console.log(response.ListPriceModelStoreService);
                setGongdata(response.ListPublicReservationInstitution.row);
                setMainShopImage('https://images.unsplash.com/photo-1503418895522-46f9804cda40?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340')
               // setCurrentPage(response.ListPriceModelStoreService.row)

                // setMovies([...Movies, ...response.results])
                // setMainMovieImage(response.results[0])
                // setCurrentPage(response.page)


            })

    }

    const loadMoreShops = () => {

        const endpoint = `http://openapi.seoul.go.kr:8088/50736e737373656f3130314b45746458/json/ListPublicReservationInstitution/1/100/%EA%B0%95%EC%9D%98%EC%8B%A4`;
        fetchGongs(endpoint)
    
      }



    return (

        <div style={{ width: '100%', margin: '0' }}>
            {MainShopImage &&
                <WMainImage
                    image={`${WTG_MAIN_IMAGE_URL}`}

                />
            }

            {gongdata && <WtgCards gongdata={gongdata} />}

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <center><h2>????????? ????????? ?????? ????????? ??????</h2></center>
                <hr />
                {/* {
              shopdata && shopdata.map(record => {
    
                return (
    
    
    
                  <div className="box" key={record.SH_ID}>
                    <div>{record.SH_NAME}</div>
                    <div>{record.SH_ADDR}</div>
    
    
                    <div> {record.SH_INFO}</div>
    
                    <div> {record.SH_PHOTO}</div>
                  </div>
    
                )
              })
            } */}


                <Row gutter={[16, 16]} >

                    {gongdata && gongdata.map((gong, index) => (
                        //console.log('line 109 shop : ' + JSON.stringify(shop)),
                        <React.Fragment key={index}>
                            <WGridCards
                                // image={shop.SH_PHOTO ?
                                //   `${SHOP_IMAGE_URL}w500${shop.SH_PHOTO}` : null}
                                // image={`${SHOP_IMAGE_URL}`}
                                gongData={gong}
                                gongId={gong.SVCID}
                                gongName={gong.PLACENM}
                                gongInfo={gong.MINCLASSNM}
                                gongTelno={gong.TELNO}
                                gongAddr={gong.SVCNM}
                            />
                        </React.Fragment>

                    ))}

                </Row>


            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

<button onClick={loadMoreShops}> Load More</button>
</div>




        </div>
    );

}
