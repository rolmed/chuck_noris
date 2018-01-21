import React from 'react';
import { Input, Dropdown, Grid, Segment, Button } from 'semantic-ui-react';

const API = 'https://api.chucknorris.io/jokes';

export default class Chuck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '/random',
            jokes: {},
            options: [{id: 0, value: 'none', text: 'none'}],
            itemsToShow: 5,
            expanded: true,
            selection: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.showMore = this.showMore.bind(this);
        this.getRandom = this.getRandom.bind(this);
    }

    handleChange(event) {
        this.setState({query: '/search?query=' + event.target.value });
        this.getJoke();
    }

    handleSelectChange(event, selectedOption) {
        if(selectedOption.value != 'none'){
            this.setState({query: '/random?category=' + selectedOption.value, selection:  selectedOption.value});
        } else {
            this.setState({query: '/random', selection: ''});
        }
    }

    getRandom(event) {
        if (!this.state.query.includes('/random')) {
           this.setState({query: '/random'});
        }
        this.setState({expanded: true});
        this.getJoke();
    }
    
    showMore() {
        this.state.itemsToShow + 5 < this.state.jokes.total ? (
        this.setState({ itemsToShow: this.state.itemsToShow + 5 })
        ) : (
        this.setState({ itemsToShow: this.state.jokes.total, expanded: true })
        )
    }

    componentDidMount() {
       this.getJoke();
       this.getCategories();
    }

    getJoke() {
        fetch(API + this.state.query)
       .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
       })
       .then(data => {
           this.setState({ jokes: data })
           if((this.state.jokes.total || 0) > this.state.itemsToShow) {
               this.setState({ expanded: false })
           }
        })
    }

    getCategories() {
        fetch(API + '/categories')
       .then(response => response.json())
       .then(data => {
           let categories = this.state.options;
           data.map((cat, i) => 
           categories.push({id: i, value: cat, text: cat}));
           this.setState({ options: categories })
        })
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={6} computer={6}>
                        <Input fluid icon="search" placeholder="Search..." onChange={this.handleChange}/>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={6} computer={6}>
                        <Dropdown fluid selection 
                                value={this.state.selection}
                                placeholder='By category'
                                options={this.state.options} 
                                onChange={this.handleSelectChange.bind(this)}/>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={4} computer={4}>
                        <Button primary onClick={this.getRandom}>Get random</Button>
                    </Grid.Column>
                </Grid>

                <Segment.Group>
                    {!this.state.jokes.result ? (
                        <Segment size='massive' >{this.state.jokes.value}</Segment>
                        ) : (
                            this.state.jokes.result.slice(0, this.state.itemsToShow).map((joke, i) => 
                            <Segment size='big' key={i}>{joke.value}</Segment>) 
                        )
                    }
                </Segment.Group>

                {this.state.expanded ? '' : <Button primary onClick={this.showMore}>Show more</Button>}
            </div>
        )
    }
};

