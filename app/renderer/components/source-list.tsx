import React, {Component} from 'react'
import Config from 'app/defaultConfig'
import './source-list.scss'

const prefix = 'source-list'

export default class Souce extends Component {
  data = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,,2,2,2,2,2]

  constructor (props: Readonly<{}>) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={prefix}>
        {this.data.map((item, index) => (
          <div className={prefix + '-item'} key={index}>
            <img className={prefix + '-img'} src={Config.icons.baseUrl + '/btgg.ico'}></img>
            <div className={prefix + '-name'}>BTGG</div>
          </div>
        ))}
      </div>
    )
  }
}
