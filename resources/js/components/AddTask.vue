<template>
    <div class="container">
        <!-- Header -->
        <div class="row border-bottom py-2 mb-3">
            <div class="col-xl-11">
                <h4 class="text-center fw-bold">ToDo list tasks</h4>
            </div>

            <div class="col-xl-1">
                <RouterLink to="/dashboard" class="btn btn-primary btn-sm">Back</RouterLink>
            </div>
        </div>

        <div class="alert alert-success alert-dismissible" :class="[this.isActive ? 'inline-block' : 'd-none ', 'text-large']">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            {{ this.message }}
        </div>

        <div class="alert alert-danger alert-dismissible" :class="[this.isError ? 'inline-block' : 'd-none ', 'text-large']">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            {{ this.message }}
        </div>

        <form @submit.prevent="addTask">
            <div class="mb-3">
                <label for="naziv" class="form-label">Task:</label>
                <input type="naziv" class="form-control" name="naziv" id="naziv" v-model="naziv">
            </div>


            <div class="mb-3">
                <button class="btn btn-primary">Add task</button>
            </div>
        </form>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        naziv : "",
        message : "",
        isActive : false,
        isError : false
    };
  },
  methods: {
    addTask() {
        axios.post('api/tasks', {
                    naziv: this.naziv, // Prosleđuje parametar za unos
            })
            .then(response => {
                // console.log(response.data);
                this.message = response.data.message;
                this.isActive = true;
            }).catch(error => {
                // console.log(error.response.data);
                // uraditi da se prodje kroz sve greske foreach (ovde je sada ok iz razloga sto ima samo jedno polje)
                this.message = error.response.data.message;
                this.isError = true;
            });
        }
    }
};
</script>