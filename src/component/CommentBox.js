import React, { useState,useEffect} from 'react';
import {useForm}  from 'react-hook-form';
import {useDispatch,useSelector} from 'react-redux';
import {fetchCommentOfPlayer} from '../redux/comment/actions';
import axios from 'axios';
import  './CommentBox.scss';

const CommentBox = (props) => {

    const [postVal,setPostVal] = useState("");
    const {register,handleSubmit,reset } = useForm();
    const id = props.id;
    const url = 'http://localhost:3001/api/public/v1/comments/'+id;
    const dispacth = useDispatch();
    const comments = useSelector(state => state.comments.commentsOfPlayer);

    useEffect(() => {
        dispacth(fetchCommentOfPlayer(id))
    },[dispacth,id])


    

    const onSubmit = (data) => {
        setPostVal([...postVal,<div  id="display-data">{data.message}</div>])
        axios.post(url,data.message)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        reset({})
    }
    
    return (
        <div>
            <div className='comment-box mb-2'>
                {comments.map((comment,index) => 
                    <div  id="display-data" key={index}>{comment.comment}</div>
                )}
                {postVal}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea  rows='2' name="message" className='textarea' ref={register} />
                <div className="mt-2">
                    <input type="submit" className='submit'/>
                </div>
            </form>
        </div>
    );

}

export default CommentBox;