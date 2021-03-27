import React, { Component, createRef } from 'react'
import { EditorState, Editor, RichUtils, convertFromRaw, convertToRaw, ContentState } from 'draft-js'
import "draft-js/dist/Draft.css";

class CommentEditor extends Component {
    constructor(props) {
        super(props)
        const { value } = this.props

        this.selected = false
        this.maxLength = 280

        this.editorInput = React.createRef()

        this.state = {
            editorState: value != null
                ? EditorState.createWithContent(ContentState.createFromText(value))
                : EditorState.createEmpty(),
            focused: false
        }
    }

    handleBeforeInput = (chars) => {
        if (!this.maxLength) return false

        const totalLength = this.state.editorState.getCurrentContent().getPlainText().length + chars.length

        return totalLength > this.maxLength
    }

    
    onChange = (editorState) => {
        this.setState({editorState});

        const contentState = editorState.getCurrentContent()

        if (this.props.onCommentChangeCallback)
            this.props.onCommentChangeCallback(convertToRaw(contentState))
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

    onSave = () => {
        this.props.onCommentSubmitCallback(this)
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({ editorState });
    }

    render() {
        return (
            <div>
                <div onClick={this.focusOnEditor}>
                    <Editor
                        editorState={this.state.editorState}
                        ref={this.editorInput}
                        onChange={this.onChange}
                        placeholder="Leave a comment..."
                    />
                </div>
            </div>
        )
    }
}

export default CommentEditor
