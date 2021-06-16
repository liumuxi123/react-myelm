import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class login extends Component {
    /** 更新验证码 */
    changeVerifyCode = () => {

    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="login-wrap">
                <div className="header">
                    <span className="icon-arrow-left"></span>
                    <span>登陆注册</span>
                </div>
                <div className="login-form-wrap">
                    <List>
                        <InputItem
                            {...getFieldProps('phone')}
                            type="phone"
                            placeholder="请输入电话号码"
                        >账号</InputItem>
                        <InputItem
                            {...getFieldProps('password')}
                            type="password"
                            placeholder="请输入密码"
                        >密码</InputItem>
                        <List.Item>
                            <InputItem
                                placeholder="请输入验证码"
                            >账号</InputItem>
                            <div>
                                <img src="" alt="" />
                                <div onClick={this.changeVerifyCode}>
                                    <p>看不清</p>
                                    <p>换一张</p>
                                </div>
                            </div>
                        </List.Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default createForm()(login)
