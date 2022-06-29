import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ModifyUserInfo from './ModifyUserInfo';
import ModifyTempPwd from './ModifyTempPwd';
import ModifyDeleteUser from './ModifyDeleteUser';
import ModifyMailing from './ModifyMailing';

function ModifyUser(props) {
    return(
        <DropdownButton id="InfoModiBtn" title="수정/발급/탈퇴" size="sm">
            <ModifyUserInfo user_n={props.user_n} user_id={props.user_id} name={props.name}></ModifyUserInfo>
            <ModifyTempPwd user_n={props.user_n} user_id={props.user_id} name={props.name}></ModifyTempPwd>
            <ModifyDeleteUser user_n={props.user_n} user_id={props.user_id} name={props.name}></ModifyDeleteUser>
            <ModifyMailing user_n={props.user_n} user_id={props.user_id}></ModifyMailing>
        </DropdownButton>
    )
}

export default ModifyUser;