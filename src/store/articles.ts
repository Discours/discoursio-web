import { createResource, createSignal } from "solid-js";
const LIMIT = 34;

export default function createArticles(agent, actions, state, setState) {
  const [articleSource, setArticleSource] = createSignal();
  const [articles] = createResource(
    articleSource,
    (args, { value }) => {
      if (args[0] === "articles") {
        return $req(args[1]).then((theState) => {
          queueMicrotask(() => setState({ totalPagesCount: Math.ceil(theState.articlesCount / LIMIT) }));

          return theState.articles.reduce((memo, article) => {
            memo[article.slug] = article;

            return memo;
          }, {});
        });
      }

      const article = state.articles[args[1]];

      if (article) return value;

      return agent.Articles.get(args[1]).then((a) => ({ ...value, [args[1]]: a }));
    },
    { initialValue: {} }
  );

  function $req(predicate) {
    if (predicate.myFeed) return agent.Articles.feed(state.page, LIMIT);

    if (predicate.reviewed)
      return agent.Articles.reviwed(predicate.reviewed, state.page, LIMIT);

    if (predicate.tag) return agent.Articles.byTopic(predicate.tag, state.page, LIMIT);

    if (predicate.author) return agent.Articles.byAuthor(predicate.author, state.page, LIMIT);

    return agent.Articles.all(state.page, LIMIT, predicate);
  }

  Object.assign(actions, {
    setPage: (page) => setState({ page }),
    loadArticles(predicate) {
      setArticleSource(["articles", predicate]);
    },
    loadArticle(slug) {
      setArticleSource(["article", slug]);
    },
    async makeFavorite(slug) {
      const article = state.articles[slug];

      if (article && !article.favorited) {
        setState("articles", slug, (s) => ({
          favorited: true,
          favoritesCount: s.favoritesCount + 1
        }));

        try {
          await agent.Articles.favorite(slug);
        } catch (err) {
          setState("articles", slug, (s) => ({
            favorited: false,
            favoritesCount: s.favoritesCount - 1
          }));
          throw err;
        }
      }
    },
    async unmakeFavorite(slug) {
      const article = state.articles[slug];

      if (article && article.favorited) {
        setState("articles", slug, (s) => ({
          favorited: false,
          favoritesCount: s.favoritesCount - 1
        }));

        try {
          await agent.Articles.unfavorite(slug);
        } catch (err) {
          setState("articles", slug, (s) => ({
            favorited: true,
            favoritesCount: s.favoritesCount + 1
          }));
          throw err;
        }
      }
    },
    async createArticle(newArticle) {
      const { article, errors } = await agent.Articles.create(newArticle);

      if (errors) throw errors;

      setState("articles", { [article.slug]: article });

      return article;
    },
    async updateArticle(data) {
      const { article, errors } = await agent.Articles.update(data);

      if (errors) throw errors;

      setState("articles", { [article.slug]: article });

      return article;
    },
    async deleteArticle(slug) {
      const article = state.articles[slug];

      setState("articles", { [slug]: undefined });

      try {
        await agent.Articles.del(slug);
      } catch (err) {
        setState("articles", { [slug]: article });
        throw err;
      }
    }
  });

  return articles;
}