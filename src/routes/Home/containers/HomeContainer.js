import { connect } from 'react-redux'
import { setUserData } from '../modules/home'
import Home from '../components/Home'

const mapDispatchToProps = {
  setUserData: (userData) => setUserData(userData)
}

const mapStateToProps = (state) => ({
  userData: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
