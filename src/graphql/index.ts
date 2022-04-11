// auth
import signIn from './q/sign-in'
import signOut from './q/sign-out'
import signUp from './q/sign-up'
import checkEmail from './q/sign-check'
import getSession from './q/my-session'
// tops
import topOverall from './q/top-overall'
import topViewed from './q/top-viewed'
import topMonth from './q/top-month'
import topRecent from './q/top-recent'
// article
import articleBySlug from './q/article-by-slug'
import articleComments from './q/article-comments'
import articleCreate from './q/article-create'
import articleUpdate from './q/article-update'
// author
import authorArticles from './q/author-articles'
import authorBySlug from './q/author-by-slug'
import authorComments from './q/author-comments'
import authorRoles from './q/author-roles'
import authorSubscribers from './q/author-subscribers'
import authorSubscriptions from './q/author-subscriptions'
// topic
import topicsAll from './q/topics-all'
import topicArticles from './q/topic-articles'
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
