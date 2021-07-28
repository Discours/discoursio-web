/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// rewritten from
// https://github.com/ultimaup/ultima/blob/1264a109c6ee87fc2dbdd1566969772dd70b46c8/mgmt/gitea.js

import got from 'got'
import { CookieJar } from 'tough-cookie'

const {
  GITEA_URL,
  GITEA_COOKIE_NAME,
  TEMPLATE_OWNER_GITEA_USERNAME,
  GITEA_ACCOUNT,
  GITEA_PASSWORD,
} = process.env

const base64 = (str) => Buffer.from(str).toString('base64')
const b64d = (data) => Buffer.from(data, 'base64').toString()

const TOKEN = base64(`${GITEA_ACCOUNT}:${GITEA_PASSWORD}`)
const giteaFetch = (endpoint, opts = {}, asUser = null) => {
  const conf = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${TOKEN}`,
      ...(asUser ? { Sudo: asUser } : {}),
      ...(opts['headers'] || {}),
    },
    ...opts,
  }

  return got(`${GITEA_URL}${endpoint}`, conf)
}

const giteaStream = (url, asUser = null) =>
  got.stream(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${TOKEN}`,
      ...(asUser
        ? {
            Sudo: asUser,
          }
        : {}),
    },
  })

// -------------------- USER -----------------------------------

const register = ({ username, password, imageUrl, name, email }) =>
  giteaFetch('/api/v1/admin/users', {
    method: 'post',
    body: JSON.stringify({
      email,
      full_name: name,
      login_name: username,
      username,
      avatar_url: imageUrl,
      must_change_password: false,
      password,
      send_notify: false,
      source_id: 0,
    }),
  })

const ensureGiteaUserExists = async (username) => {
  try {
    const r = await giteaFetch('/api/v1/user', {}, username)
    console.log(r)
    return true
  } catch (e) {
    if (!e.message.includes('404')) {
      console.error('gitea registration check failed', e)
      throw e
    }
  }
}

const loginOrRegister = async ({
  username,
  password,
  imageUrl = '',
  email,
}) => {
  try {
    await register({ username, password, imageUrl, name, email })
  } catch (e) {
    console.error('gitea registration failed', e)
    throw e
  }

  await giteaFetch('/api/v1/user', {}, username)
}

const getCsrf = (cookieJar) =>
  cookieJar.toJSON().cookies.find(({ key }) => key === '_csrf').value

const login = async (username, password) => {
  const cookieJar = new CookieJar()

  await giteaFetch('/user/login', {
    cookieJar,
    headers: { Authorization: undefined },
  })

  const _csrf = getCsrf(cookieJar)
  const loggedIn = await got.post(`${GITEA_URL}/user/login`, {
    cookieJar,
    form: {
      user_name: username,
      password,
      _csrf,
    },
    followRedirect: false,
  })

  return {
    cookieJar,
    loggedIn,
  }
}

const getGiteaSession = async (username, password) => {
  const { cookieJar, loggedIn } = await login(username, password)
  const sessionId = cookieJar
    .toJSON()
    .cookies.find(({ key }) => key === GITEA_COOKIE_NAME).value

  if (loggedIn.statusCode === 302) {
    return sessionId
  } else {
    return null
  }
}

const reportStatus = (
  token,
  repo,
  hash,
  { targetUrl, context, description },
  state
) => {
  return giteaFetch(token, `/api/v1/repos/${repo}/statuses/${hash}`, {
    method: 'post',
    body: {
      target_url: targetUrl,
      context,
      description,
      state,
    },
  })
}

const addSshKey = (username, { key, readOnly = false, title }) => {
  return giteaFetch(`/api/v1/admin/users/${username}/keys`, {
    method: 'post',
    body: JSON.stringify({
      key,
      read_only: readOnly,
      title,
    }),
  }).json()
}

let templateUser

const listTemplateRepos = async (token) => {
  if (!templateUser) {
    templateUser = await getUser(TEMPLATE_OWNER_GITEA_USERNAME)
  }
  const { data } = await giteaFetch(
    token,
    `/api/v1/repos/search?template=true&uid=${templateUser.id}&exclusive=true`
  ).json()

  return data
}

const getUser = (username) => giteaFetch(`/api/v1/user`, {}, username).json()

const getUserRepos = async ({ username }) => {
  const user = await getUser(username)
  const { data } = await giteaFetch(
    `/api/v1/repos/search?uid=${user['id']}&limit=1000`,
    {},
    username
  ).json()

  return data.sort((a, b) => {
    return b.pushed_at - a.pushed_at
  })
}

// ----------------- REPOSITORY -----------------------------

const getRepo = async ({ username }, { id }) => {
  return giteaFetch(`/api/v1/repos/${id}`, {}, username).json()
}

const getLatestCommitFromRepo = async (token, { owner, repo }) => {
  const [commit] = await giteaFetch(
    token,
    `/api/v1/repos/${owner}/${repo}/commits`
  ).json()
  return commit
}

const createRepoFromTemplate = async (
  { username, password },
  { name, description, priv, templateId } // NOTE: use priv keyname here
) => {
  const { cookieJar } = await login(username, password)
  const currentUser = await getUser(username)
  const loggedInGiteaUserId = currentUser['id']
  try {
    await got.get(`${GITEA_URL}/repo/create`, {
      cookieJar,
    })

    const _csrf = getCsrf(cookieJar)

    const result = await got.post(`${GITEA_URL}/repo/create`, {
      cookieJar,
      form: {
        repo_name: name,
        private: priv ? 'on' : undefined,
        description: description || '',
        repo_template: templateId,

        _csrf,
        uid: loggedInGiteaUserId,

        git_content: 'on',
        issue_labels: undefined,
        gitignores: undefined,
        license: undefined,
        readme: 'Default',
        default_branch: undefined,
      },
      followRedirect: false,
    })
    if (
      result.statusCode === 302 &&
      result.headers.location === `/${username}/${name}`
    ) {
      return {
        id: `${username}/${name}`,
      }
    }
    if (result['statusCode'] === 302) {
      return false
    }
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.body)
    }
    throw e
  }
}

const getFile = async (name, { username, owner, repo, branch }) => {
  const path = name
  try {
    const { sha, content } = await giteaFetch(
      `/api/v1/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        method: 'get',
      },
      username
    ).json()

    return {
      sha,
      content: b64d(content),
    }
  } catch (e) {
    if (e.message.toLowerCase().includes('not found')) {
      return {
        content: '',
        sha: null,
      }
    }
    console.error(e)
    throw e
  }
}

const setFile = async (
  token: string,
  name: string,
  { username, owner, repo, branch }: any,
  { message, sha }: any,
  content: string
) => {
  const path = name

  const existing = await getFile(name, {
    username,
    owner,
    repo,
    branch,
  })

  const method = existing.content ? 'put' : 'post'

  const data = await giteaFetch(
    `/api/v1/repos/${owner}/${repo}/contents/${path}`,
    {
      body: JSON.stringify({
        message,
        sha,
        content: base64(content),
        branch,
      }),
      method,
    },
    username
  ).json()

  return data
}

export default {
  ensureGiteaUserExists,
  loginOrRegister,

  getGiteaSession,
  reportStatus,
  giteaStream,
  addSshKey,
  getRepo,
  getUserRepos,
  getLatestCommitFromRepo,
  getFile,
  setFile,

  listTemplateRepos,
  createRepoFromTemplate,
}
