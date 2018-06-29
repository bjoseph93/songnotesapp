var React = require("react");

const axios = require("axios");

class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentId: this.props[0].id,
            currentTitle: this.props[0].title,
            currentBody: this.props[0].body
        };
    }

   // handleNoteUpdateForList() {
   //      axios.get("notes")
   //          .then(function (response) {
   //              console.log(response);
   //          })
   //  }

    // handleNoteUpdate();

    handleNoteClick(id, title, body){
        this.setState({currentId: id, currentTitle: title, currentBody: body});
    }

    handleNewNoteClick(){
        this.handleNoteClick(0,"","")
        console.log("new note");
    }

    render() {
        return (
            <div>
                <h1>Music Box</h1>
                <button onClick={() => this.handleNewNoteClick()}>New Note</button>
                <div className="main-container">

                    <NotesList notes={this.props} handleNoteClick={(id, title, body) => this.handleNoteClick(id, title, body)} />
                    <Note id={this.state.currentId} title={this.state.currentTitle} body={this.state.currentBody}/>
                </div>
            </div>
        );
    }
}

class NotesList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="notes-list">
                {
                    Object.values(this.props.notes).map(function(value){
                        return <ListElement id={value.id} title={value.title} body={value.body} onClick={(id, title, body) => this.props.handleNoteClick(id, title, body)} />;
                        }, this
                    )
                }
                </div>

    );
    }

    }


class ListElement extends React.Component {
    render() {
        return (
            <div className="list-element" onClick={() => this.props.onClick(this.props.id, this.props.title, this.props.body)}>{this.props.title}</div>
        );
    }
}

class Note extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            id: this.props.id,
            title: this.props.title,
            body: this.props.body,
        };
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.body !== this.state.body) {
            this.setState({ body: nextProps.body });
        }

        if (nextProps.title !== this.state.title) {
            this.setState({ title: nextProps.title });
        }

        if (nextProps.id !== this.state.id) {
            this.setState({ id: nextProps.id });
        }
    }

    handleBodyChange(event) {
        this.setState({id: this.state.id, title: this.state.title, body: event.target.value});
    }

    handleTitleChange(event){
        this.setState({id: this.state.id, title: event.target.value, body: this.state.body});
    }



    handleUpdateOrCreate(_this) {
        if (_this.state.id == 0) {
            axios.post("/notes", {
                params: {
                    title: _this.state.title,
                    body: _this.state.body
                }
            }).then(
                window.location.reload()
            )
            console.log("here");

        } else {
            axios.put(`/notes/${_this.state.id}`, {
                params: {
                    id: _this.state.id,
                    title: _this.state.title,
                    body: _this.state.body
                }
            }).then(
                window.location.reload()
            )
        }
    }

    handleDelete(_this) {
        axios.delete(`/notes/${_this.state.id}`).then(
            window.location.reload()
        )
        console.log("here");

    }

    updateOrCreateText(_this){
        if(_this.state.id == 0){
            return "Create"
        }else {
            return "Update"
        }
    }

    render() {
        return (
            <div className="textarea-container">
                <div>
                    <button onClick={() => this.handleUpdateOrCreate(this)}>{this.updateOrCreateText(this)}</button>
                    {this.state.id == 0 ? null : <button onClick={() => this.handleDelete(this)}>Delete</button>}

                </div>
                <textarea className="title-textarea" value={this.state.title} onChange={this.handleTitleChange}></textarea>
                <textarea className="note-textarea" value={this.state.body} onChange={this.handleBodyChange}></textarea>
            </div>
        );
    }
}
module.exports = App
// module.exports = App