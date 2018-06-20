import React from "react";
import ReactDOM from "react-dom";
import TaskItem from "./components/TaskItem.jsx";
import Dragula from "react-dragula";
import BurnChart from "./components/BurnChart.jsx";
// import { Dialog, DialogTitle, DialogContent, DialogContentText } from 'material-ui';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const theUser = "jkang1220";

const sortByUserAndDueDate = items =>
  items.sort((a, b) => {
    if (a.assigned === theUser && b.assigned === theUser) {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (a.assigned !== theUser && b.assigned !== theUser) {
      return a.assigned - b.assigned;
    } else if (a.assigned !== theUser && b.assigned === theUser) {
      return 1;
    } else {
      return -1;
    }
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.inboxColumn = React.createRef();
    this.todoColumn = React.createRef();
    this.InProgressColumn = React.createRef();
    this.doneColumn = React.createRef();
    this.showCharts = this.showCharts.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      loading: true,
      toggleCharts: false, 
      open: false
    };
  }

  getData() {
    const items = [
      {
        id: 0,
        assigned: "JClutch",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/22/2018"
      },
      {
        id: 1,
        assigned: "JClutch",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/23/2018"
      },
      {
        id: 2,
        assigned: "rvcwhitworth",
        status: "In Progress",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 3,
        assigned: "jkang1220",
        status: "In Progress",
        description: "Build Chart",
        due_date: "06/25/2018",
        labels: ["Hi", "Priority", "Coffee"]
      },
      {
        id: 4,
        assigned: "jkang1220",
        status: "Todo",
        description: "Build UI",
        due_date: "06/29/2018",
        labels: ["Hia", "Priority", "Coffeeee"]
      },
      {
        id: 5,
        assigned: "jkang1220",
        status: "Todo",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 6,
        assigned: "cmourani",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 7,
        assigned: "jkang1220",
        status: "Inbox",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 8,
        assigned: "cmourani",
        status: "Inbox",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 9,
        assigned: "cmourani",
        status: "Done",
        description: "Task Uno",
        due_date: "06/21/2018"
      },
      {
        id: 10,
        assigned: "jkang1220",
        status: "In Progress",
        description: "Build Chart",
        due_date: "06/19/2018"
      },
      {
        id: 11,
        assigned: "jkang1220",
        status: "In Progress",
        description: "Build Chart",
        due_date: "08/25/2018"
      },
      {
        id: 12,
        assigned: "jkang1220",
        status: "In Progress",
        description: "Build Chart",
        due_date: "07/25/2018"
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

    let currentDate = new Date();
    console.log("currentDate", currentDate);
    let items = sortByUserAndDueDate(this.getData());
    // .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    console.log("sorted by current user and date", items);
    //sort by username at the top (assignee)
    //then sort by milestone

    console.log("items", items);

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
          console.log("target", target, "source", source.dataset.status);

          //NEED to get rid of state logic and rendering off that and now integrate with Github api and render off socket updates and such

          //get item
          let item = this.state[sourceColumn].filter(item => {
            return item.id == el.dataset.id;
          })[0];
          console.log("what is item??", item);
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



  showModal () {
    console.log('open click')
    this.setState({ open: true });
  }

  showCharts() {
    this.setState({
      toggleCharts: !this.state.toggleCharts
    });
  }

  handleClose() {
      console.log('closing')
    this.setState({ open: false });
  };

  render() {
    return this.state.loading ? (
      <h1> Loading </h1>
    ) : this.state.toggleCharts ? (
      <div>
        <h1>FrenchToastio</h1>
        <div className="burn-charts">
          <button onClick={this.showCharts}>Show Task Board</button>
        </div>
        <BurnChart type={"Down"} />
        <BurnChart type={"Up"} />
      </div>
    ) : (
      <div>
        <h1>FrenchToastio</h1>
        <div className="burn-charts">
          <button onClick={this.showCharts}>
            Show Burn-Down and Burn-Up Charts
          </button>
        <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.state.open}
          onClose={this.handleClose}

        >
         <DialogTitle id="alert-dialog-title">{"Items That Have Not Been Updated Recently:"}</DialogTitle>
          <DialogContent>
            <TaskItem item={this.state.todo[0]} />
          </DialogContent>

        </Dialog>

          <img src="https://cdn.icon-icons.com/icons2/1283/PNG/512/1497619898-jd24_85173.png" onClick={this.showModal} height="50px" width="50px"></img>
        </div>
        <h3>Welcome {theUser}!</h3>
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
