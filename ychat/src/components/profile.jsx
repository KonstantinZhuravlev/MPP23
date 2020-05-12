import React, { Component } from 'react';
import "../css/UserProfile.css";
import ProfileInfo from "../extraFiles/profileInfo.js";
import Converter from "../extraFiles/converter.js";

class Profile extends Component {
    state = { 
        profileInfo: this.props.userInfo,
    }

    render() { 
        return ( 
            <div className="user-profile">
                <div class="container">
                        <div class="coll">
                            <div className="card">
                                <div className="profile-image">
                                    <div className="card-body">
                                        <img id="profileImage" src={`data:image/jpg;base64,${Converter.arrayBufferToBase64(this.props.currentUser.image.data)}`} 
                                            alt="" className="img-rounded"/>
                                    </div>
                                    <div className="card-body">
                                        <div className="profile-image-edit">
                                            <form>
                                                <div className="avatar-change-button">
                                                    <input type="button" className="btn btn-secondary" name="changeAvatar" value="Edit"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="coll">
                            <div className="card">
                                <div className="card-body">
                                        <h3 className="card-title">
                                            { `${ this.props.currentUser.surname }  ${this.props.currentUser.name}`}
                                        </h3>
                                </div>
                                <div className="card-body">
                                    <div className="user-email">
                                        <p>
                                            { this.props.currentUser.email }
                                        </p>
                                    </div>
                                    <br/>
                                    <div className="user-birthday">
                                        <p>
                                            { Converter.dateToNormalDate(this.props.currentUser.birthday) }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}
 

// style="width:50px;"
export default Profile;