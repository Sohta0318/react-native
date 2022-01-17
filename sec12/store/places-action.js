export const ADD_PLACE = "ADD_PLACE";
export const SELECT_PLACES = "SELECT_PLACES";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";
import ENV from "../.env";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&amp;key=${ENV.googleApiKey}`
    );
    if (!response.ok) {
      throw new Error("something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("something went wrong!");
    }
    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SELECT_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
