import React, {Component} from 'react'
import Config from 'app/defaultConfig'
import './source-list.scss'

const prefix = 'source-list'

interface IProps {
  ruleList: IRuleItem[]
  onSourceChange: (value: IRuleItem) => void
}
interface IState {
  activeRule: IRuleItem
}

export default class Souce extends Component<IProps, IState> {

  constructor (props: Readonly<IProps>) {
    super(props)
    this.state = {
      activeRule: props.ruleList[0]
    }
  }

  componentDidMount() {

  }

  handleRuleClick = (item: IRuleItem) => {
    this.setState({
      activeRule: item
    })
    this.props.onSourceChange(item)
  }

  render() {
    const {activeRule} = this.state
    const {ruleList}  = this.props

    return (
      <div className={prefix}>
        {ruleList && ruleList.map((item, index) => (
          <div
            className={[prefix + '-item',
                       item.id === activeRule.id ? 'active-rule' : ''].join(' ')}
            key={index}
            onClick={() => this.handleRuleClick(item)}
          >
            <img className={prefix + '-img'} src={Config.icons.baseUrl + `/${item.id}.ico`}></img>
            <div className={prefix + '-name'}>{item.name}</div>
          </div>
        ))}
      </div>
    )
  }
}
