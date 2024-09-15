<template>
  <div class="container">
    <div class="row mx-auto p-5">
      <div class="col-xl-12 d-flex justify-content-end">
        <RouterLink to="/" class="btn btn-primary btn-sm">Back</RouterLink>
      </div>
    </div>
    
    <div class="row justify-content-center mx-auto p-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <div class="row mb-3">
                      <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                      <div class="col-md-6">
                          <input id="email" type="email" v-model="email" class="form-control" name="email" value="" required autocomplete="email" autofocus>
                      </div>
                    </div>

                    <div class="row mb-3">
                        <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                        <div class="col-md-6">
                            <input id="password" type="password" v-model="password" class="form-control" name="password" required autocomplete="current-password">
                        </div>
                    </div>

                    <div class="row mb-0">
                        <div class="col-md-8 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                              Login
                            </button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/api/login', {
            email: this.email,
            password: this.password
          });
            localStorage.setItem('authToken', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
            this.$router.push('/dashboard');
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  </script>
  