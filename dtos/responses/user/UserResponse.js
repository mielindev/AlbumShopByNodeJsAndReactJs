import { getImageUrl } from "../../../helpers/imageHelper";

class UserResponse {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.avatar = getImageUrl(user.avatar);
  }
}
export default UserResponse;
