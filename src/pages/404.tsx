import { Component } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import Icon from '../components/Nav/Icon'
import '../styles/404.css'

const FourOhFour: Component<any> = () => {
  const [t] = useI18n()
  const search = (ev: Event) => {
    // TODO: search logix
    console.debug(ev)
  }
  return (
    <div class='error-page-wrapper'>
      <div class='error-page'>
        <div class='container'>
          <div class='row'>
            <NavLink href='/'>
              <img class='error-image' src='/error.svg' alt='error' width='auto' height='auto' />
            </NavLink>
          </div>
          <div class='row'>
            <div class='col-md-2 col-sm-3 col-sm-offset-2'>
              <div class='error-text'>
                <div>{t('Error')}</div>
                <div class='big ng-binding'>404</div>
              </div>
            </div>
            <div class='col-sm-4'>
              <div class='error-explain'>
                <p class='text-left'>{t(`You've reached a non-existed page`)}</p>
                <p class='text-left'>{t('Try to find another way')}:</p>
                <form class='errorform ng-pristine ng-valid' action='/search' method='get'>
                  <div class='discours-form'>
                    <div class='form-group'>
                      <input class='form-control' type='text' name='q' placeholder={t('Search')} />
                      <button onClick={search} class='col-sm-2'>
                        <Icon name='search' />
                      </button>
                    </div>
                  </div>
                </form>
                <p class='text-center'>
                  <NavLink class='black-link' href='/'>
                    {t('Back to mainpage')}
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourOhFour
