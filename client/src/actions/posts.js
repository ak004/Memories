import * as api from '../api';

// action Creators



export const getPost = (id) => async(dispatch) => {

    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.fetchPost(id);
        console.log("check the data in action: ", data);
            dispatch({ type: 'FETCH_POST', payload: data});
            dispatch({ type: 'END_LOADING'})

    } catch (error) {
        console.log(error);
    }
}





export const getposts = (page) => async(dispatch) => {

    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.fetchPosts(page);
        console.log("check the data in action: ", data);
            dispatch({ type: 'FETCH_ALL', payload: data});
            dispatch({ type: 'END_LOADING'})

    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);
        dispatch({ type: 'FETCH_BY_SEARCH', payload: data});
        dispatch({ type: 'END_LOADING'})
        console.log(data);
    }catch(error) {
        console.log("error in action getpostbysearch ===", error);
    }
}

export const createPost = (post, history) => async(dispatch) => {
    console.log("in post action client" , post);
    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`)
        dispatch({ type: 'CREATE', payload:  data})
        dispatch({ type: 'END_LOADING'})
    } catch (error) {
        console.log("in action- createPost" , error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
     const { data } = await api.updatePost(id, post);
     dispatch({ type:  "UPDATE", payload: data })
     dispatch({ type: 'END_LOADING'})
    } catch (error) {
        console.log("in action- updatePost" , error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
      await api.deletePost(id);
  
      dispatch({ type: "DELETE", payload: id });
      dispatch({ type: 'END_LOADING'})
    } catch (error) {
      console.log(error);
    }
  };

export const likePost = (id) => async (dispatch) => {
try {
    dispatch({ type: 'START_LOADING'})
    const { data } = await api.likePost(id);
    dispatch({ type:  "LIKE", payload: data })
    dispatch({ type: 'END_LOADING'})
} catch (error) {
    console.log("in action- updatePost" , error)
}
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
    const { data } =  await api.comment(value, id);
    dispatch({ type: 'COMMENT', payload: data});
    return data.comments;
    console.log("commentsData====++", data);
    } catch (error) {
        console.log("error in action comment section ", error)
    }
}

