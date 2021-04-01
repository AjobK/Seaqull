import React, { Component } from 'react'
import styles from './profileInfo.scss'
import Plus from '../../static/icons/plus.svg'
import { PreviewPost } from '../../components'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import {Editor, EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js'
import Axios from 'axios'

@inject('store') @observer
class ProfileInfo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: props.user,
			editing: false,
			editorState: EditorState.createEmpty(),
			changedContent: false
		}

		Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
		
	}

	onChange = (editorState) => {
		const user = this.state.user

		user.description = convertToRaw(editorState.getCurrentContent())

		this.setState({user, editorState, changedContent: true})
	}

	componentDidMount = () => {
		let editorState = EditorState.createWithContent(ContentState.createFromText(this.getDescription()))
	
		this.setState({ editorState })
	}
	
	getDescription = () => {
		try {
			const textBlockArray = JSON.parse(this.state.user.description)
				let text = ''

			for (let blockIndex = 0; blockIndex < textBlockArray.blocks.length; blockIndex++) {
				text = text + ' ' + textBlockArray.blocks[blockIndex].text
			}
			return text
		} catch {
			return this.state.user.description
		}
	}

	saveNewDescription = () => {
		if (this.state.changedContent){
			const payload = {
				username: this.state.user.username,
				description: this.state.user.description
			}

			Axios.put('/profile', payload, {withCredentials: true})
		}
	}

	render() {
		if (!this.props.startEditing) this.saveNewDescription()

		return (
			<section className={styles.wrapper}>
				<Editor 
					readOnly={!this.props.startEditing}
					editorState={this.state.editorState} 
					onChange={this.onChange} 
					spellCheck={true}
					textAlignment={'center'}/>
			</section>
		)
	}
}

export default ProfileInfo
