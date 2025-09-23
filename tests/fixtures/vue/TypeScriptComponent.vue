<template>
  <div class="user-profile">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <button @click="toggleActive" :disabled="loading">
      {{ user.isActive ? 'Deactivate' : 'Activate' }}
    </button>
    <div v-if="loading" class="spinner">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export default defineComponent({
  name: 'UserProfile',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const user = ref<User>({
      id: props.userId,
      name: 'John Doe',
      email: 'john@example.com',
      isActive: true,
    });

    const loading = ref<boolean>(false);

    const statusText = computed((): string => {
      return user.value.isActive ? 'Active' : 'Inactive';
    });

    const toggleActive = async (): Promise<void> => {
      loading.value = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        user.value.isActive = !user.value.isActive;
      } finally {
        loading.value = false;
      }
    };

    return {
      user,
      loading,
      statusText,
      toggleActive,
    };
  },
});
</script>

<style scoped>
.user-profile {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.spinner {
  color: #666;
  font-style: italic;
}
</style>
