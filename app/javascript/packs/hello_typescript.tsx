// Run this example by adding <%= javascript_pack_tag 'hello_typescript' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Home from '../components/Home'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Home />,
        document.body.appendChild(document.createElement('div')),
    )
})
