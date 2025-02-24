class UserResponse {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.avatar = user.avatar;
  }
}
export default UserResponse;
