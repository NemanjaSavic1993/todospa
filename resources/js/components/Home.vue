<template>
  <div class="container">
    <div class="row mx-auto p-5">
      <div class="col-xl-6">
        <h1>Welcome page, ToDo List</h1>
        <div class="list-group">
          <RouterLink to="/login" class="list-group-item list-group-item-action">Login</RouterLink>
          <RouterLink to="/register" class="list-group-item list-group-item-action">Registration</RouterLink>
        </div>
      </div>

      <div class="col-xl-6">
        <img src="/public/img/todoimg.jpg" alt="todo list imgage" class="img-fluid"/>
      </div>
    </div>
  </div>
    
  </template>
  