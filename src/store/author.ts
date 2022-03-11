import { createResource, createSignal } from "solid-js";

export default function createAuthor(agent, actions, state, setState) {
  const [username, setUsername] = createSignal();
  const [author] = createResource(username, agent.Author.get);

  Object.assign(actions, {
    loadAuthor: setUsername,
    async follow() {
      if (state.author && !state.author.following) {
        setState("author", "following", true);

        try {
          await agent.Auth.follow(state.author.username);
        } catch (err) {
          setState("author", "following", false);
        }
      }
    },
    async unfollow() {
      if (state.author && state.author.following) {
        setState("author", "following", false);

        try {
          await agent.Auth.unfollow(state.author.username);
        } catch (err) {
          setState("author", "following", true);
        }
      }
    }
  });

  return author;
}