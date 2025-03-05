import { getImageUrl } from "../../../helpers/imageHelper";

class UserResponse {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.address = user.address;
    this.avatar = getImageUrl(user.avatar);
    this.is_locked = user.is_locked;
    this.username = user.username;
  }
}
export default UserResponse;
