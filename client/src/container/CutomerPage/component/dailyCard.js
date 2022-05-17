import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import {showDate,showTime} from './../../../commons/function/index';
import CurrentCard from './currentCard';
class dailyCard extends Component {
    render() {
        const {weather,objWeatherDetail,start,setobjWeatherDetail}=this.props;
        return (
            <Col span={10} >
            <Row className='daily-header'><Col span={24}>7-day forecast</Col></Row>
            {weather && !objWeatherDetail ? weather.map((item, index) =>(
              <Row key={index} className='daily-card daily-card--rounded daily-card--check'>
                {showDate(start, index)}
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].icon}
                  className='daily-card_image'
                />
                {(item.temp.day - 273.15).toFixed(1)}°C/{(item.temp.night - 273.15).toFixed(1)}°C
                <Button className='daily-card_btn daily-card_btn--primary daily-card_btn--rounded'
                  onClick={() => {setobjWeatherDetail({objWeatherDetail: {...item,stt:index}})}}>show detail</Button>
              </Row>))
              : <Row className='daily-card daily-card--rounded'>
                <Col span={24}>{showDate(start,objWeatherDetail.stt)}</Col>
                <Col span={24}>
                <img src={`http://openweathermap.org/img/wn/${objWeatherDetail.weather[0].icon}.png`}
                  alt={objWeatherDetail.weather[0].icon}
                  className='daily-card_image'
                />
                <strong>{objWeatherDetail.weather[0].description}</strong>
                <Button className='daily-card_btn daily-card_btn--secondary daily-card_btn--rounded'
                  onClick={() => { setobjWeatherDetail({ objWeatherDetail: null}) }}>back to 8-day forecast</Button>
                </Col>
                <Col span={24} className='daily-card_infor '>
                  The high will be {(objWeatherDetail.temp.max - 273.15).toFixed(1)}°C, the low will be {(objWeatherDetail.temp.min - 273.15).toFixed(1)}°C.
                </Col>
                <Col span={12} className='daily-card_infor '>
                  <Row>Humidity</Row>
                  <Row>{objWeatherDetail.humidity}</Row>
                </Col>
                <Col span={12} className='daily-card_infor '>
                  <Row>Uv</Row>
                  <Row> {objWeatherDetail.uvi}</Row>
                </Col>
                <Col span={12} className='daily-card_infor '>
                  <Row>Rain</Row>
                  <Row>{objWeatherDetail.rain}</Row>
                </Col>
                <Col span={12} className='daily-card_infor'>
                  <Row>Pressure</Row>
                  <Row>{objWeatherDetail.pressure}</Row>
                </Col>
                <Col span={12} className='daily-card_infor daily-card_infort--highligt'>
                  <Row> Sunrise</Row>
                  <Row>0{showTime(new Date(objWeatherDetail.sunrise))}am</Row>
                </Col>
                <Col span={12} className='daily-card_infor daily-card_infort--highligt'>
                  <Row> Sunset</Row>
                  <Row> 0{showTime(new Date(objWeatherDetail.sunset))}pm</Row>
                </Col>
              </Row>}
          </Col>
        );
    }
}

export default dailyCard;