function solve() {

    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        };

        toString() {
            return `Post: ${this.title}\n` + `Content: ${this.content}`;
        };
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.commentArr = [];
        };

        addComment(comment) {
            this.commentArr.push(comment);
        };

        toString() {
            let result = super.toString() + `\nRating: ${this.likes - this.dislikes}`;
            if (this.commentArr.length > 0) {
                result += '\nComments:\n';
                result += this.commentArr.map(c => ` * ${c}`).join('\n');
            }
            return result;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = Number(views);
        };

        view() {
            this.views++;
            return this;
        };

        toString() {
            return super.toString() + `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    };
}

let posts = solve();

let post = new posts.Post('lucy', 'sci-fi');
console.log(post.toString());

let newPost = new posts.SocialMediaPost('neZnam', 'NZ', 5, 10);
newPost.addComment('Hello');
newPost.addComment('Hello2');
console.log(newPost.toString());

let blog = new posts.BlogPost('Nakov', 'SoftUni', 12);
console.log(blog);
blog.view();
blog.view();
blog.view();
blog.view();
console.log(blog.toString());