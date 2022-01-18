import React from 'react';
import TodoForm from "../Components/Todoform";
import Todo from "../Components/Todo";

export default class TodoList extends React.Component {
    state = {
        todos: [],
        todosToShow: "all"
    };

    addTodo = todo => {
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    };
                } else {
                    return todo;
                }
            })
        })
    }

    updateTodoToShow = (s) => {
        this.setState({
            todosToShow: s
        })
    }

    handleDeleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    deleteAll = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    render() {
        let todos = [];

        if (this.state.todosToShow === "all"){
            todos = this.state.todos;
        } else if (this.state.todosToShow === "active"){
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todosToShow === "complete"){
            todos = this.state.todos.filter(todo => todo.complete);
        }

 
        return ( 
            <div>    
                <TodoForm onSubmit={this.addTodo} />
                {todos.map(todo => (
                    <Todo key={todo.id} toggleComplete={() => this.toggleComplete(todo.id)} onDelete={() => this.handleDeleteTodo(todo.id)} todo={todo} />
                ))}
                <div>
                todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToShow("all")}>all</button>
                    <button onClick={() => this.updateTodoToShow("active")}>active</button>
                    <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
                </div>
                {this.state.todos.filter(todo => todo.complete).length ? (
                    <div>
                    <button onClick={this.deleteAll}>Delete Completed</button>
                </div>) : null}
            </div>
        );
    }
}