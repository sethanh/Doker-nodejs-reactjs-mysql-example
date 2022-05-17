import * as Types from './../constants/WeatherTypes';

const initialState = {
  weather: [],
  current:{},
  nameCity:''
}; // tt:3
const myreducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_FETCH_WEATHER_BY_CITY:
      return { ...state,nameCity:action.payload.name};
    case Types.GET_WEATHER_BY_CITY_SUCCESS:
      return { ...state,weather: action.payload.daily,current:action.payload.current};
    default:
      return state;
  }
};

export default myreducer;
