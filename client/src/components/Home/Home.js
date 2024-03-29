import React , {useState,useEffect} from 'react'
import { Container ,  Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../forms/Form'
import { useDispatch } from "react-redux";  
import ChipInput from 'material-ui-chip-input';
import { useHistory, useLocation } from "react-router-dom";
import { getposts, getPostBySearch } from '../../actions/posts'
import Pagination from '../Pagination';
import useStyles from './styles'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId, setCurrentId] = useState(null); 
    const dispatch =  useDispatch(); 
    const query = useQuery();
    const classes = useStyles();
    const history = useHistory();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery")
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);



    const searchPost  = () =>  {
        if(search.trim() || tags) {
            // dispatch --> fetch search post 
            dispatch(getPostBySearch({search, tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            //search 
            searchPost();
        }
    } 
    const handleAdd = (tag) => setTags([ ...tags, tag])
    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete))
  return (
    <Grow in>
    <Container maxWidth = "xl">
        <Grid container justifyContent = "space-between" alignItems="stretch" spacing={3} className = {classes.gridContainer}>
            <Grid item xs= {12} sm = {6} md = {9}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs= {12} sm = {6} md = {3}>
                <AppBar className={classes.appBarSearch} position = "static" color = "inherit" >
                    <TextField
                     name='search'
                     variant='outlined'
                     label= "Search Memories"
                     onKeyPress={handleKeyPress}
                     fullWidth
                     value={search}
                     onChange = {(e) => setSearch(e.target.value)}
                     />
                     <ChipInput
                     style={{ margin: '10px 0' }}
                     value = {tags}
                     onAdd = {handleAdd}
                     onDelete = {handleDelete}
                     label = "Search Tags"
                     variant='outlined'
                     />
                     <Button onClick={searchPost} className = {classes.searchButton} variant = "contained" color = "primary"> Search</Button>
                </AppBar>
                <Form currentId = {currentId}  setCurrentId={setCurrentId}/>
                {(!searchQuery && !tags.length) && (
                <Paper  elevation = {6} className = {classes.pagination}>
                    <Pagination page={page} />
                </Paper>
                )}
            </Grid>

        </Grid>
    </Container>
</Grow>
  )
}

export default Home