import React, { Component } from 'react'
import '../register/register.css'
import { Buttom } from '../../../components/atom/button/button';
import {connect} from "react-redux"
import { loginPage } from '../../../config/redux/action/action'


class login extends Component {

    state = {
        email : '',
        password: '',
        type:"password"
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        })
    }

    onHandleSubmit =  async () => {
        const {email , password} = this.state
        const { history } = this.props;

        if(email === '' || password === ''){
            alert('Email/Password harus di isi')
        }else{
            const res = await this.props.loading({email , password}).catch(err => err)
            
            if(res.email ===  this.state.email){
                this.setState({
                    ...this.state,
                    email : '',
                    password: ''
                })
                history.push('/')
            }else if(res.includes('wrong-password')){
                alert('Password yang anda masukkan salah')
            }else if(res.includes('user-not-found')){
                alert('Akun tidak ditemukan')
            }else if(res.includes('invalid-email')){
                alert('Email tidak ditemukan')
            }else if(res.includes('network-request-failed')){
                alert('Cek koneksi internet anda')
            }else if(res.includes('email-already-in-use')){
                alert('Email sudah digunakan')
            }else if(res.includes('weak-password')){
                alert('Password minimal 6 karakter')
            }
        }
    }

    onChecked = (e) => {
        if(e.target.checked){
            this.setState({
                ...this.state,
                type:"text"
            })
        }else{
            this.setState({
                ...this.state,
                type:"password"
            })
        }
    }
    onNewRegister = () => {
        const {history} = this.props
        history.push('/register')
    }

    render(){
        return(
            <div className='containerRegister'>
                <div className='register'>
                    <p>Login Now</p>
                    <form>
                        <input type='email' id='email' placeholder="Email" onChange={(data) => this.onHandleChange(data)} value={this.state.email} /><br/>
                        <input type={this.state.type} id='password' placeholder="Password" onChange={(data) => this.onHandleChange(data)} value={this.state.password}/><br/>
                        <input type='checkbox' onClick={(e) => this.onChecked(e)}/>
                        <label htmlFor='checkbox'>Show Password</label>
                    </form>
                    <Buttom onClick={this.onHandleSubmit} title='Login' loading={this.props.isLoading} />
                    <div className="registerNewAccount">
                        <p onClick={this.onNewRegister}>Register Now</p>
                    </div>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxReducer = (dispatch) => ({
    loading: (data) => dispatch(loginPage(data))
})

export default connect( reduxState , reduxReducer)(login)