import React, {useState} from 'react';
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts'

const Post =  ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result.googleId || user?.result?._id;
    const hasLiked =  post.likes.find((like) => like === userId);
    const handleLike = async () => {
      dispatch(likePost(post._id));
      if(hasLiked) {
        setLikes(post.likes.filter((id) => id !== userId))
      }else {
        setLikes([ ...post.likes,userId]);
      }
    } 

    const Likes = () => {
      if(likes.length > 0) {
        return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize='small'/> &nbsp;{likes.length > 2 ? `you and ${likes.length -1} other` : `${likes.length} like${likes.length > 1 ? 's': ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize = "small"/> &nbsp; {likes.length} {likes.length === 1 ? 'Like': 'Likes'}</>
        );
      }
      return <><ThumbUpAltOutlined fontSize='small'/> &nbsp; Like</>
    }
     const openPost = () => history.push(`/posts/${post._id}`);

    return(
        <Card className={classes.card} raised elevation = {6}>
          <ButtonBase
          component="span"
          name="test"
          className={classes.cardAction}
          onClick = {openPost}
          >

        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

        <div className={classes.overlay2} name="edit">
          <Button style={{ color: 'white' }} size="small" onClick={(e) =>{ 
            e.stopPropagation();
            setCurrentId(post._id)}}><MoreHorizIcon fontSize="medium" /></Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled = {!user?.result} onClick={handleLike}>
            <Likes />
             </Button>
             {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" /> Delete
                </Button>
             )}
        </CardActions>
      </Card>
    );
}

export default Post;
