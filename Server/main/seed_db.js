//Seed DB variables
var user_values = []
var user_counter = 0

var posts_values = []
var posts_counter = 0

var comments_values = []
var comments_counter = 0


function seed_users() {
  while (user_counter < 20) {
    user_counter++;
    var username = "test_username"  + user_counter
    var email = "text_email" + user_counter
    var num_posts = "test_num_posts" + user_counter
    var num_comments = "test_num_comments" + user_counter
    user_values.push(username, email, num_posts, num_comments)
  }
}


function seed_posts() {
  while (posts_counter < 20 ) {
    posts_counter++;
    var post = { title: "test title" + posts_counter,
                 body: "test body" + posts_counter }
    posts_values.push(post)
  }
}

function seed_comments() {
  while(comments_counter < 20) {
    comments_counter++;
    var comment = "test comment"
    comments_values.push(comment)
  }
}

function seed_db() {
  seed_posts();
  seed_users();
  seed_comments();
}

seed_db();


router.post('/api/post/seeddb', (req, res, next) => {
  for(i = 0; i < posts_values.length; i++) {
    var values = [posts_values[i].title, posts_values[i].body]
    console.log(values)
    pool.query('INSERT INTO posts(title, body, date_created) VALUES($1, $2, NOW());', values, (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log(q_res)
      res.json(q_res.rows);
    });
  }
});
