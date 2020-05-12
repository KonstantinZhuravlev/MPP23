function ProfileInfo (id, name, surname, birthday, image, regDate, email){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.image = image;
    this.regDate = regDate;
    this.email = email;
}

module.exports = {
    ProfileInfo: ProfileInfo
};