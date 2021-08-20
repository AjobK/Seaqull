import React, { Component } from 'react'
import { EditorState, Editor, convertToRaw, ContentState, getDefaultKeyBinding } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Button } from '../'

import styles from './commentEditor.scss'

class CommentEditor extends Component {
    constructor(props) {
        super(props)

        this.selected = false
        this.minLength = 1
        this.maxLength = 280

        this.editorInput = React.createRef()
        this.showHeader = true
        this.buttonText = 'SEND'

        if (props.type === 'reply') {
            this.showHeader = false
            this.buttonText = 'REPLY'
        }

        this.state = {
            editorState: props.value != null
                ? EditorState.createWithContent(ContentState.createFromText(props.value))
                : EditorState.createEmpty(),
            focused: false,
            formError: null
        }
    }

    handleBeforeInput = (chars) => {
        if (!this.maxLength) 
            return false

        const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + chars.length

        return totalLength > this.maxLength
    }

    
    onChange = (editorState) => {
        this.setState({editorState, formError: null})

        if (this.props.onCommentChangeCallback)
            this.props.onCommentChangeCallback(convertToRaw(editorState.getCurrentContent()))
    }

    onFocus = () => {
        this.focused = true
        this.setState({
            focused: true
        })
    }

    onBlur = () => {
        this.focused = false
        this.setState({
            focused: false
        })

        this.selected = false
    }

    focusOnEditor = () => {
        this.editorInput.current.focus()
    }

    onSubmit = () => {
        if (this.state.editorState.getCurrentContent().getPlainText().length >= this.minLength) {
            this.props.onSubmitCallback(this)
            this.clearEditor()
        } else {
            this.setState({ formError: 'Comment should not be empty.' })
        }
    }

    clearEditor = () => {
        this.setState({ editorState: EditorState.createEmpty() })
    }

    keyBindingFn = (e) => {
        if(e.key === 'Enter') {
            return 'enter-pressed'
        }

        return getDefaultKeyBinding(e)
    }

    handleKeyCommand = (command) => {
        if(command === 'enter-pressed') {
            this.onSubmit()
            return 'handled'
        }

        return 'not-handled'
    }

    displayError = () => {
        if (this.state.formError) {
            return (
                <div className={styles.error}>
                    {this.state.formError}
                </div>
            )
        }
    }

    displayHeader = () => {
        if (this.showHeader) {
            return (
                <div className={ styles.editorLabel }>
                    <span className={ styles.editorLabel__title }>Comment section</span>
                </div>
            )
        }
    }

    render() {
        return (
            <section>
                { this.displayHeader() }
                { this.displayError() }
                <div className={ styles.editorForm }>
                    <div onClick={ this.focusOnEditor } className={ styles.editorForm__editor }>
                        <Editor
                            editorState={ this.state.editorState }
                            ref={ this.editorInput }
                            onChange={ this.onChange }
                            placeholder="Leave a comment..."
                            keyBindingFn={ this.keyBindingFn }
                            handleKeyCommand={ this.handleKeyCommand }                     
                        />
                    </div>
                    <Button value={ this.buttonText } className={ styles.editorForm__button } type="button" onClick={ this.onSubmit } />
                </div>
            </section>
        )
    }
}

export default CommentEditor
