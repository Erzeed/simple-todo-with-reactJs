import React, { Component } from 'react'
import './register.css'
import { Buttom } from '../../../components/atom/button/button';
import { connect } from 'react-redux'
import { registerPage } from '../../../config/redux/action/action';
class register extends Component {
    state = {
        email: '',
        password: '',
        type:"password"
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    onHandleSubmit = async () => {
        const {email , password} = this.state
        const {history} = this.props
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
                history.push('/login')
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
    onNewLogin = () => {
        const {history} = this.props
        history.push('/login')
    }
    render(){
        return(
            <div className='containerRegister'>
                <div className='register'>
                    <p>Register Now</p>
                    <form>
                        <input type='email' id='email' placeholder="Email" onChange={(data) => this.onHandleChange(data)} /><br/>
                        <input type={this.state.type} id='password' placeholder="Password" onChange={(data) => this.onHandleChange(data)}/><br/>
                        <input type='checkbox' onClick={(e) => this.onChecked(e)}/>
                        <label htmlFor='checkbox'>Show Password</label>
                    </form>
                    <Buttom onClick={this.onHandleSubmit} title='Register' loading={this.props.isLoading} />
                    <div className="registerNewAccount">
                        <p onClick={this.onNewLogin}>Login Now</p>
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
    loading: (data) => dispatch(registerPage(data))
})

export default connect(reduxState , reduxReducer)(register)