var React = require("react")
var PropTypes = require("prop-types")



class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentTitle: "Pick a Title",
            currentBody: "Pick a Body"
        };
    }

    handleNoteClick(title, body){
        this.setState({currentTitle: title, currentBody: body});

    }

    render() {
        return (
            <div>
               <NotesList notes={this.props} handleNoteClick={(title, body) => this.handleNoteClick(title, body)}/>
                <Note title={this.state.currentTitle} body={this.state.currentBody}/>
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
                        return <ListElement title={value[0]} body={value[1]} onClick={(title, body) => this.props.handleNoteClick(title, body)} />;
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
            <div className="list-element" onClick={() => this.props.onClick(this.props.title, this.props.body)}>{this.props.title}</div>
        );
    }
}

class Note extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            body: this.props.body,
        };
        this.handleChange = this.handleChange.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.body !== this.state.body) {
            this.setState({ body: nextProps.body });
        }
    }

    handleChange(event) {
        this.setState({body: event.target.value});
        console.log(this.state.body);
    }

    render() {
        return (
           <textarea value={this.state.body} onChange={this.handleChange}></textarea>
        );
    }
}
module.exports = App
// module.exports = App