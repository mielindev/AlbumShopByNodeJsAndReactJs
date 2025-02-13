class UserResponse {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.avatar = user.avatar;
    this.role = user.role;
    this.is_locked = user.is_locked;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
export default UserResponse;
