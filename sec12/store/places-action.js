export const ADD_PLACE = "ADD_PLACE";
export const SELECT_PLACES = "SELECT_PLACES";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy address",
        15.6,
        12.3
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title, image: newPath },
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