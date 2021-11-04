import React, { Component , Fragment} from 'react'
import {connect} from 'react-redux'
import {HeaderContent} from '../../../components/atom/headerContent/headercontent'
import {Card} from '../../../components/moleculs/card'
import {Form} from '../../../components/moleculs/form'
import {PopUp} from '../../../components/moleculs/popUp'
import { deleteData, getData, saveData, updateData , inProgres, getDataInProgres,Completed ,getDataCompleted} from '../../../config/redux/action/action'
import './dashboard.css'

class dashboard extends Component {

    state ={
        id: '',
        judul:'',
        deadline: '',
        content: '',
        btn:'save',
        dataNextUp:[],
        btnIsLogin:'Login',
        isLogin: false
    }

    onHandleDelete = (del) => {
        const answer = window.confirm(`Apakah anda yakin ingin menghapus ${del.judul || del.value.judul}`)
        const user = JSON.parse(localStorage.getItem('dataUser'))
        if(answer){
            this.props.deleteData(del.id,user.id,"move",'inProgres')
            this.props.deleteData(del.id,user.id,"move",'Completed')
            this.props.deleteData(del.id,user.id,"move",'nextUp')
        }
    }
    
    onHandleMove = (data , action) =>{
        const user = JSON.parse(localStorage.getItem('dataUser'))
        switch (action) {
            case "inProgres":
                this.props.completed(data,user.id)
                this.props.deleteData(data.id,user.id,"move",'inProgres')
                break;
            case "Completed":
                this.props.deleteData(data.id,user.id,"move",'Completed')
                break;
            case "NextUp":
                this.props.inProgres(data,user.id)
                this.props.deleteData(data.id,user.id,"move",'nextUp')
                break;
            default:
                break;
        }
        
    }
    
    componentDidMount (){
        const dataUser = JSON.parse(localStorage.getItem('dataUser'))
        if(dataUser){
            this.setState({
                ...this.state,
                btnIsLogin: "Log Out",
                isLogin: true
            })
            
            this.props.getUserData(dataUser.id)
            this.props.getDataInProgres(dataUser.id)
            this.props.getDataCompleted(dataUser.id)
        }
        
    }

    componentDidUpdate(){
        this.getDifferrentDay()
    }

    showPopUpForm = (data) => {
        const form = document.querySelector('.Formnewproject')
        if(this.state.isLogin){
            this.props.changePopUpHow()
            const {popUpForm} = this.props;
            let dataFixed = data
            // eslint-disable-next-line no-unused-expressions
            data.value !== undefined ? dataFixed = data.value: '';
            if(popUpForm && dataFixed.step !== "Completed"){
                this.setState({
                    judul:'',
                    deadline: '',
                    content: '',
                })
                form.style.display = 'block'
            }
        }
    }

    closePopUpForm = () =>{
        const form = document.querySelector('.Formnewproject')
        const {popUpForm} = this.props;
        if(popUpForm){
            this.setState({
                ...this.state,
                btn: 'Save'
            })
            form.style.display = 'none'
        }
    }


    onHandleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]:e.target.value
        })
    }

    cursorHighlighText = () => {
        const popUpTxt = document.querySelector('.popUp')
        const btn = document.querySelector('.btnNewProject')
        if(!this.state.isLogin){
            popUpTxt.style.display = 'flex'
            btn.classList.add('disableBtn')
            setTimeout(() => {
                popUpTxt.style.display = 'none'
            }, 2000);
        }
    }

    onHandleSubmit =  async () => {
        const {judul,deadline,content,step} = this.state
        const dataUser = JSON.parse(localStorage.getItem('dataUser'))
        const dataForm = {
            judul: judul,
            deadline: deadline,
            content: content,
            userId: dataUser.id
        }
        if(judul !== '' && deadline !== '' && content !== '' ){
            if(this.state.btn === "Update"){
                const succes = await this.props.updateData(this.state,step)
                if(succes){
                    this.setState({
                        judul:'',
                        deadline: '',
                        content: '',
                    })
                }
            }else {
                const succes = await this.props.addToApi(dataForm).catch(err => err)
                if(succes){
                    this.setState({
                        judul:'',
                        deadline: '',
                        content: '',
                    })
                }
            }
        }else {
            alert('Semua data harus diisi')
        }
    }

    isLogin = () => {
        const { history } = this.props;
        const dataUser = JSON.parse(localStorage.getItem('dataUser'))
        if(dataUser){
            localStorage.removeItem('dataUser')
        }
        history.push('/login')
    }

    getDifferrentDay = () => {
        const {dataNotes, dataInProgres } = this.props
        const data =  [...dataNotes,...dataInProgres]

        const dataUser = []
        data.forEach(e => {
            //mengambil nilai data dari redux
            const {deadline} = e.value
            //tanggal hari ini
            const dateF = new Date()
            //convert sting to new date
            const deadlineF = new Date(deadline)
            //mnegbuah data tangal ke string lalu ambil hanya d/m/date
            const deadlineDay = deadlineF.toDateString().slice(0,10)
            //menghitung berapa milisecond per hari
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            //mengubah date ke milosecond
            const utc1 = Date.UTC(dateF.getFullYear(), dateF.getMonth(), dateF.getDate());
            const utc2 = Date.UTC(deadlineF.getFullYear(), deadlineF.getMonth(), deadlineF.getDate());
            //megurangi today(utc1) - deadline(utc2) / milisecond per hari
            const dayLeft = Math.floor((utc2 - utc1) / _MS_PER_DAY)
            //membuat objek final data
            const finalData = {
                id: e.id,
                judul: e.value.judul,
                deadlineLeft: dayLeft,
                content: e.value.content,
                date: deadlineDay,
                deadline: e.value.deadline,
                step: e.value.step
            }
            //memindahkan data finaldata ke array
            dataUser.push(finalData)
        })
        // mengembalikan dataUser
        return dataUser
    }

    onUpdateData = (el,data) => {
        if(el.target.localName !== 'button'){
            this.showPopUpForm(data)
            this.setState({
                ...this.state,
                id: data.id,
                judul: data.judul,
                deadline: data.date,
                content: data.content,
                step: data.step,
                btn:'Update'
            })
        }
    }


    render(){
        const {judul,deadline,content,btnIsLogin} = this.state
        const {dataNotes , dataInProgres ,completedState} = this.props
        return(
            <div className="container">
                <div className="topBar" >
                    <div className="logo">
                        <p>Daily Task</p>
                    </div>
                    <div className="nav">
                        <div className="newProject">
                            <button className='btnNewProject' onMouseOver={() => this.cursorHighlighText('newProject')} onClick={() => this.showPopUpForm('h')}>New Project +</button>
                        </div>
                        <div className="circle">
                            <button onClick={this.isLogin}>{btnIsLogin}</button>
                        </div>
                    </div>
                    <PopUp Title='you must login first' />
                </div>
                <div className="mainContent">
                    <div className="txtHeader">
                        <p>
                            Click <span>New Project</span> To create new list.
                        </p>
                    </div>
                    <div className="content">
                        <div className="nextUp">
                            <HeaderContent title="Next Up" length={dataNotes.length}/>
                            <div className="nextUpContent">
                                {   
                                    dataNotes.length > 0 ? 
                                    <Fragment>
                                        {   
                                            this.getDifferrentDay().slice(0,dataNotes.length).map(e => {
                                                return(
                                                    <Card  key={e.id} id={e.id} titleCard={e.judul} content={e.content} createdate={e.date}
                                                    deadline={`${e.deadlineLeft} Days left`} onClickCard={(el) => this.onUpdateData(el,e)} onClickDel={() => this.onHandleDelete(e)} onClickMove={() => this.onHandleMove(e,"NextUp")}/>
                                                )
                                            })
                                        }
                                    </Fragment>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="inProgres">
                            <HeaderContent title="In Progress" length={dataInProgres.length}/>
                            <div className="inProgresContent">
                            {   
                                    dataInProgres.length > 0 ? 
                                    <Fragment>
                                        {   
                                            this.getDifferrentDay().slice(this.props.dataNotes.length,).map(e => {
                                                return(
                                                    <Card key={e.id} id={e.id} titleCard={e.judul} content={e.content} createdate={e.date}
                                                    deadline={`${e.deadlineLeft} Days left`} onClickCard={(el) => this.onUpdateData(el,e)} onClickDel={() => this.onHandleDelete(e)} onClickMove={() => this.onHandleMove(e,"inProgres")}/>
                                                )
                                            })
                                        }
                                    </Fragment>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="complete">
                            <HeaderContent title="Completed" length={completedState.length}/>
                            <div className="completeContent">
                                {
                                    completedState.length > 0 ?
                                    <Fragment>
                                        {
                                            completedState.map(e => {
                                                const date = new Date(e.value.deadline).toDateString().slice(0,10)
                                                
                                                return(
                                                    <Card key={e.id} id={e.id} titleCard={e.value.judul} content={e.value.content} createdate={date}
                                                    deadline="Done" onClickCard={(el) => this.onUpdateData(el,e)} onClickDel={() => this.onHandleDelete(e)} onClickMove={() => this.onHandleMove(e,"Completed")}/>
                                                )
                                            })
                                        }
                                    </Fragment>
                                    :null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Form className='Formnewproject' onClick={this.onHandleSubmit} title={this.state.btn} loading={this.props.isLoading}
                onClickClose={this.closePopUpForm} Judul={judul} Deadline={deadline} Conten={content} onChange={(e) => this.onHandleChange(e)}/>
                
            </div>
            
            )
        }
    }

const reduxState = (state) => ({
    popUpForm: state.popUpForm,
    user: state.user,
    isLoading: state.isLoading,
    sendindSucces: state.sendindSucces,
    dataNotes: state.dataNotes,
    dataInProgres: state.inProgress,
    completedState: state.completed
})

const reduxReducer = (dispatch) => ({
    changePopUpHow: () => dispatch({type:"CHANGE_POPUPFORM",value: true}),
    addToApi: (data) => dispatch(saveData(data)),
    getUserData: (data) => dispatch(getData(data)),
    updateData: (data,action) => dispatch(updateData(data, action)),
    deleteData: (id,userId,type,action) => deleteData(id,userId,type,action),
    inProgres: (data,userId) => inProgres(data,userId),
    completed: (data,userId) => Completed(data,userId),
    getDataInProgres: (id) => dispatch(getDataInProgres(id)),
    getDataCompleted: (id) => dispatch(getDataCompleted(id))
})

export default connect(reduxState, reduxReducer)(dashboard)