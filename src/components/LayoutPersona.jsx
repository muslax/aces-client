import React from 'react'

export default class LayoutPersona extends React.Component {

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="w-full bg-white border-t-4 border-gray-700">
        {this.props.children}
      </div>
    )
  }
}