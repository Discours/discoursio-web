import { For, createComputed } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useStore } from '../../store'
import ListErrors from '../../components/ListErrors'

export default (props) => {
  const [store, { createArticle, updateArticle }] = useStore()
  const [state, setState] = createStore({ topicInput: '', topicList: [] })
  const updateState = (field) => (ev) => setState(field, ev.target.value)
  const handleAddTopic = () => {
    if (state.topicInput) {
      setState((s) => {
        s.topicList.push(s.topicInput.trim())
        s.topicInput = ''
      })
    }
  }
  const handleRemoveTopic = (topic) => {
    !state.inProgress && setState('topicList', (topics) => topics.filter((t) => t !== topic))
  }
  const handleTopicInputKeyDown = (ev) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault()

        handleAddTopic()
        break
      default:
        break
    }
  }
  const submitForm = (ev) => {
    ev.preventDefault()
    setState({ inProgress: true })
    const { inProgress, topicInput, ...article } = state

    ;(props.slug ? updateArticle : createArticle)(article)
      .then((article) => (location.hash = `/article/${article.slug}`))
      .catch((errors) => setState({ errors }))
      .finally(() => setState({ inProgress: false }))
  }

  createComputed(() => {
    let article

    if (!props.slug || !(article = store.articles[props.slug])) return

    setState(article)
  })

  return (
    <div class='editor-page'>
      <div class='container page'>
        <div class='row'>
          <div class='col-md-10 offset-md-1 col-xs-12'>
            <ListErrors errors={state.errors} />
            <form>
              <fieldset>
                <fieldset class='form-group'>
                  <input
                    type='text'
                    class='form-control form-control-lg'
                    placeholder='Article Title'
                    value={state.title}
                    onChange={updateState('title')}
                    disabled={state.inProgress}
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    type='text'
                    class='form-control'
                    placeholder="What's this article about?"
                    value={state.description}
                    onChange={updateState('description')}
                    disabled={state.inProgress}
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <textarea
                    class='form-control'
                    rows='8'
                    placeholder='Write your article (in markdown)'
                    value={state.body}
                    onChange={updateState('body')}
                    disabled={state.inProgress}
                  ></textarea>
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    type='text'
                    class='form-control'
                    placeholder='Enter topics'
                    value={state.topicInput}
                    onChange={updateState('topicInput')}
                    onBlur={handleAddTopic}
                    onKeyup={handleTopicInputKeyDown}
                    disabled={state.inProgress}
                  />
                  <div class='topic-list'>
                    <For each={state.topicList}>
                      {(topic) => (
                        <span class='topic-default topic-pill'>
                          <i class='ion-close-round' onClick={[handleRemoveTopic, topic]} />
                          {topic}
                        </span>
                      )}
                    </For>
                  </div>
                </fieldset>
                <button
                  class='btn btn-lg pull-xs-right btn-primary'
                  type='button'
                  disabled={state.inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
