import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'expense',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Expense = require('./containers/ExpenseContainer').default
      const reducer = require('./modules/expense').default
      injectReducer(store, { key: 'expense', reducer })
      cb(null, Expense)
    }, 'expense')
  }
})
