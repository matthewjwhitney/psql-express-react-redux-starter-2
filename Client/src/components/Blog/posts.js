import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import * as ACTIONS from '../../store/actions/actions';
import axios from '../../utils/axios_instance';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import { Transition  } from 'react-spring';
import { animated } from 'react-spring';
import Pagination from "react-js-pagination";

import './Blog_Styles/blog_styles.css';


const defaultStyles = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px'
}


class Posts extends Component {
  constructor() {
    super()
    this.add_posts_to_state = this.add_posts_to_state.bind(this)
    this.state = {
         posts: [],
         posts_search: [],
         posts_search_motion: [],
         posts_motion: [],
         num_posts: 0,
         page_range: 0,
         activePage: 1,
         posts_per_page: 5,
         posts_slice: [],
         opacity: 0,
         card_width: 0,
         card_height: 0
       }
  }

  componentDidMount() {
    this.handleTransition();
    axios.get('api/get/allposts')
    .then(res => this.props.posts_success(res.data))
    .then(() => this.add_posts_to_state(this.props.dbposts))
    .catch(function (error) {
        console.log(error);
      });
    this.setCardSize()
   }

   setCardSize = () => {
     if(window.innerWidth < 750) {
       this.setState({card_width: 400, card_height: 270})
     } else {
       this.setState({card_width: 500, card_height: 300})
     }
   }

   handleTransition = () => (
     setTimeout(() => this.setState({opacity: 1}), 400 )
   )


   slice_posts = () => {
      const indexOfLastPost = this.state.activePage * this.state.posts_per_page
      const indexOfFirstPost = indexOfLastPost - this.state.posts_per_page
      console.log( indexOfLastPost)
      console.log(indexOfFirstPost)

      this.setState({posts_slice: this.state.posts.slice(indexOfFirstPost, indexOfLastPost) })
    }


   add_posts_to_state = (posts) => {
     this.setState({posts: [...posts]});
     this.setState({num_posts: this.state.posts.length})
     this.setState({page_range: this.state.num_posts/5})

     this.slice_posts();
     this.animate_posts();
   }

   animate_posts = () => {
     this.setState({posts_motion: [] })
     let i = 1
     this.state.posts_slice.map(post => {  // eslint-disable-line
       setTimeout(() => { this.setState({posts_motion: [...this.state.posts_motion, post]}) }, 400 * i );
       i++;
     })
   }

   handlePageChange = (pageNumber) => {
     this.setState({activePage: pageNumber});

     setTimeout(() => { this.slice_posts() }, 50 )
     setTimeout(() => { this.animate_posts() }, 100 )
    }

   animate_search_posts = () => {
     this.setState({posts_search_motion: [] })
     let i = 1
     this.state.posts_search.map(post => { // eslint-disable-line
       setTimeout(() => { this.setState({posts_search_motion: [...this.state.posts_search_motion, post]}) }, 50 * i );
       i++;
     })
   }

   add_search_posts_to_state = (posts) => {
     this.setState({posts_search: []});
     this.setState({posts_search: [...posts]});

     this.animate_search_posts();
   }


   handleChange = (event) => {
      const search_query = event.target.value
      axios.get('api/get/searchpost', {params: {search_query: search_query} })
      .then(res => this.props.search_posts_success(res.data))
      .then(() => this.add_search_posts_to_state(this.props.db_search_posts))
      .catch(function (error) {
        console.log(error);
        })
    }


 RenderPosts = (post) => (
  <div>
     <Card className="CardStyles">
         <CardHeader
           title={<Link to={{pathname:"/post/" + post.post.pid, state:{post} }}>{ post.post.title }</Link>}
           subheader={
                     <div>
                       <div>{ post.post.date_created }</div>
                       <div>
                            <i className="material-icons">thumb_up</i>
                            <small className="notification-num-allposts"> { post.post.likes } </small>
                        </div>
                       <div> <span style={{fontWeight: 500, paddingRight: '5px'}}>By:</span>
                            <Link to={{pathname:"/user/" + post.post.author, state:{post} }}>  { post.post.author } </Link>
                        </div>
                     </div> }
         />
         <hr className="style-two" />
         <CardContent>
             <div style={{ overflow: 'hidden'}}>
               { post.post.body }
             </div>
         </CardContent>
       </Card>
    </div>
   );


 render() {
   return (
     <div>
      <div className="FlexPostButton">
      <div style={{opacity: this.state.opacity, transition: "opacity 2s ease" }}>
      { this.props.isAuthenticated
        ?  <Link to="/newpost">
              <Button variant="contained" color="primary">
                Add Post
              </Button>
            </Link>
        : <Link to="/signup">
              <Button variant="contained" color="primary">
                Sign Up to Add Post
              </Button>
            </Link>
          }
      </div>
      </div>

        <div style={{opacity: this.state.opacity, transition: "opacity 2s ease" }}>
          <TextField
            id="search"
            label="Search"
            margin="normal"
            onChange={this.handleChange}
          />
         </div>

          <div className="FlexColumn">
           { this.state.posts_search ?
             <Transition
               keys={this.state.posts_search_motion.map(post => post.pid)}
               from={{  opacity: 0, height: 0, width: 0, transition: "opacity .25s ease" }}
               enter={{ opacity: 1, height: this.state.card_height, width: this.state.card_width, transition: "opacity .25s ease" }}
               leave={{ opacity: 0, height: 0, width: 0}}
             >
                { this.state.posts_search_motion.map(post  => styles =>
                     <animated.div style={{...defaultStyles, ...styles}}>
                       <this.RenderPosts key={ post.pid } post={post} />
                        <br />
                     </animated.div>
                   )}
             </Transition>
           : null
           }
           </div>


        <div style={{opacity: this.state.opacity, transition: "opacity 2s ease" }}>
        <hr className="style-one"/>
        <h2> All Posts </h2>
        <div >
         { this.state.posts ?
           <Transition
             keys={this.state.posts_motion.map(post => post.pid)}
             from={{ opacity: 0, height: 0, width: 0 }}
             enter={{ opacity: 1,  height: this.state.card_height, width: this.state.card_width, transition: "opacity 2s ease" }}
             leave={{ opacity: 0, height: 0, width: 0 }}
           >
              { this.state.posts_motion.map(post  => styles =>
                   <animated.div style={{...defaultStyles, ...styles}}>
                     <this.RenderPosts key={ post.pid } post={post} />
                      <br />
                   </animated.div>
                 )}
           </Transition>
         : null
         }
         </div>
      </div>
       <div style={{opacity: this.state.opacity, transition: "opacity 2s ease" }}>
         <div className="FlexRow">
           <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.num_posts}
            pageRangeDisplayed={this.state.page_range}
            onChange={this.handlePageChange}
          />
        </div>
       </div>
      </div>
  )}
}



function mapStateToProps(state) {
  return {
      dbposts: state.posts_reducer.db_posts,
      db_search_posts: state.posts_reducer.db_search_posts,
      isAuthenticated: state.auth_reducer.isAuthenticated 
  };
}

function mapDispatchToProps (dispatch) {
  return {
    posts_success: (posts) => dispatch(ACTIONS.get_db_posts(posts)),
    search_posts_success: (posts) => dispatch(ACTIONS.get_search_posts(posts)),
    remove_search_posts: () => dispatch(ACTIONS.remove_search_posts())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);
