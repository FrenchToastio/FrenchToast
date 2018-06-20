import React from "react";
import ReactDOM from "react-dom";
import TaskItem from "./components/TaskItem.jsx";
import Dragula from "react-dragula";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inboxColumn = React.createRef();
    this.todoColumn = React.createRef();
    this.InProgressColumn = React.createRef();
    this.doneColumn = React.createRef();
    this.state = {
      loading: true
    };
  }

  getData() {
    const items = [
      {
        id: 0,
        owner: "Manos",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 1,
        owner: "Manos",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 2,
        owner: "Manos",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 3,
        owner: "Ryan",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 4,
        owner: "Christine",
        status: "Inbox",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 5,
        owner: "Jimmy",
        status: "Todo",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 6,
        owner: "Jason",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 7,
        owner: "Jason",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 8,
        owner: "Jason",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 9,
        owner: "Jason",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      }
    ];
    return items;
  }

  componentDidMount() {
    /* Make api call for data */

    var newState = {
      inbox: [],
      todo: [],
      inProgress: [],
      done: []
    };
    let items = this.getData();
    items.forEach(item => {
      switch (item.status) {
        case "Inbox":
          newState.inbox.push(item);
          break;
        case "Todo":
          newState.todo.push(item);
          break;
        case "In Progress":
          newState.inProgress.push(item);
          break;
        case "Done":
          newState.done.push(item);
          break;
      }
    });

    this.setState(
      {
        inbox: newState.inbox,
        todo: newState.todo,
        inProgress: newState.inProgress,
        done: newState.done,
        loading: false
      },
      () => {
        var column1 = this.inboxColumn.current;
        var column2 = this.todoColumn.current;
        var column3 = this.InProgressColumn.current;
        var column4 = this.doneColumn.current;

        var dragula = Dragula([column1, column2, column3, column4]);
        console.log("dragula", dragula);

        dragula.on("drop", (el, target, source, sibling) => {
          let targetColumn = target.dataset.status;
          let targetColumnArr = this.state[targetColumn];
          let sourceColumn = source.dataset.status;
          console.log('target', target, 'source', source.dataset.status)


          //NEED to get rid of state logic and rendering off that and now integrate with Github api and render off socket updates and such

          //get item
          let item = this.state[sourceColumn].filter(item => {
            return item.id == el.dataset.id;
          })[0];
          console.log('what is item??', item)
          //get new source array after remove item
          let sourceColumnArr = this.state[sourceColumn].filter(
            item => item.id !== el.dataset.id
          );

          //add item to targetArray
          targetColumnArr.push(item);

          // if (targetColumn !== sourceColumn) {
          //   this.setState(
          //     prevState => {
          //       prevState[targetColumn] = targetColumnArr;
          //       prevState[sourceColumn] = sourceColumnArr;
          //       console.log('prevState', prevState)
          //       return prevState;
          //     },
          //     () => {
          //       console.log("this.state after switch", this.state);
          //     }
          //   );
          //   // this.setState(
          //   //   prevState => {
          //   //     prevState[targetColumn][el.dataset.id] =
          //   //       prevState[sourceColumn][el.dataset.id];
          //   //     // console.log("hmm", sourceColumn, el.dataset.id);
          //   //     delete prevState[sourceColumn][el.dataset.id];
          //   //     return prevState;
          //   //   },
          //   //   () => {
          //   //     console.log("NEW STATE", this.state);
          //   //   }
          //   // );
          // }
        });
      }
    );
  }

  render() {
    return this.state.loading ? (
      <h1> Loading </h1>
    ) : (
      <div>
        <h1>FrenchToastio</h1>
        <div className="container">
          <div className="column-1" data-status="inbox" ref={this.inboxColumn}>
            <h2 className="column-header">Inbox</h2>
            {this.state.inbox.map((item, key) => (
              <TaskItem key={key} item={item} />
            ))}
          </div>
          <div className="column-2" data-status="todo" ref={this.todoColumn}>
            <h2 className="column-header">Todo</h2>
            {this.state.todo.map((item, key) => (
              <TaskItem key={key} item={item} />
            ))}
          </div>
          <div
            className="column-3"
            data-status="inProgress"
            ref={this.InProgressColumn}
          >
            <h2 className="column-header">In Progress</h2>
            {this.state.inProgress.map((item, key) => (
              <TaskItem key={key} item={item} />
            ))}
          </div>
          <div className="column-4" data-status="done" ref={this.doneColumn}>
            <h2 className="column-header">Done</h2>
            {this.state.done.map((item, key) => (
              <TaskItem key={key} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
