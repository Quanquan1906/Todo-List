import {Component, input, OnInit, output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Todo} from "../model/model";
// interface Todo {
//   task: string;
//   selected: boolean;
// }

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    FormsModule, NgForOf, NgClass
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  newTask: string = ''; //1 chuoi rong de luu cac newtask
  todos: Todo[] = []; //1 mang rong chua cac task(string) va selected(boolean)

  todo: Todo;

  constructor() {
    this.todo = new Todo();
  }

  //Ham them cac newTask(cac cong viec moi)
  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push({task: this.newTask.trim(), selected: false});
      this.newTask = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  //Ham xoa cac muc newtask
  removeTodo(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  //Ham check trang thai hoan thanh cua cac muc newTask
  toggleTodoCompleted(index: number) {
    this.todos[index].selected = !this.todos[index].selected;
    localStorage.setItem('todos', JSON.stringify(this.todos))

    //Duyet vong lap tim vi tri ma item can checked, khac vi tri khong checked
    for (let i = 0; i < this.todos.length; i++) {
      if (index == i) {
        this.todos[i].selected = !this.todos[i].selected;
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    }
  }

  //Ham loai bo tat ca cac muc newTask da hoan thanh
  removeSelectedTodos() {
    this.todos = this.todos.filter(todo => !todo.selected);
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  ngOnInit(): void {
    this.readData();
  }

  //Ham doc du lieu "todos" tu localStorage
  readData() {
    let items = localStorage.getItem('todos');
    if (items) {
      this.todos = JSON.parse(items);
    }
  }

  test() {
  }
}
