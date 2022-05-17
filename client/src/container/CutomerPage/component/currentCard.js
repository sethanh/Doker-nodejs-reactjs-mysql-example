import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { showDate } from './../../../commons/function/index';
class currentCard extends Component {
    render() {
        const {current,start,name}= this.props;
        return (
            current.weather&&current.weather[0]?
            <Row  className='current-card'>
                <Col span={24} className='current-card_info'>{name}</Col>
                {showDate(start, 0)}
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                    // alt={weather.current.weather[0].icon}
                    className='current-card_image'
                />
                {(current.temp - 273.15).toFixed(1)}°C / humidity {current.humidity}%
            </Row>:null
        );
    }
}
export default currentCard;