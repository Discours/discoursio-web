import { useStore } from '~/store'
import Notifications from '~/components/Nav/Notifications'
import { createStore } from 'solid-js/store'
import { useNavigate } from 'solid-app-router'

export default () => {
  const stact = useStore()
  const navigate = useNavigate()
  const store = stact[0]
  const { logout, updateUser } = stact[1]
  const [state, setState] = createStore({
    image: store.currentUser.image || '',
    username: store.currentUser.username,
    bio: store.currentUser.bio || '',
    email: store.currentUser.email,
    password: '',
    updatingUser: false,
    errors: []
  })
  const updateState = (field) => (ev) => setState(field, ev.target.value)
  const submitForm = (ev) => {
    ev.preventDefault()
    let user

    user = { ...state }

    if (!user.password) delete user.password

    if (!user.image) delete user.image

    setState({ updatingUser: true })
    updateUser(user)
      .then(() => navigate(`/@${user.username}`))
      .catch((errors) => setState({ errors }))
      .finally(() => setState({ updatingUser: false }))
  }

  return (
    <div class='settings-page'>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Your Settings</h1>
            <Notifications />
            <form onSubmit={submitForm}>
              <fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control'
                    type='text'
                    placeholder='URL of profile picture'
                    value={state.image}
                    onChange={updateState('image')}
                    disabled={state.updatingUser}
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='text'
                    placeholder='Your Name'
                    value={state.username}
                    onChange={updateState('username')}
                    disabled={state.updatingUser}
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <textarea
                    class='form-control form-control-lg'
                    rows='8'
                    placeholder='Short bio about you'
                    value={state.bio}
                    onChange={updateState('bio')}
                    disabled={state.updatingUser}
                  ></textarea>
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='text'
                    placeholder='Email'
                    value={state.email}
                    onChange={updateState('email')}
                    disabled={state.updatingUser}
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='password'
                    placeholder='Password'
                    value={state.password}
                    onChange={updateState('password')}
                    disabled={state.updatingUser}
                  />
                </fieldset>
                <button
                  class='btn btn-lg btn-primary pull-xs-right'
                  type='submit'
                  disabled={state.updatingUser}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button class='btn btn-outline-danger' onClick={() => (logout(), (location.hash = '/'))}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
