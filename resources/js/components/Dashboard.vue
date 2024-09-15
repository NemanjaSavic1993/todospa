<template>
    <div class="container my-3">

      <!-- Header -->
      <div class="row border-bottom py-2 mb-3">
          <div class="col-xl-10">
              <h4 class="text-center fw-bold">ToDo list tasks</h4>
          </div>

          <div class="col-xl-1">
              <!-- <a href="/addTask" class="btn btn-primary btn-sm">Add Task</a> -->
              <RouterLink to="/addTask" class="btn btn-primary btn-sm">Add Task</RouterLink>
          </div>

          <div class="col-xl-1">
              <div class="col-xl-11 text-end">
                  <a href="#" class="btn btn-primary btn-sm" @click="logout">Logout</a>
              </div>
          </div>
      </div>

      <!-- table of list tasks -->
      <div class="card">
        <div class="card-body mt-4 table-responsive shadow">

            <div class="col-xl-4 ms-auto my-3">
                <input type="text" name="search" id="search" v-model="searchText" class="form-control" placeholder="Search task..."/>
            </div>

            <table class="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </thead>

                <tbody>
                  <tr v-for="(task, index) in data" :key="index">
                    <td>{{task.serial_number}}</td>
                    <td>{{task.name}}</td>
                    <td>{{task.status}}</td>
                    <td>
                        <button type="button" v-if="task.status == 'Finished'" class="btn btn-warning me-3" @click="updateStatus(task.id)">In proccess</button>

                        <button type="button" v-else class="btn btn-success me-3" @click="updateStatus(task.id)">Finished</button>

                        <button type="button" class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
            </table>

            <!--links for pagination -->

            <nav class="me-5 mb-5">
                <ul class="pagination justify-content-end">
                    <li class="page-item" v-for="(link, index) in links" :key="index">
                      <a class="page-link" href="#" v-html="link.label" :class="{active: link.active, disabled: !link.url}" @click="changePage(link)"></a>
                    </li>
                </ul>
            </nav>

        </div>
      </div>

    </div>
  </template>
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],         // Svi podaci koji dolaze sa API-ja
      links: [],         // cuvanje linkova
      searchText: '',    // string za pretragu
      debounceTimeout: null, // Timer za debounce
    };
  },
  methods: {
    getTasks() {
      axios.get('/api/tasks', {
          params: {
            searchText: this.searchText, // Prosleđuje parametar pretrage
          }
        })
        .then(response => {
          this.data = response.data.tasks.data
          this.links = response.data.tasks.links
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        });
    },
    changePage(link){

      if(!link.url || link.active){
        return 
      }

      axios.get(link.url)
      .then((response) => {
        this.data = response.data.tasks.data
        this.links = response.data.tasks.links
      })
    },
    updateStatus(id){
      axios.put(`/api/tasks/${id}`)
      .then((response) => {
        if(response.status === 200)
        {
          alert("Uspešno ste izmenili podatke za zadatak");
          this.getTasks()
        }
      })
    },
    deleteTask(id){
      let res = confirm("Da li ste sigurni da želite da obrišete zadatak?");

      if (res) {
        axios.delete(`api/tasks/${id}`)
        .then(() => {
          this.getTasks()
        })
      }
    },
    async logout() {
        try {
          const response = await axios.post('/api/logout');
          localStorage.removeItem('authToken');
          this.$router.push('/');
        } catch (error) {
          console.log(error);
        }
      }
  },
  mounted() {
    this.getTasks();
  },
  watch: {
      searchText() {
        this.debounceTimeout = setTimeout(() => {
          this.getTasks()
        }, 250); // 250ms debounce (ili podešeno vreme)
      }
  }
};
</script>