import { useState } from 'react';
import Comment from './Comment';
import ContentLike from './likeContent';

function ContentInteraction({ likes, comments, contentId, usersLike }) {
    const [commentaries, setCommentaries] = useState(comments);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [newComment, setNewComment] = useState('');

    let handlePressKey = async (e) => {
        /* e.preventDefault(); */
        if (e.key === 'Enter') {
            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth'),
                },
                body: JSON.stringify({
                    text: newComment,
                }),
            };
            fetch(
                'http://localhost:' + process.env.REACT_APP_BACKEND_PORT + '/' + contentId + '/comment',
                reqOptions
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.comments);
                    console.log(commentaries);
                    setCommentaries(data.comments);
                    setNewComment('');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    function openComment() {
        if (isCommentOpen === false) {
            setIsCommentOpen(true);
        } else {
            setIsCommentOpen(false);
        }
    }
    return (
        <>
            <div className='d-flex border-top border-danger mt-2 justify-content-between'>
                <ContentLike likes={likes} usersLike={usersLike} contentId={contentId} />

                <div onClick={openComment}>
                    <i className='fa-regular fa-comment me-1'></i>
                    {comments.length} commentaire(s)
                </div>
            </div>
            {isCommentOpen ? (
                <div className='border-top border-danger mt-2 '>
                    {commentaries.map((comment) => (
                        <Comment
                            key={'comment' + comment.id}
                            text={comment.text}
                            firstname={comment.user.firstname}
                            lastname={comment.user.lastname}
                            img={comment.user.imgUrl}
                            like={comment.like}
                            usersLike={comment.usersLike.users}
                        />
                    ))}

                    <form className='col-12 mt-1' onKeyPress={handlePressKey}>
                        <textarea
                            className='form-control'
                            id='exampleFormControlTextarea1'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows='1'
                            placeholder='donnez votre avis sur cette publication !'
                        ></textarea>{' '}
                    </form>
                </div>
            ) : null}
        </>
    );
}

export default ContentInteraction;
