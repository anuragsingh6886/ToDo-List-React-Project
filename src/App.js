import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchAppBar from './Appbar.js';
import Checkbox from '@mui/material/Checkbox';

function ListItem(props) {
  const { children, onModify, onDelete } = props;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isEditMode, setIsEditMode] = useState(false);
  console.log({ isEditMode });
  const [tempTask, setTempTask] = useState(children);

  return isEditMode ? (
    <>
      <TextField
        className="editTask"
        onChange={function (event) {
          setTempTask(event.target.value);
        }}
        value={tempTask}
      ></TextField>
      <Button
      variant="contained"
        className="saveTask"
        type="button"
        disabled={tempTask === ''}
        onClick={function () {
          console.log('save click', tempTask);
          if (tempTask !== '') {
            onModify(tempTask);
            setIsEditMode(false);
          }
        }}
      >Save
      </Button>
    </>
  ) : (
    <p className="list" key={children}>
      <Checkbox {...label} />
        {" "+children+" "}   
        <ButtonGroup size="small" variant="text" aria-label="outlined button group">
      <Button
      size="small"
        className="edit"
        type="button"
        onClick={function () {
          setIsEditMode(true);
        }}
      >
        Edit
      </Button>
      <Button
      size="small"
        className="delete"
        color="error"
        type="button"
        onClick={function () {
          onDelete();
        }}
      >
        Delete
      </Button>
</ButtonGroup>
      </p>
  );
}

function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  function onModify(givenTask, givenI) {
    console.log({ givenTask, givenI });
    const newList = todoList.map(function (task, i) {
      if (givenI === i) {
        return givenTask;
      }
      return task;
    });
    // console.log(newList === todoList);
    setTodoList(newList);
  }

  function onDelete(givenI) {
    const newList = todoList.filter(function (el, i) {
      return i !== givenI;
    });
    setTodoList(newList);
  }

  return (
    
    <div id="main">
      <SearchAppBar/>
      <>
      <h1></h1>
      <TextField
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      fullWidth label="Add your task here..."
        id="task"
        onChange={function (event) {
          setTask(event.target.value);
        }}
        value={task}
      ></TextField>
      <Button
      variant="contained"
        id="btn"
        type="button"
        onClick={function () {
          if (task !== '') {
            setTodoList([...todoList, task]);
            setTask('');
          }
        }}
      >
        Add Task
      </Button>
      </>
      <ul>
        {todoList.map((task, i) => {
          return (
            <ListItem
              onModify={(newTask) => {
                onModify(newTask, i);
              }}
              onDelete={() => onDelete(i)}
            >
              {task}
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}
export default App;