import {Dispatch} from 'redux'

export const setSearch = (value: string | null) => ({
    type : 'SET_SEARCH',
    payload : value
})

export const setCoords = (cords: any) => {
    return async (dispatch: Dispatch, getState: any) => {
      dispatch({ type: "WEATHER_LOADING", payload: false });
      dispatch({ type: "SET_SEARCH", payload: "" });
      dispatch({
        type: "USER_POSITION",
        payload: {
          lon: cords.lon,
          lat: cords.lat,
        },
      });
      // 1 day
      let url = `${process.env.REACT_APP_URL}/weather?lat=${cords.lat}&lon=${cords.lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
      let thisState = getState();
      try {
        const res = await fetch(url);
        if (res.ok) {
          const weather: any = await res.json();
          dispatch({ type: "WEATHER_DAY_ADD", payload: weather });
          //
          let historyCheck = thisState.weather.history.findIndex(
            (w: any) => w.name === weather.name
          );
          if (historyCheck < 0) {
            dispatch({ type: "WEATHER_ADD_HISTORY", payload: weather });
          } // 5Days
          // SEARCH 5 DAYS
          url = `${process.env.REACT_APP_URL}/forecast?lat=${cords.lat}&lon=${cords.lon}&units=metric&exclude=daily&appid=${process.env.REACT_APP_APIKEY}`;
          try {
            const response = await fetch(url);
            if (res.ok) {
              const Fweather: any = await response.json();
              dispatch({ type: "WEATHER_LOADING", payload: true });
              dispatch({ type: "WEATHER_FDAYS_ADD", payload: Fweather });
            } else {
              console.log("Error");
            }
          } catch (error) {}
          // end
        } else {
          console.log("Error");
        }
      } catch (error) {}
    };
  };
  
  // QUERY SEARCH
  export const runSearch = () => {
    return async (dispatch: Dispatch, getState: any) => {
      dispatch({ type: "WEATHER_LOADING", payload: false });
      let state = getState();
      // 1 day
      let url = `${process.env.REACT_APP_URL}/weather?q=${state.weather.search}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const weather: any = await res.json();
          dispatch({ type: "WEATHER_DAY_ADD", payload: weather });
          //
          let thisState = getState();
          let historyCheck = thisState.weather.history.findIndex(
            (w: any) => w.name === weather.name
          );
          if (historyCheck < 0) {
            dispatch({ type: "WEATHER_ADD_HISTORY", payload: weather });
          }
          // 7day
          url = `${process.env.REACT_APP_URL}/forecast?q=${state.weather.search}&units=metric&cnt=7&appid=${process.env.REACT_APP_APIKEY}`;
          try {
            const response = await fetch(url);
            if (res.ok) {
              const Fweather: any = await response.json();
              dispatch({ type: "WEATHER_LOADING", payload: true });
              dispatch({ type: "WEATHER_FDAYS_ADD", payload: Fweather });
            } else {
              console.log("Error");
            }
          } catch (error) {}
          // end
        } else {
          console.log("Error");
        }
      } catch (error) {}
    };
  };
  
  