import { tsParenthesizedType } from "@babel/types";

export default class ProfileInfo{
    id
    name
    surname
    birthday
    image
    regDate
    email

    constructor(id, name, surname, birthday, image, regDate, email){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
        this.image = image;
        this.regDate = regDate;
        this.email = email;
    }
}