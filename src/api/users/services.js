import axios from 'axios';
import { BASE_URI } from '../config';

const get = async props => {
  const url = !props
    ? '/user/all'
    : props?.id
    ? `/user/byid/${props.id}`
    : props?.uid
    ? `/user/byuid/${props.uid}`
    : '';
  // const { type, id, uid } = props;
  // const url =
  //   type === "all"
  //     ? "/user/all"
  //     : type === "id"
  //     ? `user/byid/${id}`
  //     : type === "uid"
  //     ? `user/byid/${uid}`
  //     : "";
  return await axios.get(BASE_URI + url);
};

const add = async props => {
  const { body } = props;
  const url = BASE_URI + '/user/add';
  return await axios.post(url, body);
};

const edit = async props => {};
const remove = async props => {};

const UserApi = { get, add, edit, remove };
export default UserApi;
