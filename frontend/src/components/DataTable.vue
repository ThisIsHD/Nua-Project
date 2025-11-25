<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

interface User {
  uuid: string
  name: string
  email: string
  city: string
}


axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const users = ref<User[]>([])
const loading = ref(false)
const search = ref('')

const itemsPerPage = ref(25)
const page = ref(1)

const dialog = ref(false)
const editedUser = ref<User>({
  uuid: '',
  name: '',
  email: '',
  city: ''
})
const editedIndex = ref(-1)

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/users')
    users.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    console.error('Failed to fetch users:', e)
    users.value = []
  } finally {
    loading.value = false
  }
}


onMounted(fetchUsers)


const openEdit = (item: User, index: number) => {
  editedIndex.value = index
  editedUser.value = { ...item }
  dialog.value = true
}

const saveEdit = async () => {
  try {
    await axios.put(`/api/users/${editedUser.value.uuid}`, editedUser.value)
    Object.assign(users.value[editedIndex.value], editedUser.value)
    dialog.value = false
  } catch (e) {
    console.error('Failed to update user:', e)
  }
}

const closeDialog = () => {
  dialog.value = false
}

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const s = search.value.toLowerCase()
  return users.value.filter(
    u =>
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.city.toLowerCase().includes(s)
  )
})
</script>

<template>
  <v-container class="py-10" fluid>
    <v-card elevation="3" class="pa-6 rounded-xl">

      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-h5 font-weight-bold">User Management</h2>
      </div>

      <!-- Search Bar -->
      <v-text-field
        v-model="search"
        label="Filter users"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        class="mb-4"
        hide-details
        clearable
      />

      <!-- Data Table -->
      <v-data-table
        :headers="[
          { title: 'Name', key: 'name' },
          { title: 'Email', key: 'email' },
          { title: 'City', key: 'city' },
          { title: 'Action', key: 'actions', sortable: false }
        ]"
        :items="filteredUsers"
        :loading="loading"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="rounded-lg elevation-1"
      >
        <template #item.actions="{ item, index }">
          <v-btn color="primary" size="small" @click="openEdit(item, index)">Edit</v-btn>
        </template>

        <template #loading>
          <v-skeleton-loader type="table-row-divider@5" />
        </template>
      </v-data-table>
    </v-card>

    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="450">
      <v-card class="rounded-xl">
        <v-card-title class="text-h6 font-weight-bold">Edit User</v-card-title>

        <v-card-text>
          <v-text-field v-model="editedUser.name" label="Name" variant="outlined" />
          <v-text-field v-model="editedUser.email" label="Email" variant="outlined" />
          <v-text-field v-model="editedUser.city" label="City" variant="outlined" />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="saveEdit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-data-table tbody tr:hover {
  background-color: #f5f7fa !important;
}
</style>
