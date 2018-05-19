import {connectWithStore} from '../../src/simpler-redux'
import Counter from '../Views/Counter'
import { serviceFunctions, selectors } from '../State Management/Counter'

const mapStateToProps = state =>
  ({
    counter1: selectors.getCounter1(state),
    counter2: selectors.getCounter2(state),
    counter3: selectors.getCounter3(state),
    counter4: selectors.getCounter4(state)
  })

const mapDispatchToProps = (dispatch, ownProps) =>
  ({
    increment1: () => serviceFunctions.increment1(ownProps.store),
    increment2: () => serviceFunctions.increment2(ownProps.store),
    increment3: () => serviceFunctions.increment3(ownProps.store),
    increment4: () => serviceFunctions.increment4(ownProps.store)
  })

export default connectWithStore(
  Counter,
  mapStateToProps,
  mapDispatchToProps
)
