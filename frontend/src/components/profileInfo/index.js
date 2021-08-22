import React, { Component } from 'react'
import styles from './profileInfo.scss'
import { inject, observer } from 'mobx-react'
import { Icon } from '..'
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
			changedContent: false,
			icon: 'Pen',
			loggedIn: this.props.loggedIn
		}
		
		this.changeStateLock = null
		Axios.defaults.baseURL = this.props.store.defaultData.backendUrl
		
	}

	onChange = (editorState) => {
		const user = this.state.user

		user.description = convertToRaw(editorState.getCurrentContent())

		this.setState({user, editorState, changedContent: true})
	}

	componentDidMount = () => {
		this.setDescription()
	}
	
	setDescription = () => {
		let editorState

		try {
			editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.user.description)))
		} catch {
			editorState = EditorState.createWithContent(ContentState.createFromText(this.state.user.description))
		}
		
		this.setState({ editorState })
	}

	changeEditingState(param) {	
		if (!this.state.editing && this.changeStateLock < Date.now()) {
			this.setState({
				editing: true,
				icon: 'Save'
		  	})

			this.setState({
				editorState: EditorState.moveFocusToEnd(this.state.editorState)
			})
		} else if (this.changeStateLock < Date.now()) {
			this.changeStateLock = Date.now() + 500
		  	this.saveNewDescription()

		  	this.setState({
				editing: false,
				icon: 'Pen'
		  	})
		}  
	  }

	saveNewDescription = () => {
		if (this.state.changedContent) {
			const payload = {
				username: this.state.user.username,
				description: this.state.user.description
			}

			this.setState({
				editing: false,
				icon: 'Pen'
		  	})

			Axios.put('/profile', payload, { withCredentials: true })
			this.setState({ changedContent: false })
		}
	}

	render() {
		let icon
		let currentOption = ''

		if (this.props.loggedIn && this.state.user.isOwner) {
			icon = <Icon iconName={this.state.icon} className={styles.icon} />

			this.state.editing ? currentOption = 'SAVE' : currentOption = 'EDIT'
		}

		return (
			<section className={styles.wrapper}>
				<section className={styles.editor}>
					<Editor 
						readOnly={!this.state.editing}
						editorState={this.state.editorState} 
						onChange={this.onChange} 
						onBlur={() => this.changeEditingState()}
						spellCheck={true}/>
				</section>
				<section className={styles.iconContainer} onClick={() => this.changeEditingState()}>
						<section> 
							{icon} 
						</section>
						<p> {currentOption} </p>
          		</section>
			</section>
		)
	}
}

export default ProfileInfo
