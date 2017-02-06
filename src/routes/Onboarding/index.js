import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'onboarding',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Onboarding = require('./containers/OnboardingContainer').default
      const reducer = require('./modules/onboarding').default
      injectReducer(store, { key: 'onboarding', reducer })
      cb(null, Onboarding)
    }, 'onboarding')
  }
})
