// auth
import signIn from './q/auth-login'
import signOut from './q/auth-logout'
import signUp from './q/auth-register'
import checkEmail from './q/auth-check'
import getSession from './q/auth-reset'
// articles
import topOverall from './q/articles-top-rated'
import topViewed from './q/articles-top-viewed'
import topMonth from './q/articles-top-month'
import topRecent from './q/articles-top-recent'
import topicArticles from './q/articles-for-topic'
import authorArticles from './q/articles-for-author'
// article
import articleBySlug from './q/article-by-slug'
import articleComments from './q/article-comments'
import articleCreate from './q/article-create'
import articleUpdate from './q/article-update'
// author
import authorBySlug from './q/author-by-slug'
import authorComments from './q/author-comments'
import authorRoles from './q/author-roles'
import authorSubscribers from './q/author-subscribers'
import authorSubscriptions from './q/author-subscriptions'
// topics
import topicsAll from './q/topics-all'
// comment
import commentCreate from './q/comment-create'
import commentUpdate from './q/comment-update'
import commentDestroy from './q/comment-destroy'

export default {
  topRecent,
  topMonth,
  topOverall,
  topViewed,
  signIn,
  signOut,
  signUp,
  checkEmail,
  getSession,
  authorArticles,
  authorBySlug,
  authorComments,
  authorRoles,
  authorSubscribers,
  authorSubscriptions,
  articleBySlug,
  articleComments,
  articleCreate,
  articleUpdate,
  topicsAll,
  topicArticles,
  commentCreate,
  commentDestroy,
  commentUpdate
}
