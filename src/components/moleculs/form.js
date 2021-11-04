import { Buttom } from "../atom/button/button"

export const Form = ({  onClick,
                        title,
                        loading,
                        onClickClose,
                        Judul,
                        Deadline,
                        Conten,
                        onChange,
                        className}) => {
    return <div className={className} >
                <form action=''>
                    <label htmlFor="judul">Judul</label>
                    <input type="text" name="judul" placeholder="Judul" id="judul" onChange={onChange} value={Judul || ""}/>
                    <label htmlFor="date">Deadline</label>
                    <input type="date" id="deadline" name="date" onChange={onChange} value={Deadline || ""}/>
                    <label htmlFor="content">Conten</label>
                    <textarea name="content" id="content" placeholder="Content" cols="30" rows="10" onChange={onChange}value={Conten || ""}></textarea>
                </form>
                <div className="actionForm">
                    <Buttom onClick={onClick} title={title} loading={loading}/>
                    <button className='cancel' onClick={onClickClose}>Cancel</button>
                </div>
            </div>
}