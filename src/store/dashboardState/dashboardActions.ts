import {dashboardActionTypes} from "./dashboardStateTypes";
import axios from "axios";

export const getDashboardData = async (dispatch: Function) => {
  const response = await axios.get('http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv');
  let data = response?.data;

  if(data) {

    dispatch({
      type: dashboardActionTypes.GET_DASHBOARD_DATA,
      payload: data
    });
  }
}