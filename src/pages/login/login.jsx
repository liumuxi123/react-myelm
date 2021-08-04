import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { updateCaptchas, loginFun } from "@api/login";
import IconFont from '@components/iconFont/iconFont.jsx'
import { saveUserInfo } from '../../store/action';
import PropTypes from "prop-types";
import { setStorage } from "@utils/index.js";
import "./login.less";

class login extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        saveUserInfo: PropTypes.func.isRequired
    }
    state = {
        captchas: '',
        username: '',
        password: '',
        captcha_code: ''
    }
    /** 更新验证码 */
    changeVerifyCode = async () => {
        const res = await updateCaptchas()
        if (res.status !== 0) {
            this.setState({
                captchas: res.code
            })
        }
    }
    mobileLogin = async () => {
        // this.props.form.getFieldsValue()
        this.props.form.validateFields(async (error, value) => {
            if (error) {
                console.log(error);
                return
            } else {
                const data = this.props.form.getFieldsValue()
                const res = await loginFun(data)
                if (res.status !== 0) {
                    this.props.saveUserInfo(res)
                    setStorage('user_id', res.user_id)
                    this.props.history.push('/profile')
                } else {
                    Toast(res.message)
                }

            }
        })
    }
    goBack = () => {
        this.props.history.goBack()
    }
    componentDidMount() {
        this.changeVerifyCode()
    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className="login-wrap">
                <div className="header">
                    <IconFont onClick={this.goBack} className="header-icon" type="icon-arrow-left" />
                    <span>登陆注册</span>
                    <span></span>
                </div>
                <div className="login-form-wrap">
                    <List>
                        <InputItem
                            {...getFieldProps('username', {
                                rules: [{ required: true, message: '请输入账号！' }]
                            })}
                            error={!!getFieldError('username')}
                            type="phone"
                            placeholder="账号"
                        ></InputItem>
                        <InputItem
                            {...getFieldProps('password', { rules: [{ required: true, message: '请输入密码！' }] })}
                            error={!!getFieldError('password')}
                            type="password"
                            placeholder="密码"
                        ></InputItem>
                        <List.Item style={{ paddingLeft: '0px' }}>
                            <div className="compose-input">
                                <InputItem
                                    placeholder="验证码"
                                    {...getFieldProps('captcha_code', { rules: [{ required: true, message: '请输入验证码！' }] })}
                                    error={!!getFieldError('captcha_code')}
                                ></InputItem>
                                <div className="captchas-wrap">
                                    <img src={this.state.captchas} alt="" />
                                    <div className="change-captchas" onClick={this.changeVerifyCode}>
                                        <p style={{ color: '#666' }}>看不清</p>
                                        <p style={{ color: '#0094f5' }}>换一张</p>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    </List>
                    <div className="tip-text">
                        <p>温馨提示：未注册过的账号，登录时将自动注册</p>
                        <p>注册过的用户可凭证账号密码登录</p>
                    </div>
                    <div className="login-button-wrap"><Button className="login-button" onClick={this.mobileLogin}>登陆</Button></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(login))
